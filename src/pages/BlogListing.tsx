import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
// import { blogPosts } from "@/data/blogPosts"; // Deprecated
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import Seo from "@/components/Seo";
import TiltCard from "@/components/ui/TiltCard";

const BlogListing = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
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

    return (
        <div className="min-h-screen relative">
            <Seo
                title="RootedAI Insights - Blog"
                description="Expert insights on AI scaling, automation strategies, and the future of work."
                keywords={["AI Blog", "Automation Insights", "Business Scaling", "Tech Blog"]}
            />
            <div className="relative z-10">
                <Navigation />

                <section className="pt-32 pb-20 relative overflow-hidden bg-black/5 dark:bg-white/5 border-b border-black/10 dark:border-white/10">
                    <div className="container mx-auto px-4 md:px-6 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 mb-6 font-medium text-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Latest Insights
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                            The Intelligence Log
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Strategic thinking on how to scale your business with Artificial Intelligence.
                        </p>
                    </div>
                </section>

                <section className="py-24 relative">
                    <div className="container mx-auto px-4 md:px-6">
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white"></div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {posts.map((post) => (
                                    <Link to={`/blog/${post.slug}`} key={post.id} className="block group h-full">
                                        <TiltCard className="h-full flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                                            <div className="aspect-video relative overflow-hidden">
                                                <img
                                                    src={post.cover_image || "/og-image.png"}
                                                    alt={post.title}
                                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute top-4 left-4 bg-black/80 dark:bg-white/80 text-white dark:text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                                                    {post.category}
                                                </div>
                                            </div>

                                            <div className="p-6 flex flex-col flex-1">
                                                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {new Date(post.published_at).toLocaleDateString()}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {post.read_time}
                                                    </div>
                                                </div>

                                                <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                    {post.title}
                                                </h3>

                                                <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                                                    {post.excerpt}
                                                </p>

                                                <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-4 mt-auto">
                                                    <div className="flex items-center gap-2 text-sm font-medium">
                                                        {post.author_image ? (
                                                            <img
                                                                src={post.author_image}
                                                                alt={post.author}
                                                                className="w-6 h-6 rounded-full object-cover border border-zinc-200 dark:border-zinc-800"
                                                            />
                                                        ) : (
                                                            <span className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                                                                <User className="w-3 h-3" />
                                                            </span>
                                                        )}
                                                        {post.author}
                                                    </div>
                                                    <span className="flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                                                        Read Now <ArrowRight className="ml-1 w-4 h-4" />
                                                    </span>
                                                </div>
                                            </div>
                                        </TiltCard>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                <Footer />
            </div>
        </div>
    );
};

export default BlogListing;
