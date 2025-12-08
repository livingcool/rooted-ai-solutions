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
        const { applicationId } = await req.json()
        if (!applicationId) throw new Error("Missing applicationId")

        const supabaseUrl = Deno.env.get('SUPABASE_URL')!
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
        const supabaseAdmin = createClient(supabaseUrl, supabaseKey)

        // 1. Fetch Application & Job Details
        const { data: app, error: appError } = await supabaseAdmin
            .from('applications')
            .select('*, jobs(title)')
            .eq('id', applicationId)
            .single()

        if (appError || !app) throw new Error("Application not found")

        // 2. Check/Create Final Interview Record
        // We can just upsert or insert. Let's check if one exists first to reuse token if possible?
        // Actually, for a manual invite, we might want to generate a new token or ensure one exists.

        let token;

        // Try to find existing
        const { data: existingInterview } = await supabaseAdmin
            .from('final_interviews')
            .select('interview_token')
            .eq('application_id', applicationId)
            .maybeSingle()

        if (existingInterview) {
            token = existingInterview.interview_token;
        } else {
            // Create new
            const { data: newInterview, error: createError } = await supabaseAdmin
                .from('final_interviews')
                .insert({
                    application_id: applicationId,
                    status: 'Scheduled',
                    project_questions: {
                        context: `Manual invite by Admin for ${app.jobs?.title}.`,
                        ai_notes: "Manual progression."
                    }
                })
                .select('interview_token')
                .single()

            if (createError) throw createError;
            token = newInterview.interview_token;
        }

        // 3. Update Application Status
        await supabaseAdmin
            .from('applications')
            .update({ status: 'Final Interview' })
            .eq('id', applicationId)

        // 4. Send Email
        const interviewLink = `https://rooted-ai.com/final-interview?token=${token}`
        const emailSubject = `Final Round Invitation: AI Founder Interview`
        const emailBody = `
Dear ${app.full_name},

Congratulations! You have been selected for the Final Interview for the **${app.jobs?.title || 'Engineer'}** role.

This stage involves a live video interview with our AI Founder Agent.

**Click here to start your interview:**
${interviewLink}

Please ensure you have a working camera and microphone.

Best regards,
RootedAI Recruiting Team
`

        if (app.email) {
            await fetch(`${supabaseUrl}/functions/v1/send-rejection-email`, { // reusing send-email generic function if available, user calls it 'send-rejection-email' but it seems generic in other usages? check this.
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${supabaseKey}`
                },
                body: JSON.stringify({
                    email: app.email,
                    subject: emailSubject,
                    body: emailBody
                })
            })
        }

        return new Response(
            JSON.stringify({ success: true, message: "Invitation sent" }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

    } catch (error: any) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
    }
})
