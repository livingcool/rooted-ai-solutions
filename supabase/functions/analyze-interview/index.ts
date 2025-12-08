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

    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { headers: corsHeaders, status: 405 })
    }

    try {
        const { interviewId, audioUrl, question } = await req.json()
        console.log(`Analyzing interview: ${interviewId}`);

        if (!interviewId || !audioUrl || !question) {
            throw new Error(`Missing required fields: interviewId=${interviewId}, audioUrl=${audioUrl}, question=${!!question}`);
        }

        const supabaseUrl = Deno.env.get('SUPABASE_URL');
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

        if (!supabaseUrl || !supabaseKey) {
            throw new Error("Missing Supabase environment variables (SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY)");
        }

        const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

        // Download Audio using Signed URL workaround
        console.log(`Downloading audio from: ${audioUrl}`);

        // Remove bucket name from path if it's included
        let audioPath = audioUrl.startsWith('interview-recordings/')
            ? audioUrl.substring('interview-recordings/'.length)
            : audioUrl;

        if (audioPath.startsWith('/')) audioPath = audioPath.substring(1);

        console.log(`Using path for signed URL: '${audioPath}'`);

        let audioBlob: Blob;

        try {
            const { data: signedUrlData, error: signedUrlError } = await supabaseAdmin
                .storage
                .from('interview-recordings')
                .createSignedUrl(audioPath, 60);

            if (signedUrlError || !signedUrlData) {
                throw new Error(`Signed URL creation failed: ${signedUrlError?.message}`);
            }

            const audioResponse = await fetch(signedUrlData.signedUrl);
            if (!audioResponse.ok) {
                throw new Error(`Fetch from signed URL failed: ${audioResponse.status}`);
            }

            audioBlob = await audioResponse.blob();
            console.log("Audio downloaded via Signed URL");

        } catch (e) {
            console.warn("Signed URL method failed, trying direct download...", e);
            const { data, error } = await supabaseAdmin
                .storage
                .from('interview-recordings')
                .download(audioPath);

            if (error) {
                console.error("Direct download also failed:", error);
                throw new Error(`Failed to download audio: ${error.message}`);
            }
            if (!data) {
                throw new Error("Download returned no data");
            }
            audioBlob = data;
            console.log("Audio downloaded via direct download");
        }

        console.log(`Audio Blob: Size=${audioBlob.size}, Type=${audioBlob.type}`);

        if (audioBlob.size === 0) {
            throw new Error("Downloaded audio file is empty");
        }
        // Groq Setup
        const apiKey = Deno.env.get('GROQ_API_KEY');
        if (!apiKey) {
            throw new Error("GROQ_API_KEY is not set in environment variables.");
        }

        // 1. Fetch Job Description for Contextual Analysis
        const { data: interviewData, error: interviewError } = await supabaseAdmin
            .from('interviews')
            .select('application_id, applications(full_name, email, jobs(title, description))')
            .eq('id', interviewId)
            .single();

        if (interviewError || !interviewData) throw new Error("Failed to fetch interview context");

        const jobTitle = interviewData.applications?.jobs?.title || "Generic Role";
        const jobDesc = interviewData.applications?.jobs?.description || "";
        const candidateName = interviewData.applications?.full_name || "Candidate";
        const candidateEmail = interviewData.applications?.email;

        // 2. Transcribe
        console.log("Transcribing with Groq Whisper...");
        const formData = new FormData();
        formData.append('file', audioBlob, 'audio.webm');
        formData.append('model', 'whisper-large-v3');

        const transResponse = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${apiKey}` },
            body: formData
        });

        if (!transResponse.ok) {
            throw new Error(`Groq Transcription Failed: ${transResponse.status}`);
        }

        const transData = await transResponse.json();
        const transcription = transData.text;

        // 3. Analyze with Groq (Contextual)
        const prompt = `
        You are an expert technical interviewer for the role of "${jobTitle}".
        Job Description: "${jobDesc.substring(0, 1000)}..."

        Evaluate the candidate's answer to the question: "${question}"
        
        Candidate's Answer (Transcribed):
        "${transcription}"
        
        Provide a JSON output with:
        - score: number (0-100) assessing relevance, clarity, and depth relative to the Job Role.
        - feedback: string (max 100 words) summary of the answer quality.
        `;

        const aiResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
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

        if (!aiResponse.ok) throw new Error(`Groq Analysis Failed: ${aiResponse.status}`);

        const aiData = await aiResponse.json();
        const content = JSON.parse(aiData.choices[0].message.content);

        // --- AUTOMATION LOGIC ---
        // Threshold: 65/100
        const MIN_SCORE_COMM = 65;
        let newStatus = 'Interviewed';
        let emailSubject = "";
        let emailBody = "";
        let shouldSendEmail = false;

        if (content.score > MIN_SCORE_COMM) {
            newStatus = 'Technical Round';
            emailSubject = `Congratulations! You've moved to the Technical Round`;
            emailBody = `
Dear ${candidateName},

Great job on your communication assessment! You scored ${content.score}/100.

We are excited to invite you to the **Technical Assessment Round**.
Please log in to your dashboard to view the technical problem statement and submit your solution.

Best,
RootedAI Recruiting Team
            `;
            shouldSendEmail = true;
        } else {
            newStatus = 'Rejected';
            emailSubject = `Update on your application for ${jobTitle}`;
            emailBody = `
Dear ${candidateName},

Thank you for completing the communication assessment. Unfortunately, your score (${content.score}/100) did not meet our threshold for this specific role.

We appreciate your time and wish you success in your future endeavors.

Best,
RootedAI Recruiting Team
            `;
            shouldSendEmail = true;
        }

        // 4. Update Interview & Application
        const { error: updateError } = await supabaseAdmin
            .from('interviews')
            .update({
                transcript: transcription,
                ai_score: content.score,
                ai_feedback: content.feedback,
                status: 'Analyzed'
            })
            .eq('id', interviewId);

        if (updateError) throw updateError;

        // Update Application Status
        await supabaseAdmin
            .from('applications')
            .update({ status: newStatus })
            .eq('id', interviewData.application_id);

        // 5. Send Email
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
        console.error("Error in analyze-interview:", error);
        return new Response(
            JSON.stringify({ error: error.message, stack: error.stack, details: error }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
    }
})
