import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import * as pdfjsLib from 'npm:pdfjs-dist@4.0.379';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function extractTextFromPdf(data: Uint8Array): Promise<string> {
    try {
        // Load the PDF document
        const loadingTask = pdfjsLib.getDocument({
            data: data,
            useSystemFonts: true, // Avoid font loading issues
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
            throw new Error(`Application not found: ${appError?.message}`)
        }

        if (!app.resume_url) {
            throw new Error('No resume URL found')
        }

        // 2. Download Resume using Signed URL workaround
        console.log(`Downloading resume from: ${app.resume_url}`);

        // Remove bucket name from path if it's included
        let resumePath = app.resume_url.startsWith('resumes/')
            ? app.resume_url.substring('resumes/'.length)
            : app.resume_url;

        if (resumePath.startsWith('/')) resumePath = resumePath.substring(1);

        console.log(`Using path for signed URL: '${resumePath}'`);

        const { data: signedUrlData, error: signedUrlError } = await supabaseAdmin
            .storage
            .from('resumes')
            .createSignedUrl(resumePath, 60);

        if (signedUrlError || !signedUrlData) {
            console.error("Error creating signed URL:", signedUrlError);
            throw new Error('Failed to create signed URL for resume');
        }

        const resumeResponse = await fetch(signedUrlData.signedUrl);
        if (!resumeResponse.ok) {
            throw new Error(`Failed to fetch resume from signed URL: ${resumeResponse.status} ${resumeResponse.statusText}`);
        }

        const arrayBuffer = await resumeResponse.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);

        // 3. Extract Text from Resume
        let resumeText = "";
        const fileExt = app.resume_url.split('.').pop()?.toLowerCase();

        if (fileExt === 'pdf') {
            try {
                resumeText = await extractTextFromPdf(buffer);
                console.log(`Extracted ${resumeText.length} characters from PDF`);
            } catch (e) {
                console.error("PDF Parse Error:", e);
                throw new Error("Failed to parse PDF content");
            }
        } else {
            resumeText = new TextDecoder().decode(buffer);
        }

        // 4. Analyze with Groq
        const apiKey = Deno.env.get('GROQ_API_KEY');
        if (!apiKey) {
            throw new Error("GROQ_API_KEY is not set");
        }

        const prompt = `
        You are an expert HR recruiter. Analyze this job application for the role of "${app.jobs?.title || 'Candidate'}".
        
        Candidate Name: ${app.full_name}
        Cover Letter: ${app.cover_letter || "N/A"}
        Resume Content:
        ${resumeText.substring(0, 15000)}
        
        Provide a JSON output with:
        - score: number (0-100) based on skills and experience match.
        - feedback: string (max 100 words) detailed summary of strengths, weaknesses, and key qualifications. Be specific about what matches the role and what is missing.
        `;

        const aiResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
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

        if (!aiResponse.ok) {
            const errText = await aiResponse.text();
            throw new Error(`Groq API Error: ${aiResponse.status} - ${errText}`);
        }

        const aiData = await aiResponse.json();
        const content = aiData.choices[0].message.content;

        let analysis;
        try {
            analysis = JSON.parse(content);
        } catch (e) {
            console.error("JSON Parse Error:", e);
            analysis = { score: 0, feedback: "Failed to parse AI response." };
        }

        // --- AUTOMATION LOGIC ---
        // Threshold: 75/100
        const MIN_SCORE_RESUME = 75;
        let newStatus = 'AI Assessed'; // Default fallback
        let emailSubject = "";
        let emailBody = "";
        let shouldSendEmail = false;

        if (analysis.score >= MIN_SCORE_RESUME) {
            newStatus = 'Communication Round';
            emailSubject = `Update on your application for ${app.jobs?.title || 'Open Position'}`;
            emailBody = `
Dear ${app.full_name},

Thank you for your patience. After reviewing your resume, we are impressed with your profile and score of ${analysis.score}/100.

We would like to invite you to the **Communication Assessment** round. 
Please log in to your candidate portal to complete this step.

Best regards,
RootedAI Recruiting Team
            `;
            shouldSendEmail = true;
        } else {
            newStatus = 'Rejected';
            emailSubject = `Application Status: ${app.jobs?.title || 'Open Position'}`;
            emailBody = `
Dear ${app.full_name},

Thank you for your interest in RootedAI. After careful review, we have decided not to proceed with your application at this time (Score: ${analysis.score}/100).

We appreciate your effort and wish you the best in your job search.

Best regards,
RootedAI Recruiting Team
            `;
            shouldSendEmail = true;
        }

        console.log(`Automation Decision: Score=${analysis.score}, NewStatus=${newStatus}`);

        // 5. Update Application Status & AI Data
        const { error: updateError } = await supabaseAdmin
            .from('applications')
            .update({
                ai_score: analysis.score,
                ai_feedback: analysis.feedback,
                resume_text: resumeText, // Save Extracted Text
                status: newStatus
            })
            .eq('id', applicationId);

        if (updateError) throw updateError;

        // 6. Send Email Notification
        if (shouldSendEmail && app.email) {
            console.log(`Sending email to ${app.email}...`);
            await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-rejection-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${supabaseKey}` // Use same key for internal call
                },
                body: JSON.stringify({
                    email: app.email,
                    subject: emailSubject,
                    body: emailBody
                })
            });
        }

        if (updateError) throw updateError;

        return new Response(
            JSON.stringify({ success: true }),
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
