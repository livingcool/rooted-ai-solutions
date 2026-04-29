'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Calendar, Clock, User, Facebook, Twitter, Linkedin, Copy, Mail, Send } from "lucide-react";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function BlogPostPage() {
    const { slug } = useParams();
    const router = useRouter();
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [processedContent, setProcessedContent] = useState("");
    const [toc, setToc] = useState<any[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
        }
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
                router.replace("/blog");
            } else {
                setPost(data);
                processContent((data as any).content);
            }
        } catch (error) {
            console.error('Error:', error);
            router.replace("/blog");
        } finally {
            setLoading(false);
        }
    };

    const processContent = (htmlContent: string) => {
        if (!htmlContent) return;

        let cleanHtml = htmlContent.replace(/MetaTitle\s*:.*?(<br>|<\/p>)/i, '').replace(/MetaDescription\s*:.*?(<br>|<\/p>)/i, '');

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

            tocItems.push({
                id,
                text,
                level: heading.tagName.toLowerCase()
            });
        });

        setProcessedContent(doc.body.innerHTML);
        setToc(tocItems);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white"></div>
            </div>
        );
    }

    if (!post) return null;

    const handleShare = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard!");
        }
    };

    return (
        <div className="min-h-screen relative bg-white dark:bg-black">
            <Seo
                title={`${post.title} | RootedAI Blog`}
                description={post.excerpt}
                canonical={`https://www.rootedai.co.in/blog/${post.slug}`}
                ogImage={post.cover_image}
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    "headline": post.title,
                    "description": post.excerpt,
                    "image": post.cover_image,
                    "url": `https://www.rootedai.co.in/blog/${post.slug}`,
                    "datePublished": post.created_at,
                    "author": {
                        "@type": "Organization",
                        "name": "RootedAI Solutions",
                        "url": "https://www.rootedai.co.in"
                    },
                    "publisher": {
                        "@type": "Organization",
                        "name": "RootedAI Solutions",
                        "url": "https://www.rootedai.co.in",
                        "logo": {
                            "@type": "ImageObject",
                            "url": "https://www.rootedai.co.in/logo.png"
                        }
                    }
                }}
            />
            <div className="relative z-10">
                <header className="pt-32 pb-20 relative bg-white dark:bg-zinc-950 text-foreground border-b border-zinc-100 dark:border-zinc-800">
                    <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                        <Link href="/blog" className="inline-flex items-center text-sm text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors mb-8 group">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Insights
                        </Link>

                        <div className="space-y-6 max-w-4xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 text-xs font-bold uppercase tracking-wider">
                                {post.category || "Artificial Intelligence"}
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight leading-tight text-zinc-900 dark:text-white">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-900">
                                <div className="flex items-center gap-3">
                                    {post.author_image ? (
                                        <img
                                            src={post.author_image}
                                            alt={post.author}
                                            className="w-12 h-12 rounded-full object-cover border border-zinc-200 dark:border-zinc-800"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center overflow-hidden">
                                            <User className="w-6 h-6 text-zinc-400 dark:text-zinc-600" />
                                        </div>
                                    )}

                                    <div>
                                        <div className="mb-0.5">
                                            {post.author_linkedin ? (
                                                <a href={post.author_linkedin} target="_blank" rel="noopener noreferrer" className="font-bold text-base text-zinc-900 dark:text-white leading-none hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group/author">
                                                    {post.author || "RootedAI Team"}
                                                    <Linkedin className="w-3 h-3 text-zinc-400 group-hover/author:text-blue-500 transition-colors" />
                                                </a>
                                            ) : (
                                                <div className="font-bold text-base text-zinc-900 dark:text-white leading-none">
                                                    {post.author || "RootedAI Team"}
                                                </div>
                                            )}
                                        </div>

                                        {post.author_role && (
                                            <div className="text-xs text-zinc-500 font-medium mb-1">
                                                {post.author_role}
                                            </div>
                                        )}

                                        <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                                            <span>{new Date(post.published_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                            <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                                            <span>{post.read_time}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <article className="py-16 md:py-24">
                    <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            <aside className="hidden lg:block lg:col-span-3">
                                <div className="sticky top-32 space-y-4">
                                    <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-l-4 border-blue-600 pl-3">
                                        In this Post
                                    </p>
                                    <nav className="flex flex-col space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                                        {toc.map((item: any, idx: number) => (
                                            <a
                                                key={idx}
                                                href={`#${item.id}`}
                                                className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2 ${item.level === 'h3' ? 'pl-4' : ''}`}
                                            >
                                                {item.text}
                                            </a>
                                        ))}
                                    </nav>

                                    <div className="pt-8 mt-8 border-t border-zinc-200 dark:border-zinc-800">
                                        <p className="text-xs font-semibold mb-3 text-muted-foreground">SHARE</p>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="icon" onClick={handleShare} className="rounded-full w-8 h-8">
                                                <Copy className="w-4 h-4" />
                                            </Button>
                                            <Button variant="outline" size="icon" className="rounded-full w-8 h-8 text-blue-500 hover:text-blue-600">
                                                <Twitter className="w-4 h-4" />
                                            </Button>
                                            <Button variant="outline" size="icon" className="rounded-full w-8 h-8 text-blue-700 hover:text-blue-800">
                                                <Linkedin className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="pt-8 mt-8 border-t border-zinc-200 dark:border-zinc-800">
                                        <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                                            <h4 className="font-bold mb-2 flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-blue-600" />
                                                Stay Updated
                                            </h4>
                                            <p className="text-xs text-muted-foreground mb-4">Get the latest AI insights delivered to your inbox.</p>
                                            <div className="space-y-2">
                                                <Input
                                                    placeholder="Enter your email"
                                                    className="h-9 text-xs bg-white dark:bg-black"
                                                />
                                                <Button className="w-full h-9 text-xs gap-2" onClick={() => toast.success("Subscribed successfully!")}>
                                                    Subscribe
                                                    <Send className="w-3 h-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </aside>

                            <div className="lg:col-span-8 lg:col-start-4">
                                <div
                                    className="prose prose-lg dark:prose-invert max-w-none 
                                        font-sans
                                        prose-headings:font-heading prose-headings:font-bold prose-headings:text-zinc-900 dark:prose-headings:text-zinc-50
                                        prose-p:leading-relaxed prose-p:text-zinc-700 dark:prose-p:text-zinc-300 prose-p:mb-6
                                        prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                                        prose-li:text-zinc-700 dark:prose-li:text-zinc-300
                                        prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-10"
                                    dangerouslySetInnerHTML={{ __html: processedContent }}
                                />

                                <div className="lg:hidden mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
                                    <h4 className="text-lg font-bold mb-4">Share this insight</h4>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="icon" onClick={handleShare} className="rounded-full">
                                            <Copy className="w-4 h-4" />
                                        </Button>
                                        <Button variant="outline" size="icon" className="rounded-full text-blue-500">
                                            <Twitter className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="mt-20 bg-zinc-950 dark:bg-zinc-900 text-white p-8 md:p-12 rounded-3xl relative overflow-hidden group shadow-2xl">
                                    <div className="relative z-10 space-y-6">
                                        <h3 className="text-2xl md:text-3xl font-heading font-bold">
                                            {post.cta_title || "Ready to stop drowning in manual work?"}
                                        </h3>
                                        <p className="text-zinc-400 max-w-lg">
                                            {post.cta_description || "Book a free strategy session to see which of your workflows can be fully autonomous in just 2 weeks."}
                                        </p>
                                        <Button
                                            size="lg"
                                            className="bg-white text-black hover:bg-zinc-200 hover:scale-105 transition-all font-bold px-8 rounded-full"
                                            onClick={() => window.open(post.cta_link || "https://wa.me/917904168521", "_blank")}
                                        >
                                            {post.cta_button_text || "Book Strategy Call"}
                                        </Button>
                                    </div>
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}
