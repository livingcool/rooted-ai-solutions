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
        const { interviewId, audioUrl, question } = await req.json()
        console.log(`Analyzing interview: ${interviewId}`);

        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        // Download Audio
        const { data: fileData, error: fileError } = await supabaseAdmin
            .storage
            .from('interview-recordings')
            .download(audioUrl)

        if (fileError) {
            console.error("Error downloading audio:", fileError);
            throw new Error('Failed to download audio')
        }

        // Gemini Setup
        const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') ?? '')
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

        const arrayBuffer = await fileData.arrayBuffer()
        const base64Data = btoa(
            new Uint8Array(arrayBuffer)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );

        const prompt = `
        You are an expert interviewer for "RootedAI". Analyze this audio answer for the question: "${question}".
        
        Provide a JSON output with:
        - transcription: string (The text transcription of the audio)
        - score: number (0-100) based on clarity, relevance, and confidence.
        - feedback: string (max 50 words) constructive feedback.
        `

        const result = await model.generateContent({
            contents: [{
                role: 'user',
                parts: [
                    { text: prompt },
                    { inlineData: { data: base64Data, mimeType: "audio/webm" } }
                ]
            }]
        })

        const responseText = result.response.text()
        console.log("Gemini Response:", responseText);

        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        const jsonStr = jsonMatch ? jsonMatch[0] : responseText.replace(/```json/g, '').replace(/```/g, '').trim();

        let aiResult;
        try {
            aiResult = JSON.parse(jsonStr);
        } catch (e) {
            console.error("JSON Parse Error:", e);
            aiResult = {
                transcription: "Transcription failed.",
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
            JSON.stringify({ error: error.message }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
    }
})
