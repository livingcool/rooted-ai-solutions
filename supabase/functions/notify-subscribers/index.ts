
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import nodemailer from "npm:nodemailer@6.9.13";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BlogPost {
    title: string;
    slug: string;
    excerpt: string;
    cover_image: string;
}

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const supabaseClient = createClient(
            Deno.env.get("SUPABASE_URL") ?? "",
            Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
        );

        // Get the blog post details from the request
        const { record } = await req.json();
        const blogPost: BlogPost = record;

        if (!blogPost) {
            return new Response(JSON.stringify({ message: "No record found" }), {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200,
            });
        }

        console.log("New blog post published:", blogPost.title);

        // 1. Fetch all subscribers
        const { data: subscribers, error: subscribersError } = await supabaseClient
            .from("newsletter_subscribers")
            .select("email")
            .eq("active", true);

        if (subscribersError) throw subscribersError;

        if (!subscribers || subscribers.length === 0) {
            console.log("No subscribers found.");
            return new Response(JSON.stringify({ message: "No subscribers" }), {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200,
            });
        }

        // 2. Prepare Email Content
        const blogUrl = `https://www.rootedai.co.in/blog/${blogPost.slug}`;
        const emailSubject = `New Insight: ${blogPost.title}`;
        const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #000;">${blogPost.title}</h1>
        ${blogPost.cover_image ? `<img src="${blogPost.cover_image}" alt="${blogPost.title}" style="width: 100%; border-radius: 8px; margin: 20px 0;" />` : ''}
        <p style="font-size: 16px; line-height: 1.6; color: #333;">
          ${blogPost.excerpt || "Read our latest article on RootedAI."}
        </p>
        <a href="${blogUrl}" style="display: inline-block; background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; margin-top: 20px;">
          Read Full Article
        </a>
        <hr style="margin: 40px 0; border: 0; border-top: 1px solid #eee;" />
        <p style="font-size: 12px; color: #666;">
          You satisfy the complexity. We simplify it.<br/>
          &copy; RootedAI
        </p>
      </div>
    `;

        // 3. Send Emails via Gmail SMTP (matching send-contact-email)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: Deno.env.get("GMAIL_USER") || "rootedaiofficial@gmail.com",
                pass: Deno.env.get("GMAIL_APP_PASSWORD"),
            },
        });

        const subscribersEmails = subscribers.map(s => s.email);

        // Use BCC to send ONE email to admin with all subscribers hidden in BCC
        await transporter.sendMail({
            from: `RootedAI Insights <${Deno.env.get("GMAIL_USER") || "rootedaiofficial@gmail.com"}>`,
            to: [Deno.env.get("GMAIL_USER") || "rootedaiofficial@gmail.com"], // To oneself
            bcc: subscribersEmails, // Hidden recipients
            subject: emailSubject,
            html: emailHtml,
        });

        console.log("Emails sent via Gmail SMTP to", subscribersEmails.length, "subscribers.");

        return new Response(JSON.stringify({ message: "Notifications processed" }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        });
    } catch (error) {
        console.error("Error processing notification:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400, // Client error if bad request, but here likely server error so 500 effectively, but returning JSON
        });
    }
});
