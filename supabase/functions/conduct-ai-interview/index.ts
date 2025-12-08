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
            .select('*')
            .eq('interview_token', interviewToken)
            .single();

        if (sessionError || !session) throw new Error("Invalid Session");

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
                    model: 'llama-3.2-11b-vision-preview',
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
            visionContext = visionJson.choices?.[0]?.message?.content || "Vision analysis failed";
        }

        // 4. Generate AI Response (Behavioral + Project Context)
        const projectContext = session.project_questions?.context || "";
        const systemPrompt = `
        You are the "AI Founder" of RootedAI. You are interviewing a candidate.
        
        Context: ${projectContext}
        Current Vision Analysis of Candidate: ${visionContext}
        
        Your Goal:
        1. Respond to what the candidate just said ("${userText}").
        2. Ask a follow-up question digging into their project choices or culture fit.
        3. Rate their confidence based on the Vision Analysis key terms (maintained eye contact vs looking away).
        
        Return JSON:
        {
            "reply": "Text response to speak back",
            "confidence_score": 0-100,
            "is_interview_complete": boolean
        }
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
                    { role: "user", content: userText || "(Silence)" }
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
