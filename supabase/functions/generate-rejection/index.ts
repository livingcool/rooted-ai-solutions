import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

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

        const apiKey = Deno.env.get('GROQ_API_KEY');
        if (!apiKey) {
            console.error("GROQ_API_KEY missing");
            throw new Error("GROQ_API_KEY is not set in environment variables.");
        }

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

        console.log("Generating rejection email with Groq...");
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama3-8b-8192',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant that outputs JSON.' },
                    { role: 'user', content: prompt }
                ],
                response_format: { type: 'json_object' }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Groq API Error:", errorText);
            throw new Error(`Groq API Error: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content;
        console.log("Groq Response:", content);

        let aiResult;
        try {
            aiResult = JSON.parse(content);
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
        const errorMessage = error.message || "Unknown error";
        const errorDetails = JSON.stringify(error, Object.getOwnPropertyNames(error));
        console.error("Error Details:", errorDetails);

        let status = 400;
        if (errorMessage.includes("GROQ_API_KEY")) status = 401;
        if (errorMessage.includes("Groq API Error")) status = 502;

        return new Response(
            JSON.stringify({ error: errorMessage, details: errorDetails }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: status }
        )
    }
})
