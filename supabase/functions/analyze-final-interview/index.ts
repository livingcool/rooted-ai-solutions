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
        const { interviewId } = await req.json();

        if (!interviewId) throw new Error("Missing interviewId");

        // Init Supabase
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
        const supabase = createClient(supabaseUrl, supabaseKey);
        const groqKey = Deno.env.get('GROQ_API_KEY')!;

        // 1. Fetch Interview Data
        const { data: session, error } = await supabase
            .from('final_interviews')
            .select('*, applications(resume_text, jobs(title, description, requirements, type))')
            .eq('id', interviewId)
            .single();

        if (error) throw new Error(error.message);
        if (!session) throw new Error("No session found");

        const application = session.applications;
        const jobTitle = application?.jobs?.title || "Junior AI Engineer";
        const jobDescription = (application?.jobs?.description || "A generic role.").substring(0, 500);
        const jobRequirements = (application?.jobs?.requirements || []).join(", ");
        const experienceLevel = application?.jobs?.type || "Full-time";
        const resumeText = application?.resume_text || "No resume context available.";
        // Truncate Resume Context
        const extendedContext = (resumeText.length > 50) ? resumeText.substring(0, 1000).replace(/\s+/g, ' ') : (session.project_questions?.context || "").substring(0, 500);

        const projectContext = session.project_questions?.context || "";
        const fullTranscript = session.transcript || "";

        if (!fullTranscript) {
            return new Response(JSON.stringify({ message: "No transcript to analyze." }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        // Limit transcript for token safety, but try to keep as much as possible for evaluation
        const transcriptHistory = fullTranscript.length > 10000 ?
            "...(older history truncated)...\n" + fullTranscript.slice(-10000) :
            fullTranscript;

        const systemPrompt = `
You are AI-Recruiter for RootedAI.
Task: Retroactively Evaluate this Candidate Interview for: ${jobTitle}.

Context:
- Role: ${jobDescription}
- Skills: ${jobRequirements}
- Type: ${experienceLevel}
- Resume: ${extendedContext}
- Project Context: ${projectContext}

Transcript:
${transcriptHistory}

INSTRUCTIONS:
Analyze the transcript above. Provide a detailed evaluation of the candidate.

OUTPUT FORMAT (JSON ONLY):
{"evaluation": {"technical_score": 0-10, "communication_score": 0-10, "behaviour_score": 0-10, "culture_fit_score": 0-10, "recommendation": "Strong Hire / Hire / No Hire", "reasoning_summary": "bullets"}}
`;

        const chatResp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${groqKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: "Generate Evaluation now." }
                ],
                response_format: { type: "json_object" }
            })
        });

        const chatJson = await chatResp.json();

        if (chatJson.error) {
            console.error("Chat API Error:", chatJson.error);
            throw new Error(`AI Chat Generation Failed: ${chatJson.error.message}`);
        }

        const aiResponse = JSON.parse(chatJson.choices[0].message.content);

        // Update DB
        const updatePayload: any = {
            updated_at: new Date().toISOString()
        };

        if (aiResponse.evaluation) {
            updatePayload.ai_feedback = JSON.stringify(aiResponse.evaluation);
            updatePayload.ai_role_fit_score = (
                (aiResponse.evaluation.technical_score || 0) +
                (aiResponse.evaluation.communication_score || 0) +
                (aiResponse.evaluation.behaviour_score || 0) +
                (aiResponse.evaluation.culture_fit_score || 0)
            ) / 4;
            updatePayload.ai_recommendation = aiResponse.evaluation.recommendation;
            updatePayload.status = 'Analyzed';
        }

        await supabase
            .from('final_interviews')
            .update(updatePayload)
            .eq('id', session.id);

        return new Response(JSON.stringify({ success: true, evaluation: aiResponse.evaluation }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error: any) {
        console.error("Critical Error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400
        });
    }
})
