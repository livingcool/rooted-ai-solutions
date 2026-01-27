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

        // 2. Fetch Resume
        const resumePath = app.resume_url;
        if (!resumePath) throw new Error("No resume uploaded");

        console.log("Downloading Resume:", resumePath);

        let arrayBuffer: ArrayBuffer;
        if (resumePath.startsWith('http')) {
            // If full URL, fetch directly
            console.log("Resume is full URL, trying fetch...");
            const resp = await fetch(resumePath);
            if (!resp.ok) throw new Error("Failed to fetch resume URL");
            arrayBuffer = await resp.arrayBuffer();
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
            arrayBuffer = await resumeData.arrayBuffer();
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

        // 5. AI Analysis with Groq (Llama 3.3)
        console.log("Analyzing with Groq (Llama 3.3 70B)...");

        const groqKey = Deno.env.get('GROQ_API_KEY');
        if (!groqKey) {
            console.error("GROQ_API_KEY missing");
            throw new Error("GROQ_API_KEY is not set");
        }

        const job = app.jobs;
        const jobTitle = job.title;
        const jobDescription = job.description;
        const jobRequirements = job.requirements?.join(', ') || '';
        const text = resumeText.substring(0, 15000); // Limit resume text length

        const systemPrompt = `You are an expert HR AI Recruiter. Analyze the candidate's resume against the job description and provide a comprehensive assessment.

NERD SCORING SYSTEM:
{
  "nerd_signals": {
    "positive": {
      "self_initiated_projects": "+20",
      "obsessive_learning_behaviors": "+15",
      "experiments_outside_curriculum": "+15",
      "active_github_or_open_source": "+10",
      "technical_hobbies": "+10",
      "problem_solving_for_fun": "+10",
      "deep_focus_on_single_topic": "+10"
    },
    "negative": {
      "no_self_projects": "-15",
      "only_college_work": "-10",
      "no_curiosity_indicators": "-10",
      "generic_statements": "-5"
    }
  }
}
Provide your analysis in JSON format with these fields:
- match_score: number (0-100) - Overall match between resume and job requirements
- nerd_score: number (0-100) - Curiosity and self-driven learning indicator
- summary: string - Brief 2-3 sentence summary of strengths and gaps
- key_strengths: array of strings - Top 3-5 strengths
- missing_skills: array of strings - Top 3-5 missing or weak areas
- recommendation: string - "Strong Hire", "Maybe", or "Pass"`;

        const chatResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${groqKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "system",
                        content: systemPrompt
                    },
                    {
                        role: "user",
                        content: `Job Title: ${jobTitle}\n\nJob Description: ${jobDescription}\n\nRequirements: ${jobRequirements}\n\nCandidate Resume:\n${text}`
                    }
                ],
                temperature: 0.2,
                max_completion_tokens: 1800,
                response_format: { type: "json_object" }
            })
        });

        if (!chatResponse.ok) {
            const errorText = await chatResponse.text();
            console.error("Groq API Error:", errorText);
            throw new Error(`Groq API Error: ${chatResponse.status} - ${errorText}`);
        }

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

        // Log token usage
        if (chatJson.usage) {
            await supabaseAdmin.from('ai_usage_logs').insert({
                provider: 'groq',
                model: 'llama-3.3-70b-versatile',
                input_tokens: chatJson.usage.prompt_tokens,
                output_tokens: chatJson.usage.completion_tokens,
                total_tokens: chatJson.usage.total_tokens,
                function_name: 'analyze-application',
                status: 'success'
            });
        }

        // 6. Save Results
        const status = analysisData.match_score >= 70 ? 'AI Assessed' : 'Rejected';

        await supabaseAdmin
            .from('applications')
            .update({
                ai_score: analysisData.match_score,
                ai_feedback: analysisData.summary,
                nerd_score: analysisData.nerd_score || null,
                status: status
            })
            .eq('id', applicationId);

        console.log(`Application ${applicationId} updated with status: ${status}`);

        return new Response(
            JSON.stringify({
                success: true,
                ...analysisData
            }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200
            }
        );

    } catch (error: any) {
        console.error("Function Handler Error:", error);

        // Log failed attempt
        try {
            const supabaseAdmin = createClient(
                Deno.env.get('SUPABASE_URL') ?? '',
                Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
            );

            await supabaseAdmin.from('ai_usage_logs').insert({
                provider: 'groq',
                model: 'llama-3.3-70b-versatile',
                input_tokens: 0,
                output_tokens: 0,
                total_tokens: 0,
                function_name: 'analyze-application',
                status: 'error'
            });
        } catch (logError) {
            console.error("Failed to log error:", logError);
        }

        return new Response(
            JSON.stringify({
                error: error.message,
                details: error.toString()
            }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400
            }
        );
    }
});