import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { blogPosts as initialData } from "@/data/blogPosts";
import { Upload, Loader2, Image as ImageIcon, Bold, Italic, Link as LinkIcon, CheckCircle2, AlertCircle, Info, Zap } from "lucide-react";

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
    const [uploading, setUploading] = useState(false);

    // CTA State
    const [ctaTitle, setCtaTitle] = useState("");
    const [ctaDescription, setCtaDescription] = useState("");
    const [ctaButtonText, setCtaButtonText] = useState("");
    const [ctaLink, setCtaLink] = useState("");

    // SEO States
    const [seoAnalysis, setSeoAnalysis] = useState<{
        score: number;
        checks: { label: string; status: 'good' | 'fair' | 'poor'; info: string }[];
    }>({ score: 0, checks: [] });

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
                    cta_title: ctaTitle,
                    cta_description: ctaDescription,
                    cta_button_text: ctaButtonText,
                    cta_link: ctaLink,
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
            setCtaTitle("");
            setCtaDescription("");
            setCtaButtonText("");
            setCtaLink("");
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

    const handleImageUpload = async (event: any, field: 'cover' | 'author' | 'editor') => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const toastId = toast.loading("Uploading image...");

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('blog_images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage
                .from('blog_images')
                .getPublicUrl(filePath);

            if (field === 'cover') {
                setCoverImage(data.publicUrl);
            } else if (field === 'author') {
                setAuthorImage(data.publicUrl);
            } else {
                // In-editor image insertion
                insertContent(`<img src="${data.publicUrl}" alt="Blog Image" class="w-full rounded-2xl my-8" />\n`);
            }
            toast.success("Image uploaded!", { id: toastId });
        } catch (error: any) {
            console.error("Upload error:", error);
            toast.error("Upload failed.", { id: toastId });
        } finally {
            setUploading(false);
        }
    };

    const insertContent = (before: string, after: string = "") => {
        const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
        if (!textarea) {
            // Fallback if not found
            setContent(prev => prev + before + after);
            return;
        }

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const selectedText = text.substring(start, end);
        const newText = text.substring(0, start) + before + selectedText + after + text.substring(end);

        setContent(newText);

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + before.length, end + before.length);
        }, 10);
    };

    const updateSeoScore = () => {
        const checks: { label: string; status: 'good' | 'fair' | 'poor'; info: string }[] = [];
        let score = 0;

        if (title.length >= 40 && title.length <= 60) {
            checks.push({ label: "Title Length", status: "good", info: "Perfect title length (40-60 chars)." });
            score += 25;
        } else if (title.length > 0) {
            checks.push({ label: "Title Length", status: "fair", info: "Try to keep title between 40-60 characters." });
            score += 10;
        } else {
            checks.push({ label: "Title Length", status: "poor", info: "Title is missing." });
        }

        if (excerpt.length >= 140 && excerpt.length <= 160) {
            checks.push({ label: "Meta Description", status: "good", info: "Great for search results (140-160 chars)." });
            score += 25;
        } else if (excerpt.length > 50) {
            checks.push({ label: "Meta Description", status: "fair", info: "Aim for 140-160 characters for best SEO." });
            score += 10;
        } else {
            checks.push({ label: "Meta Description", status: "poor", info: "Description is too short or missing." });
        }

        const keywords = ["AI", "automation", "RootedAI", "workflow", "efficiency", "agent", "cost", "intelligence"];
        const foundKeywords = keywords.filter(k => content.toLowerCase().includes(k.toLowerCase()));
        if (foundKeywords.length >= 3) {
            checks.push({ label: "Company Relevance", status: "good", info: `High relevance. Keywords found: ${foundKeywords.join(", ")}` });
            score += 30;
        } else if (foundKeywords.length > 0) {
            checks.push({ label: "Company Relevance", status: "fair", info: "Try adding more company-related keywords (AI, Automation, etc.)" });
            score += 15;
        } else {
            checks.push({ label: "Company Relevance", status: "poor", info: "Low relevance to company core services." });
        }

        if (content.includes("<img")) {
            checks.push({ label: "Visual Content", status: "good", info: "Images used in content." });
            score += 20;
        } else {
            checks.push({ label: "Visual Content", status: "fair", info: "Adding images can improve engagement." });
            score += 5;
        }

        setSeoAnalysis({ score, checks });
    };

    useEffect(() => {
        updateSeoScore();
    }, [title, excerpt, content]);

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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
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
                                        />
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

                                {/* Editor Toolbar */}
                                <div className="flex flex-wrap items-center gap-1 p-2 bg-zinc-50 dark:bg-zinc-800 rounded-t-lg border-x border-t border-zinc-200 dark:border-zinc-700">
                                    <Button variant="ghost" size="sm" onClick={() => insertContent('<b>', '</b>')} title="Bold">
                                        <Bold className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => insertContent('<i>', '</i>')} title="Italic">
                                        <Italic className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => {
                                        const url = prompt("Enter URL:");
                                        if (url) insertContent(`<a href="${url}" target="_blank" class="text-blue-600 hover:underline">`, '</a>');
                                    }} title="Insert Link">
                                        <LinkIcon className="w-4 h-4" />
                                    </Button>
                                    <div className="w-px h-6 bg-zinc-300 dark:bg-zinc-600 mx-1" />
                                    <input
                                        type="file"
                                        id="editor-image-upload"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, 'editor')}
                                    />
                                    <Button variant="ghost" size="sm" onClick={() => document.getElementById('editor-image-upload')?.click()} title="Insert Image">
                                        <ImageIcon className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => insertContent('<h2>', '</h2>')} className="text-xs font-bold">H2</Button>
                                    <Button variant="ghost" size="sm" onClick={() => insertContent('<h3>', '</h3>')} className="text-xs font-bold">H3</Button>
                                    <Button variant="ghost" size="sm" onClick={() => insertContent('<p>', '</p>')} className="text-xs font-bold">P</Button>
                                </div>

                                <Textarea
                                    id="content-editor"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="h-96 font-mono text-xs rounded-t-none border-t-0"
                                    placeholder="<p>Paste your HTML content here or use the toolbar...</p>"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Tip: Use selection and toolbar buttons to format content.
                                </p>
                            </div>

                            {/* Custom CTA Section */}
                            <div className="space-y-4 border rounded-xl p-6 bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30">
                                <h3 className="font-bold text-lg flex items-center gap-2">
                                    <Info className="w-5 h-5 text-blue-500" />
                                    Lead Acquisition (Custom CTA)
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4">Leave these empty to use the default company CTA.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">CTA Title</label>
                                        <Input value={ctaTitle} onChange={(e) => setCtaTitle(e.target.value)} placeholder="e.g. Stop wasting hours on manual tasks" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">CTA Button Text</label>
                                        <Input value={ctaButtonText} onChange={(e) => setCtaButtonText(e.target.value)} placeholder="e.g. Get Started Now" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">CTA Description</label>
                                        <Textarea value={ctaDescription} onChange={(e) => setCtaDescription(e.target.value)} placeholder="Short persuasive sentence..." className="h-20" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">CTA Link (URL)</label>
                                        <Input value={ctaLink} onChange={(e) => setCtaLink(e.target.value)} placeholder="https://wa.me/..." />
                                    </div>
                                </div>
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
                    </div>

                    {/* Sidebar (SEO Checker) */}
                    <div className="space-y-6">
                        <div className="sticky top-32 space-y-6">
                            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                                <div className="bg-zinc-50 dark:bg-zinc-950 px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                                    <h3 className="font-bold flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                        SEO Score
                                    </h3>
                                    <span className={`text-xl font-bold ${seoAnalysis.score > 70 ? 'text-green-500' :
                                        seoAnalysis.score > 40 ? 'text-yellow-500' : 'text-red-500'
                                        }`}>
                                        {seoAnalysis.score}
                                    </span>
                                </div>
                                <div className="p-6 space-y-4">
                                    {seoAnalysis.checks.map((check, idx) => (
                                        <div key={idx} className="flex gap-3">
                                            <div className="mt-1">
                                                {check.status === 'good' ? <CheckCircle2 className="w-4 h-4 text-green-500" /> :
                                                    check.status === 'fair' ? <AlertCircle className="w-4 h-4 text-yellow-500" /> :
                                                        <AlertCircle className="w-4 h-4 text-red-500" />}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold leading-none mb-1">{check.label}</p>
                                                <p className="text-xs text-muted-foreground">{check.info}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-zinc-950 text-white p-6 rounded-xl border border-zinc-800">
                                <h4 className="font-bold mb-2 flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-yellow-400" />
                                    Quick Tip
                                </h4>
                                <p className="text-xs text-zinc-400 leading-relaxed">
                                    A high SEO score ensures your blog post reaches the right audience. Make sure to use keywords like <strong>AI</strong>, <strong>Automation</strong>, and <strong>RootedAI</strong> naturally.
                                </p>
                            </div>
                        </div>
                    </div>
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
                                                        setCtaTitle(post.cta_title || "");
                                                        setCtaDescription(post.cta_description || "");
                                                        setCtaButtonText(post.cta_button_text || "");
                                                        setCtaLink(post.cta_link || "");
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
