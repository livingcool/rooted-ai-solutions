import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
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
        const { candidateName, jobTitle, reason } = await req.json()

        const apiKey = Deno.env.get('GEMINI_API_KEY');
        if (!apiKey) {
            throw new Error("GEMINI_API_KEY is not set in environment variables.");
        }
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

        const prompt = `
        You are an expert HR Specialist at "RootedAI". Write a polite, professional, and empathetic rejection email for a candidate.
        
        Candidate Name: ${candidateName}
        Job Title: ${jobTitle}
        Specific Reason (if any): ${reason || "General competitive pool"}
        
        The tone should be respectful and encouraging. Keep it concise (under 150 words). Explicitly mention "RootedAI" as the company name.
        
        Provide a JSON output with:
        - subject: string (Email subject line)
        - body: string (The email body content)
        `

        const result = await model.generateContent(prompt)
        const responseText = result.response.text()

        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        const jsonStr = jsonMatch ? jsonMatch[0] : responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        let aiResult;
        try {
            aiResult = JSON.parse(jsonStr);
        } catch (e) {
            console.error("JSON Parse Error:", e);
            aiResult = {
                subject: `Update regarding your application for ${jobTitle}`,
                body: "Thank you for your interest. Unfortunately, we have decided to move forward with other candidates."
            };
        }

        return new Response(
            JSON.stringify(aiResult),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

    } catch (error: any) {
        console.error("Error in generate-rejection:", error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
    }
})
