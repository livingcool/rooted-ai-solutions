
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const { url } = await req.json();

        if (!url) {
            return new Response(JSON.stringify({ error: "URL is required" }), {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 400,
            });
        }

        console.log(`Fetching metadata for: ${url}`);

        // Fetch the HTML content, mimicking a browser to avoid some bot blocks
        const res = await fetch(url, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch URL: ${res.statusText}`);
        }

        const html = await res.text();

        // Simple regex parse for og:image
        // Looks for <meta property="og:image" content="..." > or <meta content="..." property="og:image">
        const ogImageRegex = /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']|<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/;
        const match = html.match(ogImageRegex);
        const image = match ? (match[1] || match[2]) : null;

        // Try to find title as well if needed
        const ogTitleRegex = /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']|<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:title["']/;
        const titleMatch = html.match(ogTitleRegex);
        const title = titleMatch ? (titleMatch[1] || titleMatch[2]) : null;

        console.log(`Found image: ${image}`);

        return new Response(JSON.stringify({ image, title }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        });
    } catch (error) {
        console.error("Error fetching metadata:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 500,
        });
    }
});
