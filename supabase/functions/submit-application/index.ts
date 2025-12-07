import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
};

interface ApplicationRequest {
    job_id: string;
    full_name: string;
    email: string;
    phone: string;
    resume_url: string;
    cover_letter: string;
    portfolio_url: string;
}

const handler = async (req: Request): Promise<Response> => {
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const {
            job_id,
            full_name,
            email,
            phone,
            resume_url,
            cover_letter,
            portfolio_url
        }: ApplicationRequest = await req.json();

        // Init Supabase Admin
        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        );

        // 1. Check for Duplicate Application
        const { data: existingApps, error: checkError } = await supabaseAdmin
            .from('applications')
            .select('id')
            .eq('email', email)
            .eq('job_id', job_id);

        if (checkError) throw checkError;

        if (existingApps && existingApps.length > 0) {
            return new Response(
                JSON.stringify({ error: "You have already applied for this position." }),
                {
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                    status: 400,
                }
            );
        }

        // 2. Insert New Application
        const applicationId = crypto.randomUUID();

        const { error: insertError } = await supabaseAdmin
            .from('applications')
            .insert({
                id: applicationId,
                job_id,
                full_name,
                email,
                phone,
                resume_url,
                cover_letter,
                portfolio_url,
                status: 'Applied'
            });

        if (insertError) throw insertError;

        // 3. Trigger AI Analysis (Fire and Forget)
        // We call the analyze-application function but don't wait for it to finish
        // to keep the response fast.
        fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/analyze-application`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ applicationId })
        }).catch(err => console.error("Failed to trigger analysis:", err));

        return new Response(
            JSON.stringify({ success: true, applicationId }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200,
            }
        );

    } catch (error: any) {
        console.error("Error submitting application:", error);
        return new Response(JSON.stringify({ error: error.message || "Unknown error occurred" }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 500,
        });
    }
};

serve(handler);
