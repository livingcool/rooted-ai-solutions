import { createClient } from "@supabase/supabase-js";
import pdf from "pdf-parse";

// Using Node.js runtime for PDF parsing support
export const config = {
    maxDuration: 60,
};

export default async function handler(req: any, res: any) {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'authorization, x-client-info, apikey, content-type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const { applicationId } = req.body;
        console.log(`Analyzing application: ${applicationId}`);

        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        const groqApiKey = process.env.GROQ_API_KEY;

        if (!supabaseUrl || !supabaseKey || !groqApiKey) {
            throw new Error("Missing environment variables.");
        }

        const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

        // 1. Get Application & Job Details
        const { data: app, error: appError } = await supabaseAdmin
            .from('applications')
            .select('*, jobs(*)')
            .eq('id', applicationId)
            .single();

        if (appError || !app) {
            console.error("Error fetching application:", appError);
            throw new Error('Application not found');
        }

        // 2. Download Resume
        console.log(`Downloading resume from: ${app.resume_url}`);
        const { data: fileData, error: fileError } = await supabaseAdmin
            .storage
            .from('resumes')
            .download(app.resume_url);

        if (fileError) {
            console.error("Error downloading resume:", fileError);
            throw new Error('Failed to download resume');
        }

        // 3. Extract Text from Resume
        let resumeText = "";
        const fileExt = app.resume_url.split('.').pop()?.toLowerCase();

        if (fileExt === 'pdf') {
            try {
                const arrayBuffer = await fileData.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                const data = await pdf(buffer);
                resumeText = data.text;
            } catch (e) {
                console.error("PDF Parse Error:", e);
                resumeText = "Could not extract text from PDF.";
            }
        } else {
            resumeText = "Resume content extraction pending for non-PDF formats.";
        }

        // Truncate if too long
        resumeText = resumeText.substring(0, 6000);

        // 4. Analyze with Groq
        console.log("Analyzing with Groq...");
        const prompt = `
        You are an expert HR AI Recruiter for "RootedAI". Analyze this resume for the role of "${app.jobs.title}" at RootedAI.
        
        Job Description: ${app.jobs.description}
        Requirements: ${app.jobs.requirements?.join(', ')}
        
        Resume Text:
        ${resumeText}
        
        Provide a JSON output with:
        - score: number (0-100) indicating suitability based on skills and experience match.
        - feedback: string (max 50 words) summarizing key strengths and missing skills.
        `;

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${groqApiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
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
            .eq('id', applicationId);

        if (updateError) throw updateError;

        return res.status(200).json({ success: true, data: aiResult });

    } catch (error: any) {
        console.error("Error in analyze-application:", error);
        console.error("Request body:", req.body);
        return res.status(400).json({ error: error.message, stack: error.stack });
    }
}