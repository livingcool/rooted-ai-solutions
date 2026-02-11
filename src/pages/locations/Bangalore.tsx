import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import Contact from "@/components/Contact";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Cpu, Network, Rocket } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import Breadcrumbs from "@/components/Breadcrumbs";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import TechStackMarquee from "@/components/TechStackMarquee";

const Bangalore = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const faqs = [
        {
            question: "How can AI Agents help Bangalore tech startups?",
            answer: "We deploy autonomous AI agents that handle customer support, lead qualification, and data analysis 24/7, allowing startups to scale without linearly increasing headcount."
        },
        {
            question: "Do you offer enterprise SaaS development in Bangalore?",
            answer: "Yes, we build scalable, multi-tenant SaaS platforms using Next.js and Supabase, tailored for high-growth enterprises in Whitefield, Electronic City, and Koramangala."
        },
        {
            question: "Can you consult on GenAI integration?",
            answer: "Absolutely. We help Bangalore businesses integrate LLMs (like GPT-4, Llama 3) into their existing products to create smart, conversational interfaces and automated workflows."
        }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
            <Seo
                title="AI Agents & Software Company in Bangalore | RootedAI"
                description="RootedAI delivers autonomous AI agents, enterprise SaaS, and engineering intelligence for Bangalore's tech ecosystem. Scale your startup with AI."
                canonical="https://www.rootedai.co.in/locations/bangalore"
                keywords={[
                    "AI Company Bangalore",
                    "Software Development Bangalore",
                    "AI Agents Bangalore",
                    "SaaS Development Bangalore",
                    "Tech Consultants Bangalore",
                    "RootedAI Bangalore",
                    "Electronic City IT Services"
                ]}
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "LocalBusiness",
                    "name": "RootedAI - Bangalore (Coming Soon)",
                    "image": "https://www.rootedai.co.in/og-image.png",
                    "url": "https://www.rootedai.co.in/locations/bangalore",
                    "telephone": "+91-917904168521",
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Bangalore",
                        "addressRegion": "Karnataka",
                        "addressCountry": "IN"
                    },
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": 12.9716,
                        "longitude": 77.5946
                    },
                    "priceRange": "$$",
                    "openingHoursSpecification": {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": [
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday"
                        ],
                        "opens": "09:00",
                        "closes": "18:00"
                    }
                }}
            />

            <div className="relative z-10">
                <Navigation />

                {/* Hero */}
                <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b border-white/5">
                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <div className="mb-8 flex justify-center">
                            <Breadcrumbs />
                        </div>
                        <div className="max-w-4xl mx-auto text-center space-y-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-500 text-sm font-medium animate-fade-down">
                                <MapPin className="w-4 h-4" />
                                <span>Coming Soon to India's Tech Capital</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold font-heading leading-tight animate-fade-up">
                                Engineering Intelligence for <br />
                                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                                    Bangalore
                                </span>
                            </h1>

                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: "0.1s" }}>
                                Building next-gen AI Agents and Enterprise SaaS for the world's fastest-growing tech ecosystem.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
                                <MagneticButton>
                                    <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-purple-500/25 bw-button" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                                        Get Early Access
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </MagneticButton>
                            </div>
                        </div>
                    </div>

                    {/* Background Elements */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none opacity-20 dark:opacity-10">
                        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[100px]" />
                        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-500/30 rounded-full blur-[100px]" />
                    </div>
                </section>

                <RevealOnScroll>
                    <TechStackMarquee />
                </RevealOnScroll>

                {/* Tech Focus Section */}
                <section className="py-20 bg-black/5 dark:bg-white/5">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="p-8 rounded-2xl border border-white/10 bg-background/50 hover:bg-background/80 transition-colors">
                                <Cpu className="w-10 h-10 text-purple-500 mb-4" />
                                <h3 className="text-xl font-bold mb-2">AI Agents</h3>
                                <p className="text-muted-foreground">Autonomous workflows that replace manual ops.</p>
                            </div>
                            <div className="p-8 rounded-2xl border border-white/10 bg-background/50 hover:bg-background/80 transition-colors">
                                <Rocket className="w-10 h-10 text-pink-500 mb-4" />
                                <h3 className="text-xl font-bold mb-2">SaaS Scale</h3>
                                <p className="text-muted-foreground">Multi-tenant architectures built for millions of users.</p>
                            </div>
                            <div className="p-8 rounded-2xl border border-white/10 bg-background/50 hover:bg-background/80 transition-colors">
                                <Network className="w-10 h-10 text-red-500 mb-4" />
                                <h3 className="text-xl font-bold mb-2">System Design</h3>
                                <p className="text-muted-foreground">High-performance backends using Rust and Golang.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Map - Electronic City Placeholder */}
                <section className="py-20">
                    <div className="container mx-auto px-4 md:px-6 text-center">
                        <div className="mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                                Future Home in Electronic City
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                We are establishing our presence in India's silicon valley.
                            </p>
                        </div>
                        <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-500">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124440.3804565706!2d77.5644!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1707761000000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="py-20 bg-black/5 dark:bg-white/5">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-12">
                                Bangalore Tech FAQs
                            </h2>
                            <div className="space-y-8">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="bw-card p-6 md:p-8 rounded-2xl bg-background border border-black/10 dark:border-white/10">
                                        <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <Contact />
                <Footer />
            </div>
        </div>
    );
};

export default Bangalore;
