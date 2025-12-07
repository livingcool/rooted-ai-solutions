import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import nodemailer from "npm:nodemailer@6.9.13";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
};

interface RejectionRequest {
    email: string;
    subject: string;
    body: string;
}

const handler = async (req: Request): Promise<Response> => {
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const { email, subject, body }: RejectionRequest = await req.json();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: Deno.env.get("GMAIL_USER") || "rootedaiofficial@gmail.com",
                pass: Deno.env.get("GMAIL_APP_PASSWORD"),
            },
        });

        const mailOptions = {
            from: `RootedAI Careers <${Deno.env.get("GMAIL_USER") || "rootedaiofficial@gmail.com"}>`,
            to: email,
            subject: subject,
            html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
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
                    <div style="font-size: 16px; line-height: 1.6; color: #a0a0a0; white-space: pre-wrap;">
                      ${body.replace(/\n/g, '<br>')}
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
        };

        await transporter.sendMail(mailOptions);

        return new Response(JSON.stringify({ success: true }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        });

    } catch (error: any) {
        console.error("Error sending rejection email:", error);
        return new Response(JSON.stringify({ error: error.message || "Unknown error occurred" }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 500,
        });
    }
};

serve(handler);
