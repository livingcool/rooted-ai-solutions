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
        const formData = await req.formData();
        const interviewToken = formData.get('interview_token');
        const audioFile = formData.get('audio');
        const videoFrame = formData.get('frame'); // Base64 or file
        const tabViolations = formData.get('tab_violations'); // Compliance check

        if (!interviewToken) throw new Error("Missing interview token");

        // Init Supabase
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
        const supabase = createClient(supabaseUrl, supabaseKey);
        const groqKey = Deno.env.get('GROQ_API_KEY')!;

        // 1. Verify Session & Get Context
        let session;
        try {
            const { data, error } = await supabase
                .from('final_interviews')
                .select('*, applications(resume_text, jobs(title, description, requirements, type))')
                .eq('interview_token', interviewToken)
                .single();

            if (error) throw new Error(error.message);
            if (!data) throw new Error("No session found");

            // Check Expiry
            if (data.expires_at && new Date() > new Date(data.expires_at)) {
                throw new Error("This interview link has expired. Please contact the recruiting team.");
            }

            session = data;
        } catch (err: any) {
            console.error("Session Verification Failed:", err);
            throw new Error(`Session Verification Failed: ${err.message}`);
        }

        const application = session.applications;
        const jobTitle = application?.jobs?.title || "Junior AI Engineer";
        const jobDescription = (application?.jobs?.description || "A generic role.").substring(0, 500); // Truncate to save tokens
        const jobRequirements = (application?.jobs?.requirements || []).join(", ");
        const experienceLevel = application?.jobs?.type || "Full-time";
        const resumeText = application?.resume_text || "No resume context available.";
        // Truncate Resume Context significantly (max 1000 chars)
        const extendedContext = (resumeText.length > 50) ? resumeText.substring(0, 1000).replace(/\s+/g, ' ') : (session.project_questions?.context || "").substring(0, 500);

        // 2. Transcribe Audio (Whisper)
        let userText = "";
        if (audioFile) {
            const transData = new FormData();
            transData.append('file', audioFile);
            transData.append('model', 'whisper-large-v3');

            const transResp = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${groqKey}` },
                body: transData
            });
            const transJson = await transResp.json();
            userText = transJson.text;
        }

        // 3. Analyze Video Frame (Llama Vision) - Token Optimized
        let visionContext = "No video frame.";
        if (videoFrame) {
            const visionResp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${groqKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'meta-llama/llama-4-scout-17b-16e-instruct',
                    messages: [{
                        role: "user",
                        content: [
                            { type: "text", text: "Candidate visual check. Output 'Normal' or brief issue (max 5 words)." },
                            { type: "image_url", image_url: { url: videoFrame } }
                        ]
                    }]
                })
            });
            const visionJson = await visionResp.json();

            if (visionJson.error) {
                console.error("Vision API Error:", visionJson.error);
                visionContext = `Error: ${visionJson.error.message}`;
            } else {
                visionContext = visionJson.choices?.[0]?.message?.content || "No content";
            }
        }

        // 4. Generate AI Response (Behavioral + Project Context)
        const projectContext = session.project_questions?.context || "";
        // Optimize History: Keep only last 4000 chars (~1000 tokens) to prevent rate limits
        const fullTranscript = session.transcript || "";
        const transcriptHistory = fullTranscript.length > 4000 ?
            "...(older history truncated)...\n" + fullTranscript.slice(-4000) :
            fullTranscript;

        const systemPrompt = `
You are AI-Recruiter for RootedAI. Interview candidate for: ${jobTitle}.
Context:
- Role: ${jobDescription}
- Skills: ${jobRequirements}
- Type: ${experienceLevel}
- Resume: ${extendedContext}
- Visual: ${visionContext}

Rules:
- One question at a time.
- Tailor to role.
- Be professional & friendly.
- Output JSON ONLY.

Stages (A-H):
A. Intro: Welcome, warm-up.
B. Projects: Ask about relevant project (Objective, Contribution, Outcome).
C. Technical: 3 Qs (Beginner->Advanced) from Skills.
D. Behavioral: STAR (Conflict/Teamwork).
E. Scenario: Hypothetical role challenge.
F. Culture: Why RootedAI?
G. Closing: Ask for questions, say Goodbye.
H. EVALUATION (Only when done): Output detailed scores.

OUTPUT FORMAT (JSON):
Standard: {"reply": "...", "confidence_score": 0.5, "is_interview_complete": false}
Final (Stage H - Evaluation):
{"reply": "Goodbye!", "confidence_score": 0.5, "is_interview_complete": true, "evaluation": {"technical_score": 0-10, "communication_score": 0-10, "behaviour_score": 0-10, "culture_fit_score": 0-10, "recommendation": "Strong Hire / Hire / No Hire", "reasoning_summary": "bullets"}}

History:
${transcriptHistory}

Candidate Input: "${userText}"
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
                    { role: "user", content: `(Candidate just said): "${userText || "..."}" \n(Vision analysis): ${visionContext}` }
                ],
                response_format: { type: "json_object" }
            })
        });

        const chatJson = await chatResp.json();

        if (chatJson.error) {
            console.error("Chat API Error:", chatJson.error);
            throw new Error(`AI Chat Generation Failed: ${chatJson.error.message}`);
        }

        if (!chatJson.choices || chatJson.choices.length === 0) {
            console.error("Chat API Unexpected Response:", JSON.stringify(chatJson));
            throw new Error("AI Chat Generation returned no content.");
        }

        const aiResponse = JSON.parse(chatJson.choices[0].message.content);

        // Face Detection Logic (Improved Heuristic)
        // We assume valid detection unless explicit failure or "cannot see"
        // Also check if Llama 4 Scout error message is present
        const lowerContext = visionContext.toLowerCase();
        let isFaceDetected = true;

        if (
            lowerContext.includes("no video frame") ||
            (lowerContext.includes("error") && lowerContext.length > 20) || // Only legitimate errors
            lowerContext.includes("cannot see") ||
            lowerContext.includes("unable to") ||
            lowerContext.length < 5
        ) {
            isFaceDetected = false;
        }

        // 5. Append to Transcript Log (Database)
        const violationText = (tabViolations && parseInt(tabViolations.toString()) > 0) ? `\n[⚠️ TAB VIOLATIONS: ${tabViolations}]` : "";
        const newEntry = `\nCandidate: ${userText}\n[Vision: ${visionContext}]${violationText}\nAI: ${aiResponse.reply}`;

        const updatePayload: any = {
            transcript: (session.transcript || "") + newEntry,
            ai_confidence_score: aiResponse.confidence_score,
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
            updatePayload.ai_recommendation = aiResponse.evaluation.recommendation; // "Strong Hire", etc.
            updatePayload.status = 'Analyzed';
        }

        await supabase
            .from('final_interviews')
            .update(updatePayload)
            .eq('id', session.id);

        return new Response(JSON.stringify({
            ...aiResponse,
            is_face_detected: isFaceDetected,
            vision_analysis: visionContext // Return for debugging
        }), {
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
