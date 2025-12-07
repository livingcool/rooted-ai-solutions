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
        const { jobTitle, jobDescription, customFeedback } = await req.json()

        const apiKey = Deno.env.get('GROQ_API_KEY')!;

        const prompt = `
        You are a Venture Capitalist, Product Manager, and Technical Recruiter.
        Generate 3 distinct "End-to-End Startup Solution" technical project options for a candidate applying for the role of "${jobTitle}".
        
        Job Context: ${jobDescription || "Standard requirements for this role."}
        ${customFeedback ? `Custom Requirements/Feedback: ${customFeedback}` : ""}
        
        **Goal:** The project should be a mini-startup MVP that solves a real problem.
        
        **Evaluation Criteria (The "Why?" & "Brutally Honest" Analysis):**
        For EACH project, you must evaluate it against these 11 criteria:
        1. Willingness to Pay: Who signs the check? Do they have budget?
        2. Market Demand: Cyclic vs Niche? Avoid broad/shallow.
        3. Time to Value (TAT): Can user get value < 1 day?
        4. Feasibility: Is MVP buildable in 2 months? (Project scope for candidate is 3-4 hours, but the *idea* must be feasible).
        5. The Moat (Data): Does it get smarter with use?
        6. Defensibility: Can ChatGPT kill this? (If yes, value = $0).
        7. Monetization Clarity: Subscription vs Transaction. No "figure it out later".
        8. Retention Strategy: Why come back? Avoid "One-and-Done".
        9. ROI for Customers: Hard $$ saved/earned, not just "feels better".
        10. Addition of AI: Why AI? Is it doing more than a logical script?
        11. ICP & Pricing: Creative ways to capitalize on Ideal Customer Profile.

        **Output Format:**
        Provide a JSON array of objects. Each object MUST have:
        1. "title": Project Title.
        2. "startup_analysis": A detailed object containing the 11 points above. Be BRUTALLY HONEST. Point out lags and suggest improvements.
        3. "email_format": A clean, structured string (PLAIN TEXT, NO MARKDOWN) to send to the candidate. 
           - Structure: 
             PROJECT TITLE
             
             PROBLEM STATEMENT (The "Why")
             
             IMPLEMENTATION DETAILS (The "What" & "How"): Be extremely specific. List exactly what features to build, what API endpoints to create, and what UI components are needed.
             
             DELIVERABLES
             
             DELIVERABLES
             
             EVALUATION CRITERIA (Technical & Functional):
             - Code Quality & Organization
             - Feature Completeness (Did they build the required features?)
             - UI/UX Design (Is it intuitive and "wow"?)
             - Technical Choices (Why this stack?)
             - (Do NOT include the 11-point startup criteria here. This is for grading the code.)

           - Explicitly mention: "Candidates are encouraged to use AI tools to accomplish this project."
           - The project scope for the candidate must be doable in 3-4 hours (a slice of the full startup idea).

        JSON Structure:
        {
            "projects": [
                {
                    "title": "...",
                    "startup_analysis": { ... },
                    "email_format": "PROJECT TITLE: ...\n\nPROBLEM STATEMENT: ...\n\nIMPLEMENTATION DETAILS: ...\n\nDELIVERABLES: ...\n\nEVALUATION CRITERIA: ..."
                }
            ]
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
