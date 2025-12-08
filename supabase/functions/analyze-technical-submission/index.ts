import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    // Handle GET requests (Browser checks)
    if (req.method === 'GET') {
        return new Response(JSON.stringify({ message: "Service is active. Please use POST with body: { applicationId }." }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

    try {
        console.log("Start: Reading Request Body");
        const bodyText = await req.text();
        console.log("Raw Request Body:", bodyText);

        if (!bodyText) throw new Error("Request body is empty");

        const bodyJson = JSON.parse(bodyText);
        const { applicationId, frames: inputFrames } = bodyJson;
        // Ensure frames is an array
        const frames = Array.isArray(inputFrames) ? inputFrames : [];

        if (!applicationId) throw new Error("Missing applicationId in request body");

        console.log("Step 1: Init Supabase Client");
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

        if (!supabaseUrl || !supabaseKey) throw new Error("Missing Supabase Environment Variables");

        const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

        console.log("Step 2: Fetching Assessment for App ID:", applicationId);
        // Fetch Assessment & Job Details
        const { data: assessment, error: fetchError } = await supabaseAdmin
            .from('technical_assessments')
            .select('*, applications(jobs(technical_problem_statement))')
            .eq('application_id', applicationId)
            .order('created_at', { ascending: false }) // Get latest
            .limit(1)
            .maybeSingle();

        if (fetchError) {
            console.error("DB Fetch Error:", fetchError);
            throw new Error(`DB Fetch Failed: ${fetchError.message}`);
        }
        if (!assessment) {
            console.error("No assessment found for ID:", applicationId);
            throw new Error("Assessment not found for this Application ID");
        }
        console.log("Assessment Found:", assessment.id);

        const problemStatement = assessment.applications?.jobs?.technical_problem_statement;
        const apiKey = Deno.env.get('GROQ_API_KEY');
        if (!apiKey) throw new Error("Missing GROQ_API_KEY");

        // --- 1. Transcribe Video (if available) ---
        let transcription = "No video submitted or transcription failed.";

        if (assessment.video_url) {
            console.log("Step 3: Processing Video URL:", assessment.video_url);
            try {
                console.log("Downloading video...");
                const { data: videoData, error: downloadError } = await supabaseAdmin
                    .storage
                    .from('technical-submissions')
                    .download(assessment.video_url);

                if (downloadError) {
                    console.error("Download Error:", downloadError);
                    throw downloadError;
                }

                console.log("Transcribing video...");
                const formData = new FormData();
                formData.append('file', videoData, 'video.mp4'); // Groq requires a filename
                formData.append('model', 'whisper-large-v3');
                formData.append('response_format', 'json');

                const transResponse = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                    },
                    body: formData
                });

                if (!transResponse.ok) {
                    const errText = await transResponse.text();
                    console.error("Groq Transcription Error:", errText);
                    throw new Error(`Groq Transcription Failed: ${errText}`);
                }

                const transResult = await transResponse.json();
                transcription = transResult.text || "No speech detected.";
                console.log("Transcription complete.");

            } catch (err) {
                console.error("Video processing error:", err);
                transcription = `[Error processing video: ${err.message}]`;
            }
        }

        // --- 2. Analyze Submission (Text + Transcription + Vision) ---
        // frames are already extracted from the initial body read

        // Check if we have frames for Vision Analysis
        const hasFrames = frames && frames.length > 0;
        const model = hasFrames ? 'llama-3.2-90b-vision-preview' : 'llama-3.3-70b-versatile';

        console.log(`Analyzing with ${model}... (${hasFrames ? frames.length + ' frames' : 'Text/Audio only'})`);

        const systemMessage = hasFrames ? `
        You are a Senior Technical Interviewer evaluating a candidate's project submission.
        
        You will be provided with:
        1.  **Project Details**: GitHub URL, Tech Stack, Process Flow, Issues Faced.
        2.  **Video Transcript**: What the candidate said in their demo.
        3.  **Video Frames**: Screenshots from their project demo video.
        
        Your Goal:
        Analyze the submission holistically. Look for:
        -   **Code Quality & Depth** (from details & transcript).
        -   **Visual Output & Functionality** (from video frames - do they show a working app? UI quality?).
        -   **Communication**: How well they explain their solution (transcript).
        
        Return a JSON object with:
        -   score: number (0-100)
        -   feedback: string (max 150 words) - Specific feedback on code, the demo/UI shown in frames, and their explanation.
        -   improvement_suggestions: string (max 50 words) - Actionable advice.
        ` : `
        You are a Senior Technical Interviewer. Evaluate this technical submission.
        
        You will be provided with:
        1.  **Project Details**: GitHub URL, Tech Stack, Process Flow, Issues Faced.
        2.  **Video Transcript**: What the candidate said in their demo.
        
        Your Goal:
        Analyze the submission based on:
        -   **Code Quality & Depth**
        -   **Problem-solving approach**
        -   **Communication** (transcript quality)
        
        Return a JSON object with:
        -   score: number (0-100)
        -   feedback: string (max 150 words) - Detailed feedback.
        -   improvement_suggestions: string (max 50 words) - Specific advice.
        `;

        const userContent: any[] = [
            {
                type: "text",
                text: `
                Problem Statement: "${problemStatement}"
                
                Candidate Submission:
                - GitHub URL: ${assessment.github_url}
                - Tech Stack: ${assessment.tech_stack}
                - Process Flow: ${assessment.process_flow}
                - Issues Faced: ${assessment.issues_faced}
                - Cost Analysis: ${assessment.cost_analysis}
                
                Video Transcript:
                "${transcription}"
                `
            }
        ];

        // Add frames to user content IF available
        if (hasFrames) {
            frames.forEach((frame: string) => {
                userContent.push({
                    type: "image_url",
                    image_url: {
                        url: frame // Already base64 data URI
                    }
                });
            });
        }

        // Retry logic for Rate Limiting
        const fetchWithRetry = async (url: string, options: RequestInit, retries = 3, backoff = 2000) => {
            for (let i = 0; i < retries; i++) {
                const response = await fetch(url, options);

                if (response.status === 429) {
                    console.warn(`Rate limit hit. Retrying in ${backoff}ms...`);
                    await new Promise(resolve => setTimeout(resolve, backoff));
                    backoff *= 2; // Exponential backoff
                    continue;
                }

                return response;
            }
            throw new Error("Max retries exceeded for Groq API (Rate Limit)");
        };

        const response = await fetchWithRetry('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: model, // Dynamically selected model
                messages: [
                    { role: 'system', content: systemMessage },
                    { role: 'user', content: userContent }
                ],
                response_format: { type: 'json_object' }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Groq Error: ${response.status} - ${errorText}`);
        }

        const aiData = await response.json();
        const content = JSON.parse(aiData.choices[0].message.content);

        // Update Assessment
        const { error: updateError } = await supabaseAdmin
            .from('technical_assessments')
            .update({
                ai_score: content.score,
                ai_feedback: content.feedback,
                improvement_suggestions: content.improvement_suggestions,
                transcription: transcription, // Save transcription
                status: 'Analyzed'
            })
            .eq('id', assessment.id);

        if (updateError) throw updateError;

        return new Response(
            JSON.stringify({ success: true }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

    } catch (error: any) {
        console.error("CRITICAL ERROR in analyze-technical-submission:", error);
        console.error("Error Stack:", error.stack);
        return new Response(
            JSON.stringify({
                error: error.message,
                details: "Check Supabase Edge Function Logs for full stack trace."
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
    }
})
