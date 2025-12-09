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

        if (!interviewToken) throw new Error("Missing interview token");

        // Init Supabase
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
        const supabase = createClient(supabaseUrl, supabaseKey);
        const groqKey = Deno.env.get('GROQ_API_KEY')!;

        // 1. Verify Session & Get Context
        const { data: session, error: sessionError } = await supabase
            .from('final_interviews')
            .select('*, applications(resume_text, jobs(title))')
            .eq('interview_token', interviewToken)
            .single();

        if (sessionError || !session) throw new Error("Invalid Session");

        const application = session.applications;
        const jobTitle = application?.jobs?.title || "Junior AI Engineer";
        const resumeText = application?.resume_text || "No resume context available.";
        // Fallback or use project context if resume is short/missing
        const extendedContext = (resumeText.length > 50) ? resumeText.substring(0, 3000) : (session.project_questions?.context || "");

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

        // 3. Analyze Video Frame (Llama Vision) - Confidence Check
        let visionContext = "No video frame provided.";
        if (videoFrame) {
            const visionResp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${groqKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'llama-3.2-90b-vision-preview',
                    messages: [{
                        role: "user",
                        content: [
                            { type: "text", text: "Analyze this image of a candidate during an interview. Describe their body language, eye contact, and estimated confidence level (High/Medium/Low). Be brief." },
                            { type: "image_url", image_url: { url: videoFrame } }
                        ]
                    }]
                })
            });
            const visionJson = await visionResp.json();
            console.log("Vision API Response:", JSON.stringify(visionJson)); // DEBUG LOG

            if (visionJson.error) {
                console.error("Vision API Error:", visionJson.error);
                visionContext = `Vision analysis failed: ${visionJson.error.message}`;
            } else {
                visionContext = visionJson.choices?.[0]?.message?.content || "Vision analysis failed (No content)";
            }
        }

        // 4. Generate AI Response (Behavioral + Project Context)
        const projectContext = session.project_questions?.context || "";
        const transcriptHistory = session.transcript || "";

        const systemPrompt = `
        You are the "AI Founder" of RootedAI. You are conducting a structured video interview with a candidate for the role of **${jobTitle}**.
        
        **Your Goal**: Conduct a professional, engaging interview following these 7 Stages. DO NOT skip stages.
        **Current Context**:
        - Role: ${jobTitle}
        - Resume/Project Context: ${extendedContext}
        - Current Visual Behavior: ${visionContext}
        
        **Interview Stages (Strictly Follow One by One)**:
        1. **Introduction & Rapport** (1 Question): Welcome them to the **${jobTitle}** interview. Ask a light warm-up like "How was your day?".
        2. **Experience Check** (1-2 Questions): Ask about their recent project or role. Verify their resume details.
        3. **Technical Deep Dive** (2 Questions): Ask 2 distinct technical questions relevant to **${jobTitle}** and their projects (e.g., specific choices, challenges, complex decisions).
        4. **Behavioral** (1 Question): Use STAR method. Ask about a conflict, a mistake, or a difficult decision.
        5. **Culture Fit** (1 Question): Ask about their work style, motivation, or why RootedAI.
        6. **Closing** (1 Question): Ask if they have questions, then Thank them and say "Goodbye".
        
        **Rules**:
        - **MEMORY**: Read the "Conversation History" below. DO NOT ask questions that have already been asked.
        - **ONE QUESTION AT A TIME**: Never ask multiple questions in one turn.
        - **SHORT & CONCISE**: Keep your responses under 2-3 sentences.
        - **STAY ON TRACK**: If the candidate goes off-topic, politely bring them back to the current stage.
        - **ENGLISH ONLY**: Speak only in English.
        - **TOTAL LIMIT**: Aim to complete the interview in about 7-8 turns total.
        
        **Conversation History**:
        ${transcriptHistory}
        
        **Candidate's Latest Audio**: "${userText}"
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
        const aiResponse = JSON.parse(chatJson.choices[0].message.content);

        // 5. Append to Transcript Log (Database)
        const newEntry = `\nCandidate: ${userText}\n[Vision: ${visionContext}]\nAI: ${aiResponse.reply}`;
        await supabase
            .from('final_interviews')
            .update({
                transcript: (session.transcript || "") + newEntry,
                ai_confidence_score: aiResponse.confidence_score // Update running score (simplification)
            })
            .eq('id', session.id);

        return new Response(JSON.stringify(aiResponse), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400
        });
    }
})
