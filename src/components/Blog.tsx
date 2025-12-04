import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Clock,
  ArrowRight,
  TrendingUp,
  Brain,
  Workflow,
  BarChart3
} from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI Automation in Indian SMEs",
      excerpt: "Exploring how AI automation is transforming small and medium enterprises across India, with real case studies and implementation strategies.",
      category: "Industry Insights",
      readTime: "8 min read",
      date: "Jan 15, 2025",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
      tags: ["AI", "SME", "India", "Automation"],
      link: "https://profiletree.com/smes-successfully-implementing-ai-solutions/"
    },
    {
      id: 2,
      title: "Building RAG-Powered Chatbots: A Complete Guide",
      excerpt: "Step-by-step guide to implementing Retrieval-Augmented Generation chatbots that understand context and provide personalized responses.",
      category: "Technical Guide",
      readTime: "12 min read",
      date: "Jan 10, 2025",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop",
      tags: ["RAG", "Chatbots", "AI", "Development"],
      link: "https://realpython.com/build-llm-rag-chatbot-with-langchain/"
    },
    {
      id: 3,
      title: "Voice Automation in Regional Languages",
      excerpt: "How we achieved 85% accuracy in Tamil voice transcription and what it means for multilingual automation in India.",
      category: "Case Study",
      readTime: "6 min read",
      date: "Jan 8, 2025",
      image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=600&h=400&fit=crop",
      tags: ["Voice AI", "Tamil", "Regional Languages"],
      link: "https://www.sarvam.ai/apis/text-to-speech"
    },
    {
      id: 4,
      title: "ROI Metrics for AI Automation Projects",
      excerpt: "Understanding the key performance indicators and measurement frameworks for evaluating AI automation success.",
      category: "Business Strategy",
      readTime: "10 min read",
      date: "Jan 5, 2025",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      tags: ["ROI", "Metrics", "Business Strategy"],
      link: "https://propeller.com/blog/measuring-ai-roi-how-to-build-an-ai-strategy-that-captures-business-value"
    },
    {
      id: 5,
      title: "Government AI Projects: Lessons Learned",
      excerpt: "Insights from our pilot project with Tamil Nadu Government and what we learned about implementing AI in public sector.",
      category: "Government",
      readTime: "7 min read",
      date: "Jan 2, 2025",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
      tags: ["Government", "Public Sector", "AI Implementation"],
      link: "https://www2.deloitte.com/us/en/insights/industry/public-sector/use-of-ai-in-government.html"
    },
    {
      id: 6,
      title: "n8n vs Zapier: Choosing the Right Automation Platform",
      excerpt: "Comprehensive comparison of automation platforms and when to choose each one for your business workflows.",
      category: "Platform Comparison",
      readTime: "9 min read",
      date: "Dec 28, 2024",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      tags: ["n8n", "Zapier", "Workflow", "Comparison"],
      link: "https://n8n.io/vs/zapier/"
    }
  ];

  const categories = [
    { name: "All", icon: BarChart3 },
    { name: "Industry Insights", icon: TrendingUp },
    { name: "Technical Guide", icon: Brain },
    { name: "Case Study", icon: Workflow },
  ];

  return (
    <section className="py-24 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6">

        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Insights
            </h2>
            <p className="text-white/60 max-w-xl text-lg font-light">
              Latest trends, technical guides, and real-world insights from the world of AI automation.
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={index === 0 ? "default" : "outline"}
              className={`${index === 0
                ? "bg-white text-black hover:bg-white/90"
                : "bg-transparent border-white/20 text-white hover:bg-white/10"
                } rounded-full px-6`}
            >
              <category.icon className="w-4 h-4 mr-2" />
              {category.name}
            </Button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="mb-16 border border-white/10 group hover:border-white/20 transition-colors duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="relative h-64 lg:h-auto overflow-hidden">
              <img
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white text-black px-3 py-1 text-xs font-bold uppercase tracking-widest">Featured</span>
              </div>
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center space-y-6 bg-black">
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-xs text-white/40 uppercase tracking-widest">
                  <span className="text-white">{blogPosts[0].category}</span>
                  <span>•</span>
                  <span>{blogPosts[0].readTime}</span>
                  <span>•</span>
                  <span>{blogPosts[0].date}</span>
                </div>

                <h3 className="text-3xl font-bold text-white leading-tight group-hover:text-white/90 transition-colors">
                  {blogPosts[0].title}
                </h3>

                <p className="text-white/60 leading-relaxed text-lg font-light">
                  {blogPosts[0].excerpt}
                </p>

                <div className="flex flex-wrap gap-2">
                  {blogPosts[0].tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="text-xs font-mono text-white/40 border border-white/10 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <a href={blogPosts[0].link} target="_blank" rel="noopener noreferrer" className="inline-block pt-4">
                <Button className="bw-button group">
                  Read Full Article
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Blog Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {blogPosts.slice(1).map((post) => (
              <CarouselItem key={post.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="h-full border border-white/10 group hover:border-white/30 transition-colors duration-300 flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-black/80 backdrop-blur-sm text-white border border-white/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow space-y-4 bg-black">
                    <div className="flex items-center space-x-3 text-[10px] text-white/40 uppercase tracking-widest">
                      <span>{post.readTime}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white line-clamp-2 group-hover:underline decoration-white/30 underline-offset-4 transition-all">
                      {post.title}
                    </h3>

                    <p className="text-sm text-white/60 line-clamp-3 leading-relaxed font-light flex-grow">
                      {post.excerpt}
                    </p>

                    <div className="pt-4 mt-auto">
                      <a href={post.link} target="_blank" rel="noopener noreferrer" className="block">
                        <Button
                          variant="ghost"
                          className="w-full justify-between text-white hover:bg-white/10 hover:text-white p-0 h-auto font-normal"
                        >
                          Read More
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end gap-4 mt-8">
            <CarouselPrevious className="static translate-y-0 bg-transparent border-white/20 text-white hover:bg-white hover:text-black" />
            <CarouselNext className="static translate-y-0 bg-transparent border-white/20 text-white hover:bg-white hover:text-black" />
          </div>
        </Carousel>

        {/* Newsletter Signup */}
        <div className="mt-24 p-8 md:p-16 border border-white/10 bg-white/5 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Stay Updated
          </h3>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8 font-light">
            Get the latest AI automation insights, case studies, and technical guides delivered to your inbox weekly.
          </p>

          <form onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const formData = new FormData(form);
            const email = formData.get('email') as string;

            try {
              const { supabase } = await import('@/integrations/supabase/client');
              const { error } = await supabase
                .from('newsletter_subscriptions')
                .insert([{ email }]);

              if (error) {
                const { toast } = await import('@/hooks/use-toast');
                toast({
                  title: "Error",
                  description: error.message.includes('duplicate') ? "You're already subscribed!" : "Something went wrong. Please try again.",
                  variant: "destructive",
                });
              } else {
                // Trigger welcome email
                const { error: funcError } = await supabase.functions.invoke('send-subscription-email', {
                  body: { email },
                });

                if (funcError) {
                  console.error("Edge Function Error:", funcError);
                }

                const { toast } = await import('@/hooks/use-toast');
                toast({
                  title: "Successfully subscribed!",
                  description: "Thank you for subscribing to our newsletter.",
                });
                form.reset();
              }
            } catch (error) {
              console.error('Newsletter subscription error:', error);
            }
          }} className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email address"
              className="w-full px-4 py-3 bg-black border border-white/20 text-white placeholder:text-white/20 focus:border-white focus:outline-none transition-colors"
            />
            <Button type="submit" className="w-full sm:w-auto bw-button px-8">
              Subscribe
            </Button>
          </form>
          <p className="text-xs text-white/30 mt-4">
            No spam, unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Blog;