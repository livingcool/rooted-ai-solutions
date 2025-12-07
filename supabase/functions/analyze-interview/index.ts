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

        // 1. Transcribe
        console.log("Transcribing with Groq Whisper...");
        const formData = new FormData();
        formData.append('file', audioBlob, 'audio.webm');
        formData.append('model', 'distil-whisper-large-v3-en');
        formData.append('response_format', 'json');

        const transcriptionResponse = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
            },
            body: formData
        });

        if (!transcriptionResponse.ok) {
            const errorText = await transcriptionResponse.text();
            console.error("Groq Whisper Error:", errorText);
            throw new Error(`Groq Whisper Error: ${transcriptionResponse.status} - ${errorText}`);
        }

        const transcriptionData = await transcriptionResponse.json();
        const transcription = transcriptionData.text;
        console.log("Transcription length:", transcription.length);

        // 2. Analyze
        console.log("Analyzing with Groq Llama...");
        const prompt = `
        You are an expert interviewer for "RootedAI". Analyze this audio answer for the question: "${question}".
        
        Transcription: "${transcription}"
        
        Provide a JSON output with:
        - score: number (0-100) based on clarity, relevance, and confidence.
        - feedback: string (max 50 words) constructive feedback.
        `;

        const analysisResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
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

        if (!analysisResponse.ok) {
            const errorText = await analysisResponse.text();
            console.error("Groq Llama Error:", errorText);
            throw new Error(`Groq Llama Error: ${analysisResponse.status} - ${errorText}`);
        }

        const analysisData = await analysisResponse.json();
        const content = analysisData.choices[0].message.content;

        let aiResult;
        try {
            aiResult = JSON.parse(content);
            aiResult.transcription = transcription;
        } catch (e) {
            console.error("JSON Parse Error:", e);
            aiResult = {
                transcription: transcription,
                score: 0,
                feedback: "AI analysis failed to parse response."
            };
        }

        // Update Interview
        const { error: updateError } = await supabaseAdmin
            .from('interviews')
            .update({
                transcription: aiResult.transcription,
                ai_score: aiResult.score,
                ai_feedback: aiResult.feedback
            })
            .eq('id', interviewId)

        if (updateError) throw updateError;

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
