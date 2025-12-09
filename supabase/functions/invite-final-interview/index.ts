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
        const { applicationId, scheduledAt } = await req.json()
        if (!applicationId) throw new Error("Missing applicationId")
        if (!scheduledAt) throw new Error("Missing scheduledAt time")

        const supabaseUrl = Deno.env.get('SUPABASE_URL')!
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
        const supabaseAdmin = createClient(supabaseUrl, supabaseKey)

        // Generate Secure Access Code (8 chars alphanumeric)
        const accessPasscode = Math.random().toString(36).slice(2, 10).toUpperCase();

        // 1. Conflict Check (One Person Per Slot)
        const requestedTime = new Date(scheduledAt);
        const bufferTimeStart = new Date(requestedTime.getTime() - 45 * 60000).toISOString();
        const bufferTimeEnd = new Date(requestedTime.getTime() + 45 * 60000).toISOString();

        const { data: conflicts, error: conflictError } = await supabaseAdmin
            .from('final_interviews')
            .select('id, scheduled_at')
            .gte('scheduled_at', bufferTimeStart)
            .lte('scheduled_at', bufferTimeEnd)
            .neq('application_id', applicationId);

        if (conflictError) throw conflictError;
        if (conflicts && conflicts.length > 0) {
            throw new Error(`Slot Conflict: Another interview is already scheduled near ${scheduledAt}. Please choose a different time.`);
        }

        // 2. Fetch Application
        const { data: app, error: appError } = await supabaseAdmin
            .from('applications')
            .select('*, jobs(title)')
            .eq('id', applicationId)
            .single()

        if (appError || !app) throw new Error("Application not found")

        // 3. Create Interview Record with Credentials
        const expiresAt = new Date(requestedTime.getTime() + 90 * 60000).toISOString();

        const { data: existingInterview } = await supabaseAdmin
            .from('final_interviews')
            .select('id, interview_token')
            .eq('application_id', applicationId)
            .maybeSingle();

        let token;
        if (existingInterview) {
            const { data: updated, error: updateError } = await supabaseAdmin
                .from('final_interviews')
                .update({
                    scheduled_at: scheduledAt,
                    expires_at: expiresAt,
                    access_passcode: accessPasscode, // Update passcode
                    status: 'Scheduled'
                })
                .eq('id', existingInterview.id)
                .select('interview_token')
                .single();

            if (updateError) throw updateError;
            token = updated.interview_token;
        } else {
            const { data: newInterview, error: createError } = await supabaseAdmin
                .from('final_interviews')
                .insert({
                    application_id: applicationId,
                    status: 'Scheduled',
                    scheduled_at: scheduledAt,
                    expires_at: expiresAt,
                    access_passcode: accessPasscode,
                    project_questions: {
                        context: `Scheduled invite for ${app.jobs?.title}.`,
                        ai_notes: "Automated Setup with Credentials."
                    }
                })
                .select('interview_token')
                .single()

            if (createError) throw createError;
            token = newInterview.interview_token;
        }

        // 4. Update App Status
        await supabaseAdmin
            .from('applications')
            .update({ status: 'Final Interview' })
            .eq('id', applicationId)

        // 5. Send Invite Email with Credentials
        const frontendUrl = Deno.env.get('FRONTEND_URL') || 'https://rooted-ai-solutions.vercel.app';
        const loginLink = `${frontendUrl}/final-login`; // Changed to Login Page

        const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' };
        const formattedDate = new Date(scheduledAt).toLocaleString('en-US', dateOptions);

        const emailSubject = `Final Interview Credentials: ${formattedDate}`
        const emailBody = `
Dear ${app.full_name},

You have been selected for the Final Interview for the **${app.jobs?.title}** position.

**Interview Details**
📅 **Date/Time:** ${formattedDate}
⏳ **Duration:** Approx. 30 Minutes

**Login Credentials**
To access the secure interview room, use the following credentials:
--------------------------------------------------
🔗 **Login Page:** ${loginLink}
📧 **Login ID:** ${app.email}
🔑 **Passcode:** ${accessPasscode}
--------------------------------------------------

**Important:**
- This passcode is unique to you.
- The system will only allow access during your scheduled slot (within 90 minutes).

Please check your camera and microphone beforehand.

Best regards,
RootedAI Recruiting Team
`

        if (app.email) {
            await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-rejection-email`, {
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
            JSON.stringify({ success: true, message: "Invitation sent with credentials." }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

    } catch (error: any) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        )
    }
})
