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
        try {
            let jobId = null;
            try {
                const body = await req.json();
                jobId = body.jobId;
            } catch {
                // Body is empty or invalid JSON, ignore
            }

            const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
            const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
            const supabase = createClient(supabaseUrl, supabaseKey);
            const groqKey = Deno.env.get('GROQ_API_KEY')!;

            // 1. Fetch Candidates Data
            console.log("Fetching candidates...");
            let query = supabase
                .from('applications')
                .select(`
                full_name, status,
                ai_score, ai_feedback,
                interviews(ai_score, ai_feedback),
                technical_assessments(ai_score, ai_feedback),
                final_interviews(ai_confidence_score, ai_role_fit_score, ai_feedback)
            `)
                .order('created_at', { ascending: false })
                .limit(20); // Analyze top 20 recent

            if (jobId) {
                query = query.eq('job_id', jobId);
            }

            const { data: candidates, error } = await query;
            if (error) throw error;

            // 2. Format Data for AI
            const candidatesData = candidates.map(c => ({
                Name: c.full_name,
                Status: c.status,
                Resume: c.ai_score ? `${c.ai_score}/100` : "N/A",
                Communication: c.interviews?.[0]?.ai_score ? `${c.interviews[0].ai_score}/100` : "N/A",
                Technical: c.technical_assessments?.[0]?.ai_score ? `${c.technical_assessments[0].ai_score}/100` : "N/A",
                Final_Confidence: c.final_interviews?.[0]?.ai_confidence_score ? `${(c.final_interviews[0].ai_confidence_score * 100).toFixed(0)}%` : "N/A",
                Tech_Feedback: c.technical_assessments?.[0]?.ai_feedback || "",
                Final_Feedback: c.final_interviews?.[0]?.ai_feedback || ""
            }));

            const systemPrompt = `
        You are an Expert HR Executive. Generate a "Hiring Decision Report" for the following candidates.
        
        Your Goal:
        1. **Rank the candidates** from Best Fit to Least Fit based on their scores across all rounds (Resume, Comm, Tech, Final).
        2. **Provide a Summary** for the Top 3 candidates, highlighting WHY they are good (cite specific strengths).
        3. **Flag any concerns** for lower-ranked candidates.
        4. Use **Markdown** formatting (Tables, Bold text).
        
        Output Format:
        # Executive Hiring Report
        ## Top Recommendations
        ...
        ## Candidate Ranking Table
        ...
        ## Detailed Analysis
        ...
        `;

            // 3. Generate Report with Llama 3.3
            console.log("Generating report...");
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${groqKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: JSON.stringify(candidatesData) }
                    ]
                })
            });

            if (!response.ok) {
                const txt = await response.text();
                throw new Error("Groq API Error: " + txt);
            }

            const json = await response.json();

            // --- Log Token Usage ---
            if (json.usage) {
                await supabase.from('ai_usage_logs').insert({
                    provider: 'groq',
                    model: 'llama-3.3-70b-versatile',
                    input_tokens: json.usage.prompt_tokens || 0,
                    output_tokens: json.usage.completion_tokens || 0,
                    total_tokens: json.usage.total_tokens || 0,
                    function_name: 'generate-hiring-report',
                    status: 'success'
                });
            }

            const report = json.choices[0].message.content;

            return new Response(JSON.stringify({ report }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });

        } catch (error) {
            return new Response(JSON.stringify({ error: error.message }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400
            });
        }
    })
