'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Calendar, Clock, User, Facebook, Twitter, Linkedin, Copy, Mail, Send, Sparkles, ChevronRight, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function BlogPost() {
    const params = useParams();
    const slug = params?.slug;
    const router = useRouter();
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [processedContent, setProcessedContent] = useState("");
    const [toc, setToc] = useState<any[]>([]);

    useEffect(() => {
        if (slug) fetchPost();
    }, [slug]);

    const fetchPost = async () => {
        try {
            const { data, error } = await supabase
                .from('blog_posts' as any)
                .select('*')
                .eq('slug', slug)
                .single();

            if (error) {
                console.error('Error fetching post:', error);
                router.push('/blog');
            } else {
                setPost(data);
                processContent((data as any).content);
            }
        } catch (error) {
            console.error('Error:', error);
            router.push('/blog');
        } finally {
            setLoading(false);
        }
    };

    const processContent = (htmlContent: string) => {
        if (!htmlContent) return;

        let cleanHtml = htmlContent.replace(/MetaTitle\s*:.*?(<br>|<\/p>)/i, '').replace(/MetaDescription\s*:.*?(<br>|<\/p>)/i, '');

        if (typeof window !== 'undefined') {
            const parser = new DOMParser();
            const doc = parser.parseFromString(cleanHtml, 'text/html');
            const headings = doc.querySelectorAll('h2, h3');
            const tocItems: any[] = [];

            headings.forEach((heading, index) => {
                const id = `heading-${index}`;
                heading.id = id;
                heading.classList.add('scroll-mt-32');
                const fullText = heading.textContent || "";
                const text = fullText.length > 50 ? fullText.substring(0, 50) + "..." : fullText;
                tocItems.push({ id, text, level: heading.tagName.toLowerCase() });
            });

            setProcessedContent(doc.body.innerHTML);
            setToc(tocItems);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F9EFE9]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#240747] border-t-[#F6851B] rounded-full animate-spin"></div>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#240747]">Synchronizing Intelligence...</span>
                </div>
            </div>
        );
    }

    if (!post) return null;

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
    };

    return (
        <div className="min-h-screen bg-[#F9EFE9] text-[#240747]">
            {/* ── Article Header ── */}
            <header className="pt-32 pb-20 border-b-4 border-[#240747] bg-[#F9EFE9] blog-hero relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <Link href="/blog" className="nb-btn nb-btn-ghost mb-12 inline-flex items-center gap-2 py-2 px-4 text-xs">
                        <ArrowLeft size={14} /> Back to Intel Log
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-8 space-y-8">
                            <div className="flex items-center gap-4">
                                <span className="nb-tag-orange">{post.category || "Artificial Intelligence"}</span>
                                <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] opacity-40">Insight ID: {post.id?.slice(0,8)}</span>
                            </div>
                            
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-8 pt-8 border-t-2 border-[#240747]/10">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl border-2 border-[#240747] overflow-hidden bg-[#F6851B]/10">
                                        {post.author_image ? (
                                            <img src={post.author_image} alt={post.author} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xl font-bold">{post.author?.charAt(0)}</div>
                                        )}
                                    </div>
                                    <div>
                                        <div className="font-black text-lg leading-none mb-1">{post.author || "RootedAI Team"}</div>
                                        <div className="text-[0.65rem] font-bold uppercase tracking-widest opacity-50">{post.author_role || "Strategic Engineer"}</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8 text-[0.7rem] font-bold uppercase tracking-wider opacity-60">
                                    <div className="flex items-center gap-2"><Calendar size={14} className="text-[#F6851B]" /> {new Date(post.published_at).toLocaleDateString()}</div>
                                    <div className="flex items-center gap-2"><Clock size={14} className="text-[#F6851B]" /> {post.read_time}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#F6851B] opacity-5 rounded-full blur-3xl"></div>
            </header>

            {/* ── Main Content ── */}
            <main className="py-20">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Sidebar */}
                        <aside className="hidden lg:block lg:col-span-3">
                            <div className="sticky top-32 space-y-12">
                                <div className="space-y-4">
                                    <h4 className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-[#F6851B]">On this frequency</h4>
                                    <nav className="flex flex-col gap-3">
                                        {toc.map((item: any, idx: number) => (
                                            <a 
                                                key={idx} 
                                                href={`#${item.id}`} 
                                                className={`text-xs font-bold hover:text-[#F6851B] transition-colors leading-tight ${item.level === 'h3' ? 'pl-4 opacity-60' : ''}`}
                                            >
                                                {item.text}
                                            </a>
                                        ))}
                                    </nav>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-[#F6851B]">Broadcast</h4>
                                    <div className="flex gap-2">
                                        <button onClick={handleShare} className="nb-btn nb-btn-ghost p-3 rounded-xl"><Share2 size={16} /></button>
                                        <button className="nb-btn nb-btn-ghost p-3 rounded-xl"><Twitter size={16} /></button>
                                        <button className="nb-btn nb-btn-ghost p-3 rounded-xl"><Linkedin size={16} /></button>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Article body */}
                        <div className="lg:col-span-8">
                            {post.cover_image && (
                                <div className="mb-16 rounded-3xl overflow-hidden border-4 border-[#240747] shadow-[12px_12px_0_#240747]">
                                    <img src={post.cover_image} alt={post.title} className="w-full aspect-video object-cover" />
                                </div>
                            )}

                            <div 
                                className="prose prose-lg max-w-none 
                                    prose-headings:font-black prose-headings:text-[#240747] prose-headings:tracking-tight
                                    prose-p:text-[#240747]/80 prose-p:font-medium prose-p:leading-relaxed
                                    prose-strong:text-[#240747] prose-strong:font-black
                                    prose-a:text-[#F6851B] prose-a:font-black prose-a:no-underline hover:prose-a:underline
                                    prose-blockquote:border-l-8 prose-blockquote:border-[#F6851B] prose-blockquote:bg-[#240747]/5 prose-blockquote:p-8 prose-blockquote:rounded-r-2xl prose-blockquote:font-black prose-blockquote:text-2xl
                                    prose-img:rounded-3xl prose-img:border-4 prose-img:border-[#240747] prose-img:shadow-[8px_8px_0_#F6851B]
                                "
                                dangerouslySetInnerHTML={{ __html: processedContent }}
                            />

                            {/* Author Footer */}
                            <div className="mt-24 p-10 bg-[#240747] rounded-3xl text-[#F9EFE9] flex flex-col md:flex-row gap-8 items-center border-4 border-[#240747] shadow-[16px_16px_0_#F6851B]">
                                <div className="w-24 h-24 rounded-2xl border-4 border-[#F6851B] overflow-hidden flex-shrink-0">
                                    {post.author_image ? (
                                        <img src={post.author_image} alt={post.author} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-3xl font-bold bg-[#F6851B] text-[#240747]">{post.author?.charAt(0)}</div>
                                    )}
                                </div>
                                <div className="space-y-4 text-center md:text-left">
                                    <div>
                                        <h4 className="text-2xl font-black">{post.author || "RootedAI Team"}</h4>
                                        <p className="text-[0.7rem] font-bold uppercase tracking-widest text-[#F6851B]">{post.author_role || "Strategic Engineer"}</p>
                                    </div>
                                    <p className="opacity-70 text-sm leading-relaxed max-w-lg">
                                        Engineering intelligence and solving high-stakes problems across industrial sectors. 
                                        Part of the tactical team at Rooted AI Solutions.
                                    </p>
                                    {post.author_linkedin && (
                                        <a href={post.author_linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-black text-[#F6851B] hover:underline">
                                            Connect on LinkedIn <ArrowRight size={14} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* ── Final CTA ── */}
            <section className="py-24 border-t-4 border-[#240747] bg-[#240747]">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="bg-[#F6851B] border-4 border-[#240747] p-8 md:p-16 relative overflow-hidden shadow-[16px_16px_0_#F9EFE9] rounded-3xl text-[#240747]">
                        <div className="relative z-10 space-y-8 max-w-2xl">
                            <h2 className="text-4xl md:text-6xl font-black leading-none">
                                {post.cta_title || "Ready to scale your intelligence?"}
                            </h2>
                            <p className="text-xl font-medium opacity-80 leading-relaxed">
                                {post.cta_description || "Let's discuss how we can train custom models for your specific enterprise needs."}
                            </p>
                            <div className="pt-4">
                                <a 
                                    href={post.cta_link || "https://wa.me/917904168521"} 
                                    className="nb-btn nb-btn-primary text-xl px-12 py-6 rounded-2xl border-[#240747]"
                                >
                                    {post.cta_button_text || "Book Strategy Call"} <ArrowRight size={24} className="ml-2" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
