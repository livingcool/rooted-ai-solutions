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
        Generate 3 distinct, challenging, and relevant technical take-home project options for a candidate applying for the role of "${jobTitle}".
        
        Job Context: ${jobDescription || "Standard requirements for this role."}
        
        Each project should be doable in 3-4 hours but deep enough to assess:
        - Code quality and structure.
        - Problem-solving skills.
        - Technical proficiency relevant to the role.
        
        Provide the output as a JSON array of objects with the following structure:
        {
            "title": "Project Title",
            "description": "Detailed problem statement...",
            "deliverables": "List of expected artifacts (e.g., GitHub repo, video demo, deployed link)",
            "evaluation_criteria": "What to look for (e.g., clean code, error handling, UI/UX)"
        }
        
        Ensure the projects are different in nature (e.g., one focused on API, one on UI, one on full-stack feature).
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
