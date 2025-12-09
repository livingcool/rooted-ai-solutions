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
            .select('*, applications(full_name, email, jobs(title, description, technical_problem_statement))')
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

        const appData = assessment.applications;
        const jobData = appData?.jobs;
        const problemStatement = jobData?.technical_problem_statement || "No Problem Statement";
        const jobTitle = jobData?.title || "Technologist";
        const jobDesc = jobData?.description || "";
        const candidateName = appData?.full_name || "Candidate";
        const candidateEmail = appData?.email;
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

                if (downloadError) throw downloadError;

                console.log("Transcribing video...");
                const formData = new FormData();
                formData.append('file', videoData, 'video.mp4');
                formData.append('model', 'whisper-large-v3');
                formData.append('response_format', 'json');

                const transResponse = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${apiKey}` },
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
        const hasFrames = frames && frames.length > 0;
        const model = hasFrames ? 'llama-3.2-90b-vision-preview' : 'llama-3.3-70b-versatile';

        console.log(`Analyzing with ${model}...`);

        const systemMessage = `
        You are a Senior Lead Engineer. Evaluate this technical submission for the role of **${jobTitle}**.
        
        Job Context:
        "${jobDesc.substring(0, 500)}..."
        
        Your Goal:
        Perform a **Strict Compliance Check** and **Product Analysis**.
        1.  Does the solution solve the Problem Statement?
        2.  Does the Tech Stack and approach match the Job Role requirements?
        3.  Evaluate the **Product Thinking** (Issues faced, solutions, user focus).
        
        Use the provided Project Details, Video Transcript${hasFrames ? ', and Video Frames' : ''}.

        Return a JSON object with:
        -   score: number (0-100). Be strict. <70 is a failure.
        -   feedback: string (max 150 words) - Critical analysis of code quality, product thinking, and role fit.
        -   improvement_suggestions: string (max 50 words) - Specific technical advice.
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

        if (hasFrames) {
            frames.forEach((frame: string) => {
                userContent.push({
                    type: "image_url",
                    image_url: { url: frame }
                });
            });
        }

        // Retry logic
        const fetchWithRetry = async (url: string, options: RequestInit, retries = 3, backoff = 2000) => {
            for (let i = 0; i < retries; i++) {
                const response = await fetch(url, options);
                if (response.status === 429) {
                    await new Promise(resolve => setTimeout(resolve, backoff));
                    backoff *= 2;
                    continue;
                }
                return response;
            }
            throw new Error("Max retries exceeded for Groq API");
        };

        const response = await fetchWithRetry('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: model,
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

        // --- AUTOMATION LOGIC ---
        const MIN_SCORE_TECH = 70;
        let newStatus = 'Analyzed';
        let emailSubject = "";
        let emailBody = "";
        let shouldSendEmail = false;

        if (content.score >= MIN_SCORE_TECH) {
            newStatus = 'Final Interview';

            // 1. Create Final Interview Record
            const { data: finalRound, error: createError } = await supabaseAdmin
                .from('final_interviews')
                .insert({
                    application_id: applicationId,
                    status: 'Scheduled',
                    // Project Context for AI Agent
                    project_questions: {
                        context: `The candidate built a solution using ${assessment.tech_stack}.`,
                        ai_notes: content.feedback
                    }
                })
                .select('interview_token')
                .single();

            if (createError) {
                console.error("Failed to create Final Interview:", createError);
                // Fallback: Don't block the status update, but log error.
            }

            const token = finalRound?.interview_token;
            const frontendUrl = Deno.env.get('FRONTEND_URL') || 'https://rooted-ai-solutions.vercel.app';
            const interviewLink = `${frontendUrl}/final-interview?token=${token}`;

            emailSubject = `Final Round Invitation: AI Founder Interview`;
            emailBody = `
Dear ${candidateName},

We are impressed with your technical submission! Your solution demonstrated strong product thinking (Score: ${content.score}/100), aligning well with the **${jobTitle}** role.

We would like to invite you to the **Final Interview**. This is a live video interview with our AI Founder Agent to discuss your project and role fit.

**Schedule & Start Here**: [Click to Start Final Interview](${interviewLink})

Please ensure you have a working camera and microphone.

Best regards,
RootedAI Recruiting Team
            `;
            shouldSendEmail = true;
        } else {
            newStatus = 'Rejected';
            emailSubject = `Update on your application for ${jobTitle}`;
            emailBody = `
Dear ${candidateName},

Thank you for your technical submission. After a strict review of your code and product analysis, we have decided not to proceed further at this time (Score: ${content.score}/100).

We appreciate your effort and wish you the best.

Best regards,
RootedAI Recruiting Team
            `;
            shouldSendEmail = true;
        }

        // Update Assessment
        const { error: updateError } = await supabaseAdmin
            .from('technical_assessments')
            .update({
                ai_score: content.score,
                ai_feedback: content.feedback,
                improvement_suggestions: content.improvement_suggestions,
                transcription: transcription,
                status: 'Analyzed'
            })
            .eq('id', assessment.id);

        if (updateError) throw updateError;

        // Update Application Status
        await supabaseAdmin
            .from('applications')
            .update({ status: newStatus })
            .eq('id', applicationId);

        // Send Email
        if (shouldSendEmail && candidateEmail) {
            await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-rejection-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${supabaseKey}`
                },
                body: JSON.stringify({
                    email: candidateEmail,
                    subject: emailSubject,
                    body: emailBody
                })
            });
        }

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
