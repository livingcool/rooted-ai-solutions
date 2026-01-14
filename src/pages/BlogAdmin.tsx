import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { blogPosts as initialData } from "@/data/blogPosts";

const BlogAdmin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");

    // Form State
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [author, setAuthor] = useState("RootedAI Team");
    const [category, setCategory] = useState("Technology");
    const [readTime, setReadTime] = useState("5 min read");
    const [coverImage, setCoverImage] = useState("");
    const [content, setContent] = useState(""); // This will hold the HTML
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        if (password === "G22a05n@03") { // Simple hardcoded secret for the "secret url"
            setIsAuthenticated(true);
            toast.success("Welcome, Admin.");
        } else {
            toast.error("Invalid Secret.");
        }
    };

    const handlePublish = async () => {
        if (!title || !slug || !content) {
            toast.error("Please fill in required fields (Title, Slug, Content).");
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase
                .from('blog_posts' as any)
                .upsert({
                    title,
                    slug,
                    excerpt,
                    author,
                    category,
                    read_time: readTime,
                    cover_image: coverImage,
                    content,
                }, { onConflict: 'slug' });

            if (error) throw error;

            toast.success("Blog post published successfully!");
            // Reset form
            setTitle("");
            setSlug("");
            setContent("");
        } catch (error: any) {
            toast.error(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const seedInitialData = async () => {
        setLoading(true);
        try {
            for (const post of initialData) {
                const { error } = await supabase
                    .from('blog_posts' as any)
                    .upsert({
                        title: post.title,
                        slug: post.slug,
                        excerpt: post.excerpt,
                        author: post.author,
                        category: post.category,
                        read_time: post.readTime,
                        cover_image: post.coverImage,
                        content: post.content,
                    }, { onConflict: 'slug' });

                if (error) console.error("Error seeding post:", post.title, error);
            }
            toast.success("Initial data seeded!");
        } catch (e) {
            toast.error("Seeding failed");
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white p-4">
                <div className="w-full max-w-md space-y-4 text-center">
                    <h1 className="text-2xl font-bold">Restricted Access</h1>
                    <Input
                        type="password"
                        placeholder="Enter Secret Key"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-zinc-900 border-zinc-800"
                    />
                    <Button onClick={handleLogin} className="w-full">Enter</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black">
            <Navigation />
            <div className="container mx-auto px-4 pt-32 pb-20 max-w-4xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Blog Admin</h1>
                    <Button variant="outline" onClick={seedInitialData} disabled={loading}>
                        Seed Initial Data
                    </Button>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Title</label>
                            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Blog Post Title" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Slug (URL)</label>
                            <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="scaling-is-bankrupting-you" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Author</label>
                            <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Category</label>
                            <Input value={category} onChange={(e) => setCategory(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Read Time</label>
                            <Input value={readTime} onChange={(e) => setReadTime(e.target.value)} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Excerpt</label>
                        <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="h-24" placeholder="Short description for cards/SEO..." />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Cover Image URL</label>
                        <Input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="https://..." />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium">HTML Content</label>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">Or upload .html file:</span>
                                <Input
                                    type="file"
                                    accept=".html"
                                    className="h-8 text-xs w-48"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onload = (event) => {
                                                if (event.target?.result) {
                                                    const text = event.target.result as string;
                                                    setContent(text);

                                                    // Auto-fill metadata
                                                    const parser = new DOMParser();
                                                    const doc = parser.parseFromString(text, 'text/html');

                                                    // Title
                                                    const extractedTitle = doc.title || doc.querySelector('h1')?.textContent || "";
                                                    if (extractedTitle) setTitle(extractedTitle);

                                                    // Slug (simple sanitize)
                                                    if (extractedTitle && !slug) {
                                                        const cleanSlug = extractedTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                                                        setSlug(cleanSlug);
                                                    }

                                                    // Excerpt
                                                    const metaDesc = doc.querySelector('meta[name="description"]')?.getAttribute("content");
                                                    if (metaDesc) setExcerpt(metaDesc);

                                                    // Author
                                                    const metaAuthor = doc.querySelector('meta[name="author"]')?.getAttribute("content");
                                                    if (metaAuthor) setAuthor(metaAuthor);

                                                    // Category
                                                    const metaCategory = doc.querySelector('meta[name="category"]')?.getAttribute("content");
                                                    if (metaCategory) setCategory(metaCategory);

                                                    toast.success("HTML loaded & metadata auto-filled!");
                                                }
                                            };
                                            reader.readAsText(file);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <Textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="h-96 font-mono text-xs"
                            placeholder="<p>Paste your HTML content here...</p>"
                        />
                        <p className="text-xs text-muted-foreground">
                            Tip: You can paste raw HTML here. Classes like `text-xl`, `font-bold` (Tailwind) will work.
                        </p>
                    </div>

                    <Button onClick={handlePublish} disabled={loading} className="w-full text-lg h-12">
                        {loading ? "Publishing..." : "Publish Post"}
                    </Button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default BlogAdmin;
