import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import nodemailer from "npm:nodemailer@6.9.13";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SubscriptionRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: SubscriptionRequest = await req.json();
    console.log("Attempting to send email to:", email);

    const gmailUser = Deno.env.get("GMAIL_USER");
    const gmailPass = Deno.env.get("GMAIL_APP_PASSWORD");

    if (!gmailUser || !gmailPass) {
      console.error("Missing Gmail secrets");
      throw new Error("Missing Gmail configuration");
    }

    // Create a transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser || "rootedaiofficial@gmail.com",
        pass: gmailPass,
      },
    });

    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to RootedAI</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #000000; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #000000; color: #ffffff;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <!-- Main Container -->
              <table role="presentation" width="100%" style="max-width: 600px; background-color: #0a0a0a; border: 1px solid #333333; border-radius: 0px; overflow: hidden;">
                
                <!-- Header with Logo -->
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
                    <h1 style="margin: 0 0 20px 0; font-size: 32px; font-weight: 700; letter-spacing: -0.02em; line-height: 1.2; color: #ffffff; text-align: center;">
                      Welcome to the <span style="color: #666;">Future.</span>
                    </h1>
                    
                    <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #a0a0a0; text-align: center;">
                      Thank you for subscribing. You've just taken a step towards the forefront of automation intelligence.
                    </p>
                    
                    <p style="margin: 0 0 40px 0; font-size: 16px; line-height: 1.6; color: #a0a0a0; text-align: center;">
                      We are dedicated to engineering autonomy for the modern enterprise. As a subscriber, you'll receive exclusive insights that define the next generation of business efficiency.
                    </p>

                    <!-- Button -->
                    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%">
                      <tr>
                        <td align="center">
                          <a href="https://rooted-ai-solutions.vercel.app/" style="display: inline-block; padding: 16px 36px; background-color: #ffffff; color: #000000; text-decoration: none; font-weight: 600; font-size: 14px; border-radius: 0px; letter-spacing: 1px; text-transform: uppercase; border: 1px solid #ffffff;">
                            Explore Our Vision
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 30px; background-color: #050505; border-top: 1px solid #222222; text-align: center;">
                    <p style="margin: 0 0 10px 0; font-size: 12px; color: #444444; text-transform: uppercase; letter-spacing: 1px;">
                      &copy; ${new Date().getFullYear()} RootedAI Solutions
                    </p>
                    <div style="font-size: 12px; color: #444444;">
                      <a href="#" style="color: #666666; text-decoration: none; margin: 0 10px;">Unsubscribe</a>
                      <a href="#" style="color: #666666; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `RootedAI <${gmailUser || "rootedaiofficial@gmail.com"}>`,
      to: email,
      subject: `Welcome to RootedAI`,
      html: htmlTemplate,
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
