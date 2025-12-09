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

        const promptText = `
        Role: ${job.title}
        Desc: ${job.description}
        Reqs: ${JSON.stringify(job.requirements)}
        
        Resume Content:
        ${resumeText.substring(0, 15000)}
        
        Analyze match and return JSON.
        Output Format: { "score": 0-100, "feedback": "Detailed feedback string" }
        `;

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`;

        const chatResp = await fetch(geminiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: "You are an expert technical recruiter. " + promptText }]
                }],
                generationConfig: {
                    response_mime_type: "application/json"
                }
            })
        });

        if (!chatResp.ok) {
            const errTxt = await chatResp.text();
            console.error("Gemini API Error:", errTxt);
            throw new Error("AI Service Failed (Gemini): " + errTxt);
        }

        const chatJson = await chatResp.json();
        let content;
        try {
            const rawText = chatJson.candidates[0].content.parts[0].text;
            content = JSON.parse(rawText);
        } catch (e) {
            console.error("JSON Parsing failed for AI response", chatJson);
            throw new Error("Invalid AI Response from Gemini");
        }
        console.log("AI Success, Score:", content.score);

        // --- Log Token Usage ---
        const usage = chatJson.usageMetadata;
        if (usage) {
            await supabaseAdmin.from('ai_usage_logs').insert({
                provider: 'google',
                model: 'gemini-2.5-flash',
                input_tokens: usage.promptTokenCount || 0,
                output_tokens: usage.candidatesTokenCount || 0,
                total_tokens: usage.totalTokenCount || 0,
                function_name: 'analyze-application',
                status: 'success'
            });
        }

        // 6. Save Results
        await supabaseAdmin
            .from('applications')
            .update({
                ai_score: content.score,
                ai_feedback: content.feedback,
                status: content.score > 70 ? 'Screening' : 'Rejected'
            })
            .eq('id', applicationId);

        return new Response(JSON.stringify(content), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

    } catch (error: any) {
        console.error("Function Handler Error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400
        });
    }
});
