import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import pdf from "https://esm.sh/pdf-parse@1.1.1";

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

        // 3. Extract Text from Resume
        let resumeText = "";
        const fileExt = app.resume_url.split('.').pop()?.toLowerCase();

        if (fileExt === 'pdf') {
            try {
                const arrayBuffer = await fileData.arrayBuffer();
                const buffer = new Uint8Array(arrayBuffer);
                const data = await pdf(buffer);
                resumeText = data.text;
            } catch (e) {
                console.error("PDF Parse Error:", e);
                resumeText = "Could not extract text from PDF.";
            }
        } else {
            // Simple text fallback for other formats or if extraction fails
            resumeText = "Resume content extraction pending for non-PDF formats.";
        }

        // Truncate if too long for context window (approx 6000 chars)
        resumeText = resumeText.substring(0, 6000);

        // 4. Analyze with Groq
        console.log("Analyzing with Groq...");
        const apiKey = Deno.env.get('GROQ_API_KEY');
        if (!apiKey) {
            throw new Error("GROQ_API_KEY is not set in environment variables.");
        }

        const prompt = `
        You are an expert HR AI Recruiter for "RootedAI". Analyze this resume for the role of "${app.jobs.title}" at RootedAI.
        
        Job Description: ${app.jobs.description}
        Requirements: ${app.jobs.requirements?.join(', ')}
        
        Resume Text:
        ${resumeText}
        
        Provide a JSON output with:
        - score: number (0-100) indicating suitability based on skills and experience match.
        - feedback: string (max 50 words) summarizing key strengths and missing skills.
        `

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama3-8b-8192',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant that outputs JSON.' },
                    { role: 'user', content: prompt }
                ],
                response_format: { type: 'json_object' }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Groq API Error:", errorText);
            throw new Error(`Groq API Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content;

        let aiResult;
        try {
            aiResult = JSON.parse(content);
        } catch (e) {
            console.error("JSON Parse Error:", e);
            aiResult = { score: 0, feedback: "AI Analysis failed to parse response." };
        }

        // 5. Update Application
        console.log("Updating application with score:", aiResult.score);
        const { error: updateError } = await supabaseAdmin
            .from('applications')
            .update({
                ai_score: aiResult.score,
                ai_feedback: aiResult.feedback,
                status: 'AI Assessed'
            })
            .eq('id', applicationId)

        if (updateError) throw updateError;

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
