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
        const { email, passcode } = await req.json()

        if (!email || !passcode) {
            throw new Error("Missing email or passcode");
        }

        const supabaseUrl = Deno.env.get('SUPABASE_URL')!
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
        const supabaseAdmin = createClient(supabaseUrl, supabaseKey)

        // Find Application by Email
        const { data: apps, error: appError } = await supabaseAdmin
            .from('applications')
            .select('id, full_name')
            .eq('email', email)
            .limit(1);

        if (appError) throw appError;
        if (!apps || apps.length === 0) {
            throw new Error("Invalid Login ID or Passcode.");
        }

        const appId = apps[0].id;

        // Verify Final Interview Record
        const { data: interview, error: interviewError } = await supabaseAdmin
            .from('final_interviews')
            .select('*')
            .eq('application_id', appId)
            .single();

        if (interviewError || !interview) {
            throw new Error("No scheduled interview found for this candidate.");
        }

        // Check Passcode
        // Note: In production, should compare hashes. Here simple string comparison.
        if (interview.access_passcode !== passcode) {
            throw new Error("Invalid Passcode.");
        }

        // Check Expiry
        if (interview.expires_at && new Date() > new Date(interview.expires_at)) {
            throw new Error("Interview slot has expired. Please contact recruiting.");
        }

        // Success - Return Token
        return new Response(
            JSON.stringify({
                success: true,
                token: interview.interview_token,
                candidateName: apps[0].full_name
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

    } catch (error: any) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
        )
    }
})
