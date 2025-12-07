import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import nodemailer from "npm:nodemailer@6.9.13";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
};

interface InviteRequest {
    applicationId: string;
    deadline: string;
}

const handler = async (req: Request): Promise<Response> => {
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const { applicationId, deadline }: InviteRequest = await req.json();

        // Init Supabase Admin
        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        );

        // 1. Get Application Details
        const { data: app, error: appError } = await supabaseAdmin
            .from('applications')
            .select('*, jobs(title)')
            .eq('id', applicationId)
            .single();

        if (appError || !app) {
            throw new Error('Application not found');
        }

        // 2. Generate Access Code & Update Application
        const accessCode = Math.random().toString(36).slice(-8).toUpperCase();

        const { error: updateError } = await supabaseAdmin
            .from('applications')
            .update({
                status: 'Invited to Interview',
                communication_deadline: deadline,
                access_code: accessCode
            })
            .eq('id', applicationId);

        if (updateError) {
            throw updateError;
        }

        // 3. Send Email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: Deno.env.get("GMAIL_USER") || "rootedaiofficial@gmail.com",
                pass: Deno.env.get("GMAIL_APP_PASSWORD"),
            },
        });

        const loginLink = `${req.headers.get('origin') || 'http://localhost:8080'}/candidate-login`;
        const formattedDeadline = new Date(deadline).toLocaleString();

        const mailOptions = {
            from: `RootedAI Careers <${Deno.env.get("GMAIL_USER") || "rootedaiofficial@gmail.com"}>`,
            to: app.email,
            subject: `Interview Invitation: ${app.jobs.title} at RootedAI`,
            html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Interview Invitation</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #000000; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #000000; color: #ffffff;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table role="presentation" width="100%" style="max-width: 600px; background-color: #0a0a0a; border: 1px solid #333333; border-radius: 0px; overflow: hidden;">
                
                <!-- Header -->
                <tr>
                  <td align="center" style="padding: 40px 0 20px 0; border-bottom: 1px solid #222222;">
                     <a href="https://rooted-ai-solutions.vercel.app/" style="text-decoration: none; font-size: 24px; font-weight: 700; letter-spacing: 2px; color: #ffffff; text-transform: uppercase;">
                       Rooted<span style="color: #666;">AI</span>
                     </a>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px 40px;">
                    <h2 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 700; color: #ffffff;">Hello ${app.full_name},</h2>
                    
                    <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #a0a0a0;">
                      Congratulations! We were impressed by your application for the <strong style="color: #ffffff;">${app.jobs.title}</strong> role and would like to invite you to the next stage: the <strong style="color: #ffffff;">Communication Assessment</strong>.
                    </p>
                    
                    <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #a0a0a0;">
                      This is a voice-based assessment where you will be asked to record your answer to a specific question. It should take less than 5 minutes.
                    </p>
                    
                    <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #a0a0a0;">
                      <strong style="color: #ffffff;">Deadline:</strong> ${formattedDeadline}
                    </p>
                    
                    <div style="background-color: #111111; padding: 20px; border: 1px solid #333333; margin: 30px 0;">
                        <p style="margin: 0 0 10px 0; color: #ffffff; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;"><strong>Your Login Credentials</strong></p>
                        <p style="margin: 5px 0; color: #a0a0a0;">Email: <span style="color: #ffffff;">${app.email}</span></p>
                        <p style="margin: 5px 0; color: #a0a0a0;">Access Code: <strong style="color: #ffffff; font-size: 18px; letter-spacing: 1px;">${accessCode}</strong></p>
                    </div>
                    
                    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
                      <tr>
                        <td align="center">
                          <a href="${loginLink}" style="display: inline-block; padding: 16px 36px; background-color: #ffffff; color: #000000; text-decoration: none; font-weight: 600; font-size: 14px; border-radius: 0px; letter-spacing: 1px; text-transform: uppercase; border: 1px solid #ffffff;">
                            Login to Assessment
                          </a>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="margin: 30px 0 0 0; font-size: 12px; color: #666; text-align: center;">Or copy this link: ${loginLink}</p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 30px; background-color: #050505; border-top: 1px solid #222222; text-align: center;">
                    <p style="margin: 0; font-size: 12px; color: #444444; text-transform: uppercase; letter-spacing: 1px;">
                      &copy; ${new Date().getFullYear()} RootedAI Solutions
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
      `,
        };

        await transporter.sendMail(mailOptions);

        return new Response(JSON.stringify({ success: true }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        });

    } catch (error: any) {
        console.error("Error inviting candidate:", error);
        return new Response(JSON.stringify({ error: error.message || "Unknown error occurred" }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 500,
        });
    }
};

serve(handler);
