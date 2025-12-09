import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import * as pdfjsLib from 'npm:pdfjs-dist@4.0.379';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function extractTextFromPdf(data: Uint8Array): Promise<string> {
    try {
        const loadingTask = pdfjsLib.getDocument({
            data: data,
            useSystemFonts: true,
        });
        const pdfDocument = await loadingTask.promise;
        let fullText = "";

        for (let i = 1; i <= pdfDocument.numPages; i++) {
            const page = await pdfDocument.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map((item: any) => item.str).join(" ");
            fullText += pageText + "\n";
        }
        return fullText;
    } catch (error) {
        console.error("Error extracting text from PDF:", error);
        throw new Error("Failed to extract text from PDF");
    }
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { applicationId } = await req.json()
        console.log(`Analyzing application: ${applicationId}`);

        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        // 1. Fetch Application Data
        const { data: app, error: appError } = await supabaseAdmin
            .from('applications')
            .select('*, jobs(*)')
            .eq('id', applicationId)
            .single()

        if (appError || !app) {
            console.error("Fetch App Error:", appError);
            throw new Error("Application not found");
        }
        console.log("App Found:", app.id);

        // 2. Fetch Resume URL
        const resumePath = app.resume_url;
        if (!resumePath) throw new Error("No resume uploaded");

        console.log("Downloading Resume:", resumePath);

        // Handle signed url if needed
        let downloadPath = resumePath;
        if (resumePath.startsWith('http')) {
            // If full URL, we might need to fetch it differently or extract path
            // For now assume path or handle download
            console.log("Resume is full URL, trying fetch...");
            const resp = await fetch(resumePath);
            if (!resp.ok) throw new Error("Failed to fetch resume URL");
            var arrayBuffer = await resp.arrayBuffer();
        } else {
            // Storage download
            const { data: resumeData, error: resumeError } = await supabaseAdmin
                .storage
                .from('resumes')
                .download(resumePath);

            if (resumeError || !resumeData) {
                console.error("Resume Download Error:", resumeError);
                throw new Error("Failed to download resume");
            }
            var arrayBuffer = await resumeData.arrayBuffer();
        }

        // 3. Extract Text (PDF)
        console.log("Extracting Text...");
        const resumeText = await extractTextFromPdf(new Uint8Array(arrayBuffer));
        console.log("Resume Text Extracted, Length:", resumeText.length);

        // 4. Update Resume Text in DB
        await supabaseAdmin
            .from('applications')
            .update({ resume_text: resumeText })
            .eq('id', applicationId);

        // 5. AI Analysis
        console.log("Sending to AI...");
        const geminiKey = Deno.env.get('GEMINI_API_KEY');
        if (!geminiKey) {
            console.error("GEMINI_API_KEY missing");
            throw new Error("GEMINI_API_KEY is not set");
        }
        const job = app.jobs;

        const jobTitle = job.title;
        const jobDescription = job.description;
        const text = resumeText.substring(0, 15000); // Limit resume text length

        // --- 5. AI Analysis with Groq (Llama 3.3) ---
        console.log("Analyzing with Groq (Llama 3.3)...");

        const chatResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${Deno.env.get("GROQ_API_KEY")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "qwen/qwen3-32b",
                messages: [
                    {
                        role: "system",
                        content: "You are an expert HR AI assistant. Analyze the candidate's application against the job description. Provide a JSON response with: 'match_score' (0-100), 'key_strengths' (array of strings), 'weaknesses' (array of strings), 'culture_fit_score' (0-100), and 'summary'. Output ONLY valid JSON."
                    },
                    {
                        role: "user",
                        content: `Job Title: ${jobTitle}\n\nJob Description: ${jobDescription}\n\nCandidate Resume: ${text}`
                    }
                ],
                temperature: 0.3,
                max_completion_tokens: 2000,
                response_format: { type: "json_object" }
            })
        });

        const chatJson = await chatResponse.json();

        if (chatJson.error) {
            console.error("Groq API Error:", chatJson.error);
            throw new Error(`Groq API Error: ${chatJson.error.message}`);
        }

        const aiContent = chatJson.choices[0].message.content;
        let analysisData;
        try {
            analysisData = JSON.parse(aiContent);
        } catch (e) {
            console.error("JSON Parse Error:", aiContent);
            throw new Error("Failed to parse AI response as JSON");
        }
        console.log("AI Success, Match Score:", analysisData.match_score);

        // Extract usage metadata from Groq API response
        if (chatJson.usage) {
            await supabaseAdmin.from('ai_usage_logs').insert({
                provider: 'groq',
                model: 'qwen-2.5-32b',
                input_tokens: chatJson.usage.prompt_tokens,
                output_tokens: chatJson.usage.completion_tokens,
                total_tokens: chatJson.usage.total_tokens,
                function_name: 'analyze-application',
                status: 'success'
            });
        }

        // 6. Save Results
        await supabaseAdmin
            .from('applications')
            .update({
                ai_score: analysisData.match_score,
                ai_feedback: analysisData.summary, // Using summary as feedback
                status: analysisData.match_score > 70 ? 'Screening' : 'Rejected'
            })
            .eq('id', applicationId);

        return new Response(JSON.stringify(analysisData), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

    } catch (error: any) {
        console.error("Function Handler Error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400
        });
    }
});
