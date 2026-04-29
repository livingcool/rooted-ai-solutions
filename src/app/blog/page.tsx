'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, User, ChevronRight, Mail, Sparkles } from "lucide-react";
import { useModal } from "@/context/ModalContext";

export default function BlogListing() {
    const { openLeadModal } = useModal();
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const { data, error } = await supabase
                .from('blog_posts' as any)
                .select('*')
                .order('published_at', { ascending: false });

            if (error) console.error('Error fetching blog posts:', error);
            else setPosts(data || []);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const featuredPost = posts[0];
    const otherPosts = posts.slice(1);

    return (
        <div className="min-h-screen bg-[#F9EFE9]">
            {/* ── Blog Header ── */}
            <section className="pt-32 pb-20 border-b-4 border-[#240747] blog-hero">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="nb-tag-orange px-4 py-1.5 flex items-center gap-2 rounded-full border-2 border-[#240747] shadow-[2px_2px_0_#240747]">
                            <Sparkles size={14} />
                            <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase">Intelligence Log v2.0</span>
                        </div>
                        <h1 className="nb-headline-xl text-[#240747]">
                            Engineering <br />
                            <span className="text-[#F6851B]">Intelligence.</span>
                        </h1>
                        <p className="max-w-2xl text-lg md:text-xl font-medium text-[#240747]/70 leading-relaxed">
                            Strategic thinking at the intersection of global model training, 
                            AI outsourcing, and enterprise-scale software architectures.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Featured Insight ── */}
            {featuredPost && !loading && (
                <section className="py-20 bg-[#240747]">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="mb-12 flex items-center justify-between">
                            <h2 className="nb-headline-lg text-[#F9EFE9]">Featured Insight</h2>
                            <div className="hidden md:block h-1 flex-1 mx-12 bg-[#F6851B]/30 rounded-full" />
                        </div>
                        
                        <Link href={`/blog/${featuredPost.slug}`} className="block group">
                            <div className="blog-featured-card bg-[#F9EFE9]">
                                <div className="relative aspect-[16/10] md:aspect-auto h-full overflow-hidden border-b-4 md:border-b-0 md:border-r-4 border-[#240747]">
                                    <img 
                                        src={featuredPost.cover_image || "/og-image.png"} 
                                        alt={featuredPost.title}
                                        className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                    />
                                    <div className="blog-category-tag">{featuredPost.category}</div>
                                </div>
                                <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
                                    <div className="flex items-center gap-6 text-[0.7rem] font-bold text-[#240747]/60 uppercase tracking-widest">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="text-[#F6851B]" />
                                            {new Date(featuredPost.published_at).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock size={14} className="text-[#F6851B]" />
                                            {featuredPost.read_time}
                                        </div>
                                    </div>
                                    <h3 className="text-3xl md:text-5xl font-black leading-[1.1] text-[#240747] group-hover:text-[#F6851B] transition-colors">
                                        {featuredPost.title}
                                    </h3>
                                    <p className="text-[#240747]/80 text-lg leading-relaxed line-clamp-3">
                                        {featuredPost.excerpt}
                                    </p>
                                    <div className="pt-6">
                                        <div className="nb-btn nb-btn-primary group-hover:translate-x-2 transition-transform">
                                            Read Investigation <ArrowRight size={18} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>
            )}

            {/* ── Latest Insights Grid ── */}
            <section className="py-24">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-4">
                            <span className="nb-label-orange">Latest Updates</span>
                            <h2 className="nb-headline-lg text-[#240747]">Operational Intelligence</h2>
                        </div>
                        <div className="flex gap-3">
                            {["Model Training", "AI Outsourcing", "Software Services", "LLMs"].map(tag => (
                                <button key={tag} className="px-4 py-2 border-2 border-[#240747] font-bold text-[0.7rem] uppercase tracking-wider hover:bg-[#F6851B] transition-colors">
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-[500px] bg-[#F0DCC8] animate-pulse border-3 border-[#240747] rounded-2xl" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {otherPosts.map((post) => (
                                <Link href={`/blog/${post.slug}`} key={post.id} className="block group">
                                    <div className="blog-grid-card">
                                        <div className="blog-image-wrapper">
                                            <img 
                                                src={post.cover_image || "/og-image.png"} 
                                                alt={post.title}
                                                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                                            />
                                            <div className="blog-category-tag">{post.category}</div>
                                        </div>
                                        <div className="p-8 flex flex-col flex-1 space-y-4">
                                            <div className="flex items-center justify-between text-[0.65rem] font-bold text-[#240747]/50 uppercase tracking-widest">
                                                <span>{new Date(post.published_at).toLocaleDateString()}</span>
                                                <span className="flex items-center gap-1"><Clock size={12} /> {post.read_time}</span>
                                            </div>
                                            <h3 className="text-xl font-bold leading-snug text-[#240747] group-hover:text-[#F6851B] transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-sm text-[#240747]/70 leading-relaxed line-clamp-3">
                                                {post.excerpt}
                                            </p>
                                            <div className="pt-4 mt-auto flex items-center justify-between border-t-2 border-[#240747]/5">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full border-2 border-[#240747] overflow-hidden bg-[#F0DCC8]">
                                                        {post.author_image ? (
                                                            <img src={post.author_image} alt={post.author} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center bg-[#240747] text-[#F9EFE9] text-[0.6rem]">
                                                                {post.author?.charAt(0)}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <span className="text-[0.7rem] font-bold text-[#240747]">{post.author}</span>
                                                </div>
                                                <ChevronRight className="text-[#F6851B] group-hover:translate-x-1 transition-transform" size={20} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ── Newsletter Section ── */}
            <section className="py-24 border-t-4 border-[#240747]">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="bg-[#F6851B] border-4 border-[#240747] p-8 md:p-16 relative overflow-hidden shadow-[16px_16px_0_#240747] rounded-3xl">
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <h2 className="text-4xl md:text-5xl font-black text-[#240747] leading-none">
                                    Strategic <br /> Updates.
                                </h2>
                                <p className="text-[#240747] font-medium opacity-90">
                                    Join 2,000+ operations leaders receiving our bi-weekly 
                                    breakdown of AI deployments that actually work.
                                </p>
                            </div>
                            <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                                <input 
                                    type="email" 
                                    placeholder="your@enterprise.com" 
                                    className="flex-1 bg-[#F9EFE9] border-3 border-[#240747] px-6 py-4 font-bold text-[#240747] focus:outline-none focus:bg-white transition-colors rounded-xl shadow-[4px_4px_0_#240747]"
                                />
                                <button 
                                    onClick={openLeadModal}
                                    className="nb-btn nb-btn-inverted rounded-xl"
                                >
                                    Join <ArrowRight size={20} />
                                </button>
                            </form>
                        </div>
                        {/* Decorative Icons */}
                        <div className="absolute top-4 right-4 opacity-10 rotate-12">
                            <Mail size={120} strokeWidth={3} />
                        </div>
                        <div className="absolute -bottom-8 -left-8 opacity-10 -rotate-12">
                            <Sparkles size={160} strokeWidth={3} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
