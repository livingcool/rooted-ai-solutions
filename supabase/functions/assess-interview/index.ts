import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { GoogleGenerativeAI } from "npm:@google/generative-ai"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { interviewId } = await req.json()
        console.log(`Analyzing interview: ${interviewId}`);

        // Init Supabase Admin
        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        // 1. Get Interview Details
        const { data: interview, error: interviewError } = await supabaseAdmin
            .from('interviews')
            .select('*')
            .eq('id', interviewId)
            .single()

        if (interviewError || !interview) {
            console.error("Error fetching interview:", interviewError);
            throw new Error('Interview not found')
        }
        console.log(`Found interview for question: ${interview.question}`);

        // 2. Download Audio
        console.log(`Downloading audio from: ${interview.audio_url}`);
        const { data: fileData, error: fileError } = await supabaseAdmin
            .storage
            .from('interview-recordings')
            .download(interview.audio_url)

        if (fileError) {
            console.error("Error downloading audio:", fileError);
            throw new Error('Failed to download audio')
        }
        console.log("Audio downloaded successfully");

        // 3. Analyze with Gemini
        console.log("Initializing Gemini AI...");
        const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') ?? '')
        // Use gemini-1.5-pro for better audio understanding
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

        const arrayBuffer = await fileData.arrayBuffer()
        const base64Data = btoa(
            new Uint8Array(arrayBuffer)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );

        const prompt = `
      You are an expert Communication Coach. Analyze this audio response to the interview question: "${interview.question}".
      
      Provide a JSON output with:
      - transcription: string (The full text transcription of the audio).
      - score: number (0-100) based on clarity, confidence, structure, and relevance.
      - feedback: string (max 50 words) highlighting strengths and areas for improvement.
    `

        console.log("Generating content with Gemini...");
        const result = await model.generateContent({
            contents: [
                {
                    role: 'user',
                    parts: [
                        { text: prompt },
                        {
                            inlineData: {
                                data: base64Data,
                                mimeType: "audio/webm", // Assuming webm from browser recorder
                            },
                        }
                    ]
                }
            ],
            safetySettings: [
                { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
                { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
                { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
                { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
            ],
        })

        const responseText = result.response.text()
        console.log("Gemini Response:", responseText);

        const jsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim()
        let aiResult;
        try {
            aiResult = JSON.parse(jsonStr);
        } catch (e) {
            console.error("JSON Parse Error:", e);
            aiResult = { score: 0, feedback: "AI Analysis failed.", transcription: "Transcription failed." };
        }

        // 4. Update Interview Record
        console.log("Updating interview with score:", aiResult.score);
        const { error: updateError } = await supabaseAdmin
            .from('interviews')
            .update({
                transcription: aiResult.transcription,
                ai_score: aiResult.score,
                ai_feedback: aiResult.feedback
            })
            .eq('id', interviewId)

        if (updateError) {
            console.error("Error updating interview:", updateError);
            throw updateError;
        }

        // 5. Update Application Status
        await supabaseAdmin
            .from('applications')
            .update({ status: 'Communication Round' })
            .eq('id', interview.application_id)

        return new Response(
            JSON.stringify({ success: true, data: aiResult }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

    } catch (error: any) {
        console.error("Error in assess-interview:", error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
    }
})
