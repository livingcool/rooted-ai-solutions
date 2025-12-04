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
    message: string;
}

const handler = async (req: Request): Promise<Response> => {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const { name, email, message }: ContactRequest = await req.json();

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
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
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
