import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogPosts";
import { ArrowLeft, Calendar, Clock, User, Facebook, Twitter, Linkedin, Copy } from "lucide-react";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const BlogPost = () => {
    const { slug } = useParams();
    const post = blogPosts.find((p) => p.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
    };

    return (
        <div className="min-h-screen relative bg-white dark:bg-black">
            <Seo
                title={`${post.title} | RootedAI Blog`}
                description={post.excerpt}
                ogImage={post.coverImage}
            />
            <div className="relative z-10">
                <Navigation />

                {/* Hero / Header */}
                <header className="pt-32 pb-16 relative border-b border-black/5 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-900/20 backdrop-blur-sm">
                    <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                        <Link to="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-black dark:hover:text-white transition-colors mb-8 group">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Insights
                        </Link>

                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
                                {post.category}
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black dark:text-white leading-tight">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-t border-black/10 dark:border-white/10 pt-6 mt-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                                        <User className="w-4 h-4 text-black dark:text-white" />
                                    </div>
                                    <span className="font-medium text-black dark:text-white">{post.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {post.date}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    {post.readTime}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <article className="py-16 md:py-24">
                    <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                        {/* Main Content */}
                        <div
                            className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:underline prose-img:rounded-xl max-w-none"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Engagement Trap / Share */}
                        <div className="mt-16 pt-8 border-t border-black/10 dark:border-white/10">
                            <h4 className="text-lg font-bold mb-4">Share this insight</h4>
                            <div className="flex gap-2">
                                <Button variant="outline" size="icon" onClick={handleShare} className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                    <Copy className="w-4 h-4" />
                                </Button>
                                {/* Placeholders for social share buttons functioning as generic links for demo */}
                                <Button variant="outline" size="icon" className="rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400">
                                    <Twitter className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300">
                                    <Linkedin className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        {/* CTA Box */}
                        <div className="mt-16 bg-zinc-950 dark:bg-white text-white dark:text-black p-8 md:p-12 rounded-3xl relative overflow-hidden group">
                            <div className="relative z-10 text-center space-y-6">
                                <h3 className="text-2xl md:text-3xl font-bold">Ready to stop drowning in manual work?</h3>
                                <p className="text-zinc-400 dark:text-zinc-600 max-w-lg mx-auto">
                                    Book a free strategy session to see which of your workflows can be fully autonomous in just 2 weeks.
                                </p>
                                <Button
                                    size="lg"
                                    className="bg-white text-black hover:bg-zinc-200 dark:bg-black dark:text-white dark:hover:bg-zinc-800 font-bold px-8 rounded-full"
                                    onClick={() => window.open("https://wa.me/917904168521", "_blank")}
                                >
                                    Book Strategy Call
                                </Button>
                            </div>

                            {/* Decorative */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />
                        </div>
                    </div>
                </article>

                <Footer />
            </div>
        </div>
    );
};

export default BlogPost;
