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
        console.log(`Received request: ${req.method}`);

        let body;
        try {
            const text = await req.text();
            console.log("Raw body length:", text.length);
            if (!text || text.trim() === "") {
                throw new Error("Empty request body");
            }
            body = JSON.parse(text);
        } catch (e) {
            console.error("Failed to parse request body:", e);
            return new Response(
                JSON.stringify({ error: "Invalid or empty request body", details: e.message }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
            )
        }

        const { title, description, requirements } = body;

        const prompt = `
        You are an expert HR Specialist and Tech Recruiter at "RootedAI". Create a comprehensive, professional, and well-structured job description based on the input below.

        **CRITICAL FORMATTING RULES:**
        1. **STRUCTURE**: You MUST organize the content into these clear sections, separated by double newlines:
           - **About RootedAI** (Create a compelling brief about an AI/ML innovation company)
           - **About the Role** (Detailed overview of the position)
           - **Key Responsibilities** (Use bullet points • for a detailed list)
           - **What We Offer** (Perks, culture, growth opportunities)
        2. **FORMATTING**: Use plain text only (no markdown like ** or ##). Use uppercase for section headers (e.g., "ABOUT THE ROLE").
        3. **DETAIL**: The description should be detailed and descriptive, not brief. Expand on the points to make it engaging.
        4. **LISTS**: Use standard bullet points (•) for lists to ensure readability in a text area.

        **REQUIREMENTS GENERATION:**
        - Provide exactly 5 to 8 key technical requirements.
        - Each must be a specific skill (e.g., "React", "Python", "AWS").
        - Max 3-5 words per item.

        Job Title: ${title}
        Current Description: ${description}
        Current Requirements: ${requirements}
        
        Provide a JSON output with:
        - enhanced_description: string (The full, formatted job description with newlines \n and bullet points)
        - recommended_requirements: string[] (Array of 5-8 concise requirement strings)
        - tech_stack: string[] (List of specific technologies/software relevant to the role)
        `

        console.log("Request received");
        const apiKey = Deno.env.get('GROQ_API_KEY');
        if (!apiKey) {
            console.error("GROQ_API_KEY missing");
            throw new Error("GROQ_API_KEY is not set in environment variables.");
        }
        console.log("API Key found: " + apiKey.substring(0, 10) + "...");

        console.log("Generating content with Groq...");
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
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
            console.error("Groq API Error:", errorText);
            throw new Error(`Groq API Error: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();

        // --- Log Token Usage ---
        if (data.usage) {
            const supabaseAdmin = createClient(
                Deno.env.get('SUPABASE_URL') ?? '',
                Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
            )
            await supabaseAdmin.from('ai_usage_logs').insert({
                provider: 'groq',
                model: 'llama-3.3-70b-versatile',
                input_tokens: data.usage.prompt_tokens || 0,
                output_tokens: data.usage.completion_tokens || 0,
                total_tokens: data.usage.total_tokens || 0,
                function_name: 'enhance-job-description',
                status: 'success'
            });
        }

        const content = data.choices[0].message.content;
        console.log("Groq Response:", content);

        let aiResult;
        try {
            aiResult = JSON.parse(content);

            // Ensure requirements are a string for the frontend
            if (Array.isArray(aiResult.recommended_requirements)) {
                aiResult.recommended_requirements = aiResult.recommended_requirements.join(', ');
            }
        } catch (e) {
            console.error("JSON Parse Error:", e);
            aiResult = {
                enhanced_description: description,
                recommended_requirements: requirements,
                tech_stack: []
            };
        }

        return new Response(
            JSON.stringify(aiResult),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

    } catch (error: any) {
        console.error("CRITICAL ERROR in enhance-job-description:", error);
        console.error("Error Stack:", error.stack);

        const errorMessage = error.message || "Unknown error";
        const errorDetails = JSON.stringify(error, Object.getOwnPropertyNames(error));

        let status = 400;
        if (errorMessage.includes("GROQ_API_KEY")) status = 401;
        if (errorMessage.includes("Groq API Error")) status = 502;

        return new Response(
            JSON.stringify({ error: errorMessage, details: errorDetails }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: status }
        )
    }
})
