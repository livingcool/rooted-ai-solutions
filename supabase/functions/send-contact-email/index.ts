import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import nodemailer from "npm:nodemailer@6.9.13";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
    name: string;
    email: string;
    company?: string;
    phone?: string;
    service_needed?: string;
    message: string;
}

const handler = async (req: Request): Promise<Response> => {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const { name, email, company, phone, service_needed, message }: ContactRequest = await req.json();

        // Create a transporter using Gmail SMTP
        // User must set GMAIL_USER and GMAIL_APP_PASSWORD in Supabase secrets
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: Deno.env.get("GMAIL_USER") || "rootedaiofficial@gmail.com",
                pass: Deno.env.get("GMAIL_APP_PASSWORD"),
            },
        });

        const mailOptions = {
            from: `RootedAI <${Deno.env.get("GMAIL_USER") || "rootedaiofficial@gmail.com"}>`,
            to: ["ganeshkhovalan2203@gmail.com"],
            subject: `New Contact Form Submission from ${name}`,
            html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
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
                    <h2 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 700; color: #ffffff;">New Contact Submission</h2>
                    
                    <div style="background-color: #111111; padding: 20px; border: 1px solid #333333; margin: 30px 0;">
                        <p style="margin: 5px 0; color: #a0a0a0;">Name: <strong style="color: #ffffff;">${name}</strong></p>
                        <p style="margin: 5px 0; color: #a0a0a0;">Email: <strong style="color: #ffffff;">${email}</strong></p>
                        ${company ? `<p style="margin: 5px 0; color: #a0a0a0;">Company: <strong style="color: #ffffff;">${company}</strong></p>` : ''}
                        ${phone ? `<p style="margin: 5px 0; color: #a0a0a0;">Phone: <strong style="color: #ffffff;">${phone}</strong></p>` : ''}
                        ${service_needed ? `<p style="margin: 5px 0; color: #a0a0a0;">Service Needed: <strong style="color: #ffffff;">${service_needed}</strong></p>` : ''}
                    </div>

                    <div style="background-color: #111111; padding: 20px; border: 1px solid #333333; margin: 30px 0;">
                        <h3 style="margin: 0 0 10px 0; color: #ffffff; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Message</h3>
                        <p style="white-space: pre-wrap; color: #a0a0a0; font-size: 14px; line-height: 1.6;">${message}</p>
                    </div>
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
            replyTo: email,
        };

        await transporter.sendMail(mailOptions);

        return new Response(JSON.stringify({ success: true }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        });
    } catch (error: any) {
        console.error("Error sending email:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 500,
        });
    }
};

serve(handler);
