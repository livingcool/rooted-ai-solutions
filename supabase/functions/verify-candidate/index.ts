import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
};

interface VerifyRequest {
    email: string;
    accessCode: string;
}

const handler = async (req: Request): Promise<Response> => {
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const { email, accessCode }: VerifyRequest = await req.json();

        // Init Supabase Admin
        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        );

        // Verify Credentials
        const { data: app, error } = await supabaseAdmin
            .from('applications')
            .select('id, full_name, status, communication_deadline')
            .eq('email', email)
            .eq('access_code', accessCode)
            .single();

        if (error || !app) {
            return new Response(JSON.stringify({ error: 'Invalid email or access code' }), {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 401,
            });
        }

        // Check if deadline passed
        if (app.communication_deadline && new Date(app.communication_deadline) < new Date()) {
            return new Response(JSON.stringify({ error: 'Assessment deadline has passed' }), {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 403,
            });
        }

        return new Response(JSON.stringify({
            success: true,
            applicationId: app.id,
            candidateName: app.full_name
        }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        });

    } catch (error: any) {
        console.error("Error verifying candidate:", error);
        return new Response(JSON.stringify({ error: error.message || "Internal server error" }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 500,
        });
    }
};

serve(handler);
