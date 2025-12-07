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

    try {
        const { jobTitle, jobDescription } = await req.json()

        const apiKey = Deno.env.get('GROQ_API_KEY')!;

        const prompt = `
        You are a Senior Technical Recruiter and Engineering Manager.
        Generate 3 distinct, **intermediate-level** technical take-home project options for a candidate applying for the role of "${jobTitle}".
        
        Job Context: ${jobDescription || "Standard requirements for this role."}
        
        **Requirements:**
        1. Level: Intermediate. Not too basic, but not architecturally overwhelming.
        2. AI Usage: Explicitly mention that **"Candidates are encouraged to use AI tools to accomplish this project."**
        3. Format: **PLAIN TEXT ONLY**. Do NOT use Markdown (no bolding, no headers with #). Use UPPERCASE for section headers.
        
        Each project should be doable in 3-4 hours.
        
        Provide the output as a JSON array of objects with the following structure:
        {
            "title": "Project Title",
            "description": "Detailed problem statement...",
            "deliverables": "List of expected artifacts",
            "evaluation_criteria": "What to look for"
        }
        `;

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
            throw new Error(`Groq Error: ${response.status} - ${errorText}`);
        }

        const aiData = await response.json();
        const content = JSON.parse(aiData.choices[0].message.content);

        // Handle case where LLM might wrap the array in a key like "projects"
        const projects = Array.isArray(content) ? content : (content.projects || []);

        return new Response(
            JSON.stringify({ projects }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

    } catch (error: any) {
        console.error("Error in generate-technical-projects:", error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
    }
})
