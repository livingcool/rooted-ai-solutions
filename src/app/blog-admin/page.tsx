'use client';

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { blogPosts as initialData } from "@/data/blogPosts";
import { Upload, Loader2, Image as ImageIcon, Bold, Italic, Link as LinkIcon, CheckCircle2, AlertCircle, Info, Zap, Plus, Trash2, Lock, Linkedin, Twitter } from "lucide-react";

export default function BlogAdminPage() {
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
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState<any[]>([]);
    const [extractedLinks, setExtractedLinks] = useState<any[]>([]);
    const [uploading, setUploading] = useState(false);
    const [newKeyword, setNewKeyword] = useState("");
    const [newKeywordUrl, setNewKeywordUrl] = useState("");

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
        if (password === "G22a05n@03") {
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
            supabase.functions.invoke('notify-subscribers', {
                body: {
                    record: {
                        title,
                        slug,
                        excerpt,
                        cover_image: coverImage
                    }
                }
            }).then(({ error }) => {
                if (error) console.error("Error triggering newsletter:", error);
            });

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
                await supabase
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
            }
            toast.success("Initial data seeded!");
            fetchPosts();
        } catch (e) {
            toast.error("Seeding failed");
        } finally {
            setLoading(false);
        }
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
            <div className="min-h-screen flex items-center justify-center bg-[#F9EFE9] text-[#240747] p-4">
                <div className="w-full max-w-md space-y-8 text-center bg-white border-4 border-[#240747] shadow-[12px_12px_0_#240747] p-12 rounded-3xl">
                    <div className="flex justify-center">
                        <div className="w-20 h-20 bg-[#240747] rounded-3xl flex items-center justify-center text-[#F6851B]">
                            <Lock size={40} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-3xl font-black uppercase tracking-tight">Restricted Access</h1>
                        <p className="text-xs font-bold text-[#240747]/40 uppercase tracking-widest">Authorized Intel Personnel Only</p>
                    </div>
                    <div className="space-y-4">
                        <input
                            type="password"
                            placeholder="Enter Mission Key"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#F9EFE9] border-2 border-[#240747] p-4 rounded-xl font-bold focus:outline-none focus:ring-4 focus:ring-[#F6851B]/20 transition-all placeholder:text-[#240747]/20 shadow-[4px_4px_0_#240747]"
                        />
                        <button onClick={handleLogin} className="w-full nb-btn nb-btn-primary py-4 text-lg">Verify Intelligence</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F9EFE9] text-[#240747]">
            <div className="container mx-auto px-4 pt-32 pb-20 max-w-6xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 nb-tile-inverted p-8 border-4 border-[#240747] shadow-[8px_8px_0_#F6851B] rounded-3xl">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black tracking-tight">Intel Terminal</h1>
                        <p className="text-[#F9EFE9]/40 text-xs font-bold uppercase tracking-widest">Broadcast Control v4.2</p>
                    </div>
                    <button onClick={seedInitialData} disabled={loading} className="nb-btn nb-btn-ghost border-[#F9EFE9]/20 text-[#F9EFE9] hover:bg-[#F9EFE9]/10">
                        Seed Initial Data
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-8 border-4 border-[#240747] shadow-[12px_12px_0_#240747] rounded-3xl space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[0.6rem] font-black uppercase tracking-widest text-[#F6851B]">Broadcast Title</label>
                                    <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tactical Intelligence Report" className="w-full bg-[#F9EFE9] border-2 border-[#240747] p-3 rounded-xl font-bold focus:outline-none focus:ring-4 focus:ring-[#F6851B]/20 transition-all shadow-[4px_4px_0_#240747]" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[0.6rem] font-black uppercase tracking-widest text-[#F6851B]">Secure Slug</label>
                                    <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="scaling-intelligence" className="w-full bg-[#F9EFE9] border-2 border-[#240747] p-3 rounded-xl font-bold focus:outline-none focus:ring-4 focus:ring-[#F6851B]/20 transition-all shadow-[4px_4px_0_#240747]" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[0.6rem] font-black uppercase tracking-widest text-[#F6851B]">Agent Name</label>
                                    <input value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full bg-[#F9EFE9] border-2 border-[#240747] p-3 rounded-xl font-bold focus:outline-none focus:ring-4 focus:ring-[#F6851B]/20 transition-all shadow-[4px_4px_0_#240747]" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[0.6rem] font-black uppercase tracking-widest text-[#F6851B]">Agent Designation</label>
                                    <input value={authorRole} onChange={(e) => setAuthorRole(e.target.value)} placeholder="Lead Strategist" className="w-full bg-[#F9EFE9] border-2 border-[#240747] p-3 rounded-xl font-bold focus:outline-none focus:ring-4 focus:ring-[#F6851B]/20 transition-all shadow-[4px_4px_0_#240747]" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[0.6rem] font-black uppercase tracking-widest text-[#F6851B]">Intel Summary (Excerpt)</label>
                                <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="w-full h-24 bg-[#F9EFE9] border-2 border-[#240747] p-3 rounded-xl font-bold focus:outline-none focus:ring-4 focus:ring-[#F6851B]/20 transition-all shadow-[4px_4px_0_#240747]" placeholder="Brief summary of intelligence gathered..." />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[0.6rem] font-black uppercase tracking-widest text-[#F6851B]">Broadcast Content (HTML)</label>
                                <textarea
                                    id="content-editor"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full h-96 bg-[#F9EFE9] border-4 border-[#240747] p-6 rounded-2xl font-mono text-xs focus:outline-none focus:ring-8 focus:ring-[#F6851B]/10 transition-all shadow-[8px_8px_0_#240747]"
                                    placeholder="<p>Initialize transmission...</p>"
                                />
                            </div>

                            <button onClick={handlePublish} disabled={loading} className="w-full nb-btn nb-btn-primary h-16 text-xl">
                                {loading ? "Broadcasting..." : "Commit Intelligence"}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white p-8 border-4 border-[#240747] shadow-[12px_12px_0_#240747] rounded-3xl space-y-6 sticky top-32">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-black uppercase tracking-tight">SEO Scan</h3>
                                <div className={`text-3xl font-black ${seoAnalysis.score > 70 ? 'text-green-500' : 'text-orange-500'}`}>
                                    {seoAnalysis.score}
                                </div>
                            </div>
                            <div className="space-y-4">
                                {seoAnalysis.checks.map((check, idx) => (
                                    <div key={idx} className="flex gap-4 p-4 bg-[#F9EFE9] border-2 border-[#240747] rounded-xl">
                                        <div className="mt-1">
                                            {check.status === 'good' ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <AlertCircle className="w-4 h-4 text-orange-600" />}
                                        </div>
                                        <div>
                                            <p className="text-[0.6rem] font-black uppercase tracking-widest text-[#240747]">{check.label}</p>
                                            <p className="text-xs font-bold text-[#240747]/60 leading-tight">{check.info}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-32 space-y-8">
                    <h2 className="text-3xl font-black uppercase tracking-tight">Intelligence Archive</h2>
                    <div className="bg-white border-4 border-[#240747] shadow-[12px_12px_0_#240747] rounded-3xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="nb-tile-inverted">
                                    <tr>
                                        <th className="px-8 py-6 font-black uppercase tracking-widest text-[0.65rem]">Title</th>
                                        <th className="px-8 py-6 font-black uppercase tracking-widest text-[0.65rem]">Status</th>
                                        <th className="px-8 py-6 font-black uppercase tracking-widest text-[0.65rem] text-right">Operations</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y-2 divide-[#240747]/10">
                                    {posts.map((post) => (
                                        <tr key={post.id} className="hover:bg-[#F9EFE9]/50 transition-colors">
                                            <td className="px-8 py-6 font-black text-[#240747]">{post.title}</td>
                                            <td className="px-8 py-6">
                                                <span className="nb-tag-orange text-[0.55rem]">Published</span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex justify-end gap-3">
                                                    <button
                                                        className="nb-btn nb-btn-ghost py-1.5 px-4 text-[0.65rem] h-auto"
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
                                                            toast.info("Intelligence loaded for revision.");
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="nb-btn nb-btn-ghost py-1.5 px-4 text-[0.65rem] h-auto border-red-500/20 text-red-500"
                                                        onClick={async () => {
                                                            if (!confirm("Confirm intel deletion?")) return;
                                                            const { error } = await supabase.from('blog_posts' as any).delete().eq('id', post.id);
                                                            if (error) toast.error("Ops failure: " + error.message);
                                                            else { toast.success("Intel purged."); fetchPosts(); }
                                                        }}
                                                    >
                                                        Purge
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
