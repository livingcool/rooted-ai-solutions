import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { GoogleGenerativeAI } from "npm:@google/generative-ai"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { applicationId } = await req.json()
        console.log(`Analyzing application: ${applicationId}`);

        // Init Supabase Admin
        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        // 1. Get Application & Job Details
        const { data: app, error: appError } = await supabaseAdmin
            .from('applications')
            .select('*, jobs(*)')
            .eq('id', applicationId)
            .single()

        if (appError || !app) {
            console.error("Error fetching application:", appError);
            throw new Error('Application not found')
        }
        console.log(`Found application for job: ${app.jobs.title}`);

        // 2. Download Resume
        console.log(`Downloading resume from: ${app.resume_url}`);
        const { data: fileData, error: fileError } = await supabaseAdmin
            .storage
            .from('resumes')
            .download(app.resume_url)

        if (fileError) {
            console.error("Error downloading resume:", fileError);
            throw new Error('Failed to download resume')
        }
        console.log("Resume downloaded successfully");

        // Determine Mime Type
        const fileExt = app.resume_url.split('.').pop()?.toLowerCase();
        let mimeType = "application/pdf";
        if (fileExt === 'docx') mimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        if (fileExt === 'doc') mimeType = "application/msword";

        // 3. Analyze with Gemini
        console.log("Initializing Gemini AI...");
        const apiKey = Deno.env.get('GEMINI_API_KEY');
        if (!apiKey) {
            throw new Error("GEMINI_API_KEY is not set in environment variables.");
        }
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

        const arrayBuffer = await fileData.arrayBuffer()
        const base64Data = btoa(
            new Uint8Array(arrayBuffer)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );

        console.log(`MimeType: ${mimeType}`);

        const prompt = `
      You are an expert HR AI Recruiter for "RootedAI". Analyze this resume for the role of "${app.jobs.title}" at RootedAI.
      
      Job Description: ${app.jobs.description}
      Requirements: ${app.jobs.requirements?.join(', ')}
      
      Provide a JSON output with:
      - score: number (0-100) indicating suitability based on skills and experience match.
      - feedback: string (max 50 words) summarizing key strengths and missing skills.
    `

        console.log("Generating content with Gemini...");
        const result = await model.generateContent({
            contents: [
                {
                    role: 'user',
                    parts: [
                        { text: prompt },
                        {
                            inlineData: {
                                data: base64Data,
                                mimeType: mimeType,
                            },
                        }
                    ]
                }
            ],
            safetySettings: [
                {
                    category: 'HARM_CATEGORY_HARASSMENT',
                    threshold: 'BLOCK_NONE',
                },
                {
                    category: 'HARM_CATEGORY_HATE_SPEECH',
                    threshold: 'BLOCK_NONE',
                },
                {
                    category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                    threshold: 'BLOCK_NONE',
                },
                {
                    category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                    threshold: 'BLOCK_NONE',
                },
            ],
        })

        const responseText = result.response.text()
        console.log("Gemini Response:", responseText);

        const jsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim()
        let aiResult;
        try {
            aiResult = JSON.parse(jsonStr);
        } catch (e) {
            console.error("JSON Parse Error:", e);
            // Fallback if JSON parsing fails
            aiResult = { score: 0, feedback: "AI Analysis failed to parse response." };
        }

        // 4. Update Application
        console.log("Updating application with score:", aiResult.score);
        const { error: updateError } = await supabaseAdmin
            .from('applications')
            .update({
                ai_score: aiResult.score,
                ai_feedback: aiResult.feedback,
                status: 'AI Assessed'
            })
            .eq('id', applicationId)

        if (updateError) {
            console.error("Error updating application:", updateError);
            throw updateError;
        }

        return new Response(
            JSON.stringify({ success: true, data: aiResult }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

    } catch (error: any) {
        console.error("Error in analyze-application:", error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
    }
})
