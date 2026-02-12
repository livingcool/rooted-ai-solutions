
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gtxbxdgnfpaxwxrgcrgz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0eGJ4ZGduZnBheHd4cmdjcmd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4MDc0MDYsImV4cCI6MjA3NDM4MzQwNn0.cFJ2Rg1Q8OXk7YsdnZu5ytwjjrzxrBoZld87CRTJYbU";

const supabase = createClient(supabaseUrl, supabaseKey);

const main = async () => {
    const { data: posts, error } = await supabase
        .from("blog_posts")
        .select("id, title, created_at")
        .order("created_at", { ascending: false }); // Newest first

    if (error) {
        console.error("Error fetching posts:", error);
    } else {
        console.log("Posts (Newest First):");
        posts.forEach((p, i) => {
            console.log(`${i + 1}. [${p.created_at}] ${p.title}`);
        });
    }
};

main();
