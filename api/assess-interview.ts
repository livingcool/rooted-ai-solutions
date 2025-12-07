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
        const { interviewId } = await req.json();
        console.log(`Analyzing interview: ${interviewId}`);

        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        const groqApiKey = process.env.GROQ_API_KEY;

        if (!supabaseUrl || !supabaseKey || !groqApiKey) {
            throw new Error("Missing environment variables (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, or GROQ_API_KEY).");
        }

        const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

        // 1. Get Interview Details
        const { data: interview, error: interviewError } = await supabaseAdmin
            .from('interviews')
            .select('*')
            .eq('id', interviewId)
            .single();

        if (interviewError || !interview) {
            console.error("Error fetching interview:", interviewError);
            throw new Error('Interview not found');
        }

        // 2. Download Audio
        console.log(`Downloading audio from: ${interview.audio_url}`);
        const { data: fileData, error: fileError } = await supabaseAdmin
            .storage
            .from('interview-recordings')
            .download(interview.audio_url);

        if (fileError) {
            console.error("Error downloading audio:", fileError);
            throw new Error('Failed to download audio');
        }

        // 3. Transcribe with Groq Whisper
        console.log("Transcribing with Groq Whisper...");
        const formData = new FormData();
        formData.append('file', fileData, 'audio.webm'); // Assuming webm
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
        console.log("Transcription:", transcription);

        // 4. Analyze with Groq Llama
        console.log("Analyzing with Groq Llama...");
        const prompt = `
        You are an expert Communication Coach. Analyze this transcription of an interview answer to the question: "${interview.question}".
        
        Transcription: "${transcription}"
        
        Provide a JSON output with:
        - score: number (0-100) based on clarity, confidence, structure, and relevance.
        - feedback: string (max 50 words) highlighting strengths and areas for improvement.
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
            aiResult = { score: 0, feedback: "AI Analysis failed.", transcription: transcription };
        }

        // 5. Update Interview Record
        console.log("Updating interview with score:", aiResult.score);
        const { error: updateError } = await supabaseAdmin
            .from('interviews')
            .update({
                transcription: aiResult.transcription,
                ai_score: aiResult.score,
                ai_feedback: aiResult.feedback
            })
            .eq('id', interviewId);

        if (updateError) throw updateError;

        // 6. Update Application Status
        await supabaseAdmin
            .from('applications')
            .update({ status: 'Communication Round' })
            .eq('id', interview.application_id);

        return new Response(
            JSON.stringify({ success: true, data: aiResult }),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            }
        );

    } catch (error: any) {
        console.error("Error in assess-interview:", error);
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
