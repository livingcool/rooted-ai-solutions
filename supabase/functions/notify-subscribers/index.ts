
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
            .eq("active", true); // Assuming you have an 'active' flag or just delete unsubscribed

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

        // 3. Send Emails (Batching usually required for large lists, simple loop for now)
        // Using Resend (standard for Supabase) or just logging if no provider set
        const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

        if (RESEND_API_KEY) {
            // Send individually to hide other recipients (BCC style or individual calls)
            // For mass sending, you'd usually use a 'batch' endpoint or loop
            const emails = subscribers.map(s => s.email);

            const res = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${RESEND_API_KEY}`,
                },
                body: JSON.stringify({
                    from: "RootedAI Insights <insights@rootedai.co.in>",
                    to: emails, // Resend handles array as multiple recipients or single? Usually BCC for bulk or single. 
                    // Note: Passing array to 'to' in Resend makes it visible to all potentially. 
                    // Better to loop or use 'bcc' or specific batch endpoint.
                    // For simplicity in this demo:
                    bcc: emails,
                    to: ["insights@rootedai.co.in"], // Send to self, bcc others
                    subject: emailSubject,
                    html: emailHtml,
                }),
            });

            const data = await res.json();
            console.log("Emails sent via Resend:", data);
        } else {
            console.log("RESEND_API_KEY not set. Would have sent email to:", subscribers.length, "subscribers.");
        }

        return new Response(JSON.stringify({ message: "Notifications processed" }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
        });
    }
});
