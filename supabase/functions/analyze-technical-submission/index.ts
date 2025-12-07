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

    try {
        const { applicationId } = await req.json()

        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
        const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

        // Fetch Assessment & Job Details
        const { data: assessment, error: fetchError } = await supabaseAdmin
            .from('technical_assessments')
            .select('*, applications(jobs(technical_problem_statement))')
            .eq('application_id', applicationId)
            .single();

        if (fetchError || !assessment) throw new Error("Assessment not found");

        const problemStatement = assessment.applications?.jobs?.technical_problem_statement;
        const apiKey = Deno.env.get('GROQ_API_KEY')!;

        // --- 1. Transcribe Video (if available) ---
        let transcription = "No video submitted or transcription failed.";

        if (assessment.video_url) {
            try {
                console.log("Downloading video:", assessment.video_url);
                const { data: videoData, error: downloadError } = await supabaseAdmin
                    .storage
                    .from('technical-submissions')
                    .download(assessment.video_url);

                if (downloadError) throw downloadError;

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

        // --- 2. Analyze Submission (Text + Transcription) ---
        const prompt = `
        You are a Senior Technical Interviewer. Evaluate this technical submission for the following problem:
        
        Problem Statement: "${problemStatement}"
        
        Candidate Submission:
        - GitHub URL: ${assessment.github_url}
        - Tech Stack: ${assessment.tech_stack}
        - Process Flow: ${assessment.process_flow}
        - Issues Faced: ${assessment.issues_faced}
        - Cost Analysis: ${assessment.cost_analysis}
        
        Video Presentation Transcript:
        "${transcription}"
        
        Analyze the submission based on:
        1. Relevance to the problem.
        2. Complexity and depth of the solution.
        3. Problem-solving approach (issues faced).
        4. Communication quality and clarity of the video presentation (based on transcript).
        
        Provide a JSON output with:
        - score: number (0-100)
        - feedback: string (max 100 words) detailed feedback on strengths, weaknesses, and the video presentation.
        - improvement_suggestions: string (max 50 words) specific advice.
        `;

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
                model: 'llama-3.3-70b-versatile',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant that outputs JSON.' },
                    { role: 'user', content: prompt }
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
