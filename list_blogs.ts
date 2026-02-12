
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://gtxbxdgnfpaxwxrgcrgz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0eGJ4ZGduZnBheHd4cmdjcmd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4MDc0MDYsImV4cCI6MjA3NDM4MzQwNn0.cFJ2Rg1Q8OXk7YsdnZu5ytwjjrzxrBoZld87CRTJYbU";

const supabase = createClient(supabaseUrl, supabaseKey);

const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: true }); // Ascending to find the "first" (oldest) one, or just list all.

if (error) {
    console.error("Error fetching posts:", error);
} else {
    console.log("Found", posts.length, "posts:");
    posts.forEach((p, i) => {
        console.log(`${i + 1}. [${p.id}] ${p.title} (Slug: ${p.slug})`);
    });
}
