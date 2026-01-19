import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { blogPosts as initialData } from "@/data/blogPosts";
import { Upload, Loader2, Image as ImageIcon } from "lucide-react";

const BlogAdmin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");

    // Form State
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [author, setAuthor] = useState("RootedAI Team");
    const [authorRole, setAuthorRole] = useState("");
    const [authorImage, setAuthorImage] = useState("");
    const [authorLinkedin, setAuthorLinkedin] = useState("");
    const [category, setCategory] = useState("Technology");
    const [readTime, setReadTime] = useState("5 min read");
    const [coverImage, setCoverImage] = useState("");
    const [content, setContent] = useState(""); // This will hold the HTML
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState<any[]>([]);
    const [extractedLinks, setExtractedLinks] = useState<any[]>([]);

    useEffect(() => {
        if (isAuthenticated) fetchPosts();
    }, [isAuthenticated]);

    const fetchPosts = async () => {
        const { data } = await supabase
            .from('blog_posts' as any)
            .select('*')
            .order('published_at', { ascending: false });
        if (data) setPosts(data);
    };

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
                    author_image: authorImage,
                    author_linkedin: authorLinkedin,
                    author_role: authorRole,
                    category,
                    read_time: readTime,
                    cover_image: coverImage,
                    content,
                }, { onConflict: 'slug' });

            if (error) throw error;

            toast.success("Blog post published successfully!");

            // Trigger Newsletter
            toast.promise(
                supabase.functions.invoke('notify-subscribers', {
                    body: {
                        record: {
                            title,
                            slug,
                            excerpt,
                            cover_image: coverImage
                        }
                    }
                }),
                {
                    loading: 'Sending newsletter to subscribers...',
                    success: 'Newsletter queued!',
                    error: 'Failed to trigger newsletter.'
                }
            );

            // Reset form
            setTitle("");
            setSlug("");
            setContent("");
            setAuthorImage("");
            setAuthorLinkedin("");
            setAuthorRole("");
            fetchPosts();
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
            fetchPosts();
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

    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (event: any, field: 'cover' | 'author') => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const toastId = toast.loading("Uploading image...");

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${fileName}`; // Uploading to root of bucket

            // Attempt to upload to 'blog_images' bucket (commonly used, or fallback to 'public' if needed)
            // Note: If bucket doesn't exist, this will fail. User needs to create 'blog_images' public bucket.
            const { error: uploadError } = await supabase.storage
                .from('blog_images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage
                .from('blog_images')
                .getPublicUrl(filePath);

            if (field === 'cover') {
                setCoverImage(data.publicUrl);
            } else {
                setAuthorImage(data.publicUrl);
            }
            toast.success("Image uploaded!", { id: toastId });
        } catch (error: any) {
            console.error("Upload error:", error);
            toast.error("Upload failed. Ensure 'blog_images' bucket exists and is public.", { id: toastId });
        } finally {
            setUploading(false);
        }
    };

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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Author Name</label>
                            <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Author Role</label>
                            <Input value={authorRole} onChange={(e) => setAuthorRole(e.target.value)} placeholder="e.g. CEO, Lead Engineer" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Author Image URL</label>
                            <div className="flex gap-2">
                                <Input value={authorImage} onChange={(e) => setAuthorImage(e.target.value)} placeholder="https://..." className="flex-1 text-xs" />
                                <input
                                    type="file"
                                    id="author-upload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, 'author')}
                                />
                                <Button
                                    variant="outline"
                                    size="icon"
                                    title="Upload from computer"
                                    onClick={() => document.getElementById('author-upload')?.click()}
                                    disabled={uploading}
                                >
                                    {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Author LinkedIn</label>
                            <div className="relative">
                                <Input
                                    value={authorLinkedin}
                                    onChange={(e) => setAuthorLinkedin(e.target.value)}
                                    placeholder="https://linkedin.com/in/..."
                                    onBlur={async () => {
                                        if (!authorLinkedin || authorImage) return; // Don't fetch if empty or image already set

                                        const toastId = toast.loading("Fetching LinkedIn profile image...");
                                        try {
                                            const { data, error } = await supabase.functions.invoke('fetch-url-metadata', {
                                                body: { url: authorLinkedin }
                                            });

                                            if (error) throw error;

                                            if (data?.image) {
                                                setAuthorImage(data.image);
                                                toast.success("Profile image found!", { id: toastId });
                                            } else {
                                                toast.info("Could not find a public profile image.", { id: toastId });
                                            }
                                        } catch (e) {
                                            console.error(e);
                                            toast.error("Failed to fetch profile metadata.", { id: toastId });
                                        }
                                    }}
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground pointer-events-none bg-white dark:bg-zinc-900 px-1">
                                    Auto-fetch on blur
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <div className="flex gap-2">
                            <Input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="https://..." className="flex-1" />
                            <input
                                type="file"
                                id="cover-upload"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, 'cover')}
                            />
                            <Button
                                variant="outline"
                                onClick={() => document.getElementById('cover-upload')?.click()}
                                disabled={uploading}
                                className="gap-2"
                            >
                                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                Upload Image
                            </Button>
                        </div>
                        {coverImage && (
                            <div className="mt-2 relative w-full h-40 bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
                                <img src={coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
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

                                                    // Author Extras
                                                    const metaAuthorImg = doc.querySelector('meta[name="author_image"]')?.getAttribute("content");
                                                    if (metaAuthorImg) setAuthorImage(metaAuthorImg);

                                                    const metaAuthorLi = doc.querySelector('meta[name="author_linkedin"]')?.getAttribute("content");
                                                    if (metaAuthorLi) setAuthorLinkedin(metaAuthorLi);

                                                    const metaAuthorRole = doc.querySelector('meta[name="author_role"]')?.getAttribute("content");
                                                    if (metaAuthorRole) setAuthorRole(metaAuthorRole);

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

                    {/* Links Manager */}
                    <div className="space-y-4 border rounded-xl p-4 bg-zinc-50 dark:bg-zinc-800/50">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-sm">Links Manager</h3>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    const parser = new DOMParser();
                                    const doc = parser.parseFromString(content, 'text/html');
                                    const anchors = doc.querySelectorAll('a');
                                    const links: any[] = [];
                                    anchors.forEach((a, i) => {
                                        links.push({ id: i, text: a.textContent, href: a.getAttribute('href') || '' });
                                    });
                                    setExtractedLinks(links);
                                    if (links.length === 0) toast.info("No links found in HTML.");
                                    else toast.success(`Found ${links.length} links.`);
                                }}
                            >
                                Scan for Links
                            </Button>
                        </div>

                        {extractedLinks.length > 0 && (
                            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                                {extractedLinks.map((link, idx) => (
                                    <div key={idx} className="grid grid-cols-[1fr,2fr] gap-2 items-center bg-white dark:bg-black p-2 rounded border border-zinc-200 dark:border-zinc-800">
                                        <div className="text-xs font-mono text-muted-foreground truncate" title={link.text}>
                                            "{link.text}"
                                        </div>
                                        <Input
                                            value={link.href}
                                            className="h-7 text-xs"
                                            onChange={(e) => {
                                                const newLinks = [...extractedLinks];
                                                newLinks[idx].href = e.target.value;
                                                setExtractedLinks(newLinks);
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {extractedLinks.length > 0 && (
                            <Button
                                className="w-full"
                                size="sm"
                                onClick={() => {
                                    const parser = new DOMParser();
                                    const doc = parser.parseFromString(content, 'text/html');
                                    const anchors = doc.querySelectorAll('a');

                                    // Replace hrefs
                                    anchors.forEach((a, i) => {
                                        if (extractedLinks[i]) {
                                            a.setAttribute('href', extractedLinks[i].href);
                                        }
                                    });

                                    setContent(doc.body.innerHTML);
                                    toast.success("Links updated in HTML content!");
                                }}
                            >
                                Apply Link Changes to HTML
                            </Button>
                        )}
                    </div>

                    <Button onClick={handlePublish} disabled={loading} className="w-full text-lg h-12">
                        {loading ? "Publishing..." : "Publish Post"}
                    </Button>
                </div>

                <div className="mt-20">
                    <h2 className="text-2xl font-bold mb-8">Manage Existing Posts</h2>
                    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-zinc-50 dark:bg-zinc-950 text-zinc-500 uppercase font-bold text-xs">
                                    <tr>
                                        <th className="px-6 py-4">Title</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                    {posts.map((post) => (
                                        <tr key={post.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                                            <td className="px-6 py-4 font-medium">{post.title}</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                                    Published
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right space-x-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        setTitle(post.title);
                                                        setSlug(post.slug);
                                                        setExcerpt(post.excerpt || "");
                                                        setAuthor(post.author || "RootedAI Team");
                                                        setCategory(post.category || "Technology");
                                                        setReadTime(post.read_time || "5 min read");
                                                        setCoverImage(post.cover_image || "");
                                                        setContent(post.content || "");
                                                        window.scrollTo(0, 0);
                                                        toast.info("Loaded into editor. Click Publish to update.");
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={async () => {
                                                        if (!confirm("Are you sure you want to delete this post?")) return;

                                                        const { error, data } = await supabase
                                                            .from('blog_posts' as any)
                                                            .delete()
                                                            .eq('id', post.id)
                                                            .select();

                                                        if (error) {
                                                            toast.error("Failed to delete: " + error.message);
                                                        } else if (!data || data.length === 0) {
                                                            toast.error("Failed to delete. Please run the new migration to enable delete permissions.");
                                                        } else {
                                                            toast.success("Post deleted");
                                                            fetchPosts();
                                                        }
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    {posts.length === 0 && (
                                        <tr>
                                            <td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">
                                                No posts found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default BlogAdmin;
