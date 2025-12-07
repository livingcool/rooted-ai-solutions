import { createClient } from "@supabase/supabase-js";

export const config = {
    runtime: 'edge',
};

export default async function handler(req: Request) {
    if (req.method === 'OPTIONS') {
        return new Response('ok', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
            },
        });
    }

    try {
        const { interviewId, audioUrl, question } = await req.json();
        console.log(`Analyzing interview: ${interviewId}`);

        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        const groqApiKey = process.env.GROQ_API_KEY;

        if (!supabaseUrl || !supabaseKey || !groqApiKey) {
            throw new Error("Missing environment variables.");
        }

        const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

        // Download Audio
        const { data: fileData, error: fileError } = await supabaseAdmin
            .storage
            .from('interview-recordings')
            .download(audioUrl);

        if (fileError) {
            console.error("Error downloading audio:", fileError);
            throw new Error('Failed to download audio');
        }

        // 1. Transcribe
        console.log("Transcribing with Groq Whisper...");
        const formData = new FormData();
        formData.append('file', fileData, 'audio.webm');
        formData.append('model', 'distil-whisper-large-v3-en');
        formData.append('response_format', 'json');

        const transcriptionResponse = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${groqApiKey}`,
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
                'Authorization': `Bearer ${groqApiKey}`,
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
            .eq('id', interviewId);

        if (updateError) throw updateError;

        return new Response(
            JSON.stringify({ success: true }),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            }
        );

    } catch (error: any) {
        console.error("Error in analyze-interview:", error);
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            }
        );
    }
}
