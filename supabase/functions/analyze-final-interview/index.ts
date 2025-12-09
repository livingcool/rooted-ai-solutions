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
        const reqText = await req.text();
        console.log("Raw Request Body:", reqText);

        let body;
        try {
            body = JSON.parse(reqText);
        } catch (e) {
            throw new Error("Invalid JSON in request body");
        }

        const { interviewId } = body;

        if (!interviewId) throw new Error("Missing interviewId in request body");
        console.log(`Analyzing Interview ID: ${interviewId}`);

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

        if (error) {
            console.error("Supabase Error:", error);
            throw new Error("DB Error: " + error.message);
        }
        if (!session) throw new Error("No session found for ID: " + interviewId);

        console.log("Session Found:", session.id);
        const transcriptLength = session.transcript ? session.transcript.length : 0;
        console.log("Transcript Length:", transcriptLength);

        if (!session.transcript) {
            console.warn("No transcript found to analyze.");
            return new Response(JSON.stringify({ message: "No transcript to analyze." }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

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
                model: 'llama-3.1-70b-versatile',
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: "Generate Evaluation now." }
                ],
                response_format: { type: "json_object" }
            })
        });

        if (!chatResp.ok) {
            const errText = await chatResp.text();
            console.error("Groq API Error Status:", chatResp.status, errText);

            let detailedMsg = errText;
            try {
                const errJson = JSON.parse(errText);
                if (errJson.error && errJson.error.message) {
                    detailedMsg = errJson.error.message;
                }
            } catch (e) { /* ignore parse error */ }

            if (chatResp.status === 429) {
                throw new Error(`Groq Rate Limit Exceeded: ${detailedMsg}. Please wait a moment and try again.`);
            }
            throw new Error(`Groq API Error (${chatResp.status}): ${detailedMsg}`);
        }

        const rawContent = await chatResp.text();
        console.log("Raw LLM Response:", rawContent);

        let apiResponse;
        try {
            apiResponse = JSON.parse(rawContent);
        } catch (e) {
            console.error("Failed to parse API response:", e);
            throw new Error("Invalid JSON from Groq API.");
        }

        // --- Log Token Usage ---
        if (apiResponse.usage) {
            const { prompt_tokens, completion_tokens, total_tokens } = apiResponse.usage;
            await supabase.from('ai_usage_logs').insert({
                provider: 'groq',
                model: 'llama-3.1-70b-versatile',
                input_tokens: prompt_tokens || 0,
                output_tokens: completion_tokens || 0,
                total_tokens: total_tokens || 0,
                function_name: 'analyze-final-interview',
                status: 'success'
            });
        }

        if (apiResponse.error) {
            throw new Error("Groq API Error: " + apiResponse.error.message);
        }

        let aiResponse;
        try {
            const contentString = apiResponse.choices?.[0]?.message?.content;
            if (!contentString) throw new Error("No content in AI response choices");

            // Clean markdown if present
            const cleanContent = contentString.replace(/```json/g, '').replace(/```/g, '');
            aiResponse = JSON.parse(cleanContent);

        } catch (e) {
            console.error("Failed to parse inner content JSON:", e);
            // Fallback
            aiResponse = {
                evaluation: {
                    technical_score: 5,
                    communication_score: 5,
                    behaviour_score: 5,
                    culture_fit_score: 5,
                    recommendation: "Hold",
                    reasoning_summary: ["AI Output Parsing Failed"]
                }
            };
        }

        if (!aiResponse || !aiResponse.evaluation) {
            // Fallback attempt if top level
            if (aiResponse && aiResponse.technical_score) {
                aiResponse = { evaluation: aiResponse };
            } else {
                console.error("Invalid Structure:", aiResponse);
                throw new Error("AI response missing 'evaluation' key");
            }
        }

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
