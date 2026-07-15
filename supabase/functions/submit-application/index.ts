import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import nodemailer from "npm:nodemailer@6.9.13";

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

        // Get Job Title for the notification email
        const { data: jobData, error: jobError } = await supabaseAdmin
            .from('jobs')
            .select('title')
            .eq('id', job_id)
            .single();
        const jobTitle = jobData?.title || "Unknown Position";

        // Generate a 10-year signed URL for candidate's resume
        let signedResumeUrl = "";
        try {
            const { data: signedData, error: signedError } = await supabaseAdmin
                .storage
                .from('resumes')
                .createSignedUrl(resume_url, 315360000); // 10 years in seconds
            
            if (signedError) {
                console.error("Error creating signed URL for resume:", signedError);
            } else if (signedData) {
                signedResumeUrl = signedData.signedUrl;
            }
        } catch (e) {
            console.error("Failed to generate signed URL:", e);
        }

        // Send direct email notifications to ganeshkhovalan2203@gmail.com and rootedaiofficial@gmail.com
        try {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: Deno.env.get("GMAIL_USER") || "rootedaiofficial@gmail.com",
                    pass: Deno.env.get("GMAIL_APP_PASSWORD"),
                },
            });

            const mailOptions = {
                from: `RootedAI Recruitment <${Deno.env.get("GMAIL_USER") || "rootedaiofficial@gmail.com"}>`,
                to: ["ganeshkhovalan2203@gmail.com", "rootedaiofficial@gmail.com"],
                subject: `New Candidate Application: ${jobTitle} - ${full_name}`,
                html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Job Application</title>
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
                        <h2 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 700; color: #ffffff;">New Job Application</h2>
                        <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #a0a0a0;">
                          A new candidate has submitted an application for the <strong style="color: #ffffff;">${jobTitle}</strong> position.
                        </p>
                        
                        <div style="background-color: #111111; padding: 20px; border: 1px solid #333333; margin: 30px 0;">
                            <h3 style="margin: 0 0 15px 0; color: #F6851B; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Candidate Details</h3>
                            <p style="margin: 5px 0; color: #a0a0a0;">Full Name: <strong style="color: #ffffff;">${full_name}</strong></p>
                            <p style="margin: 5px 0; color: #a0a0a0;">Email: <strong style="color: #ffffff;">${email}</strong></p>
                            <p style="margin: 5px 0; color: #a0a0a0;">Phone: <strong style="color: #ffffff;">${phone || 'N/A'}</strong></p>
                            ${portfolio_url ? `<p style="margin: 5px 0; color: #a0a0a0;">Portfolio: <a href="${portfolio_url}" style="color: #F6851B; text-decoration: underline;" target="_blank">${portfolio_url}</a></p>` : ''}
                        </div>
    
                        ${cover_letter ? `
                        <div style="background-color: #111111; padding: 20px; border: 1px solid #333333; margin: 30px 0;">
                            <h3 style="margin: 0 0 10px 0; color: #ffffff; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Cover Letter</h3>
                            <p style="white-space: pre-wrap; color: #a0a0a0; font-size: 14px; line-height: 1.6;">${cover_letter}</p>
                        </div>
                        ` : ''}
    
                        <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%" style="margin-top: 30px;">
                          <tr>
                            <td align="center">
                              <a href="${signedResumeUrl || resume_url}" style="display: inline-block; padding: 16px 36px; background-color: #F6851B; color: #240747; text-decoration: none; font-weight: 700; font-size: 14px; border-radius: 0px; letter-spacing: 1px; text-transform: uppercase; border: 1px solid #F6851B;" target="_blank">
                                Download / View Resume
                              </a>
                            </td>
                          </tr>
                        </table>
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
          `
            };

            await transporter.sendMail(mailOptions);
            console.log(`Direct application email notification successfully sent to ganeshkhovalan2203@gmail.com and rootedaiofficial@gmail.com.`);
        } catch (emailErr) {
            console.error("Failed to send direct email notification:", emailErr);
        }

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
