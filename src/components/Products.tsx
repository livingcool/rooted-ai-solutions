import { useState, useEffect } from "react";
import { ExternalLink, Zap, Clock, MessageSquare, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import { Button } from "@/components/ui/button";

const products = [
    {
        name: "RhizoConnect",
        tagline: "Resolve Internal Tickets in 5 Seconds, Not 48 Hours",
        description:
            "An intelligent internal ticketing system that leverages AI to provide instant solutions to common workplace queries. RhizoConnect uses natural language processing and a knowledge graph to deflect tickets before they even reach your support team, dramatically reducing response times and improving employee productivity.",
        useCases: [
            "IT Support: Password resets, software access requests, VPN troubleshooting",
            "HR Queries: Leave policy, expense claims, payroll questions",
            "Policy FAQs: Company policies, compliance docs, onboarding guides",
        ],
        clientQuote: {
            text: "RhizoConnect cut our IT support tickets by 60%. Our 2-person IT team now handles what used to require 5 people.",
            author: "Logistics Manager, E-commerce Firm",
        },
        features: [
            { icon: Clock, text: "4.8s Avg Resolution" },
            { icon: MessageSquare, text: "60% Ticket Deflection" },
            { icon: Zap, text: "Zero Setup Required" },
        ],
        productUrl: "https://rhizoconnect.rootedai.co.in/",
        productHuntUrl: "https://www.producthunt.com/products/rhizoconnect",
        logoUrl: "/rhizoconnect-logo.png",
        images: [
            { url: "/rhizoconnect-hero.png", alt: "RhizoConnect - Instant Deflection" },
            { url: "/rhizoconnect-feature-1.jpg", alt: "Find Answers Instantly" },
            { url: "/rhizoconnect-feature-2.png", alt: "Auto-create Solutions" },
            { url: "/rhizoconnect-feature-3.jpg", alt: "Track Real Impact" },
        ],
        status: "Live on Product Hunt",
    },
];

const Products = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-play functionality - changes image every 4 seconds
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentImageIndex((prev) => (prev + 1) % products[0].images.length);
                setIsTransitioning(false);
            }, 300);
        }, 4000);

        return () => clearInterval(interval);
    }, [isPaused]);

    const nextImage = () => {
        setIsTransitioning(true);
        setIsPaused(true);
        setTimeout(() => {
            setCurrentImageIndex((prev) => (prev + 1) % products[0].images.length);
            setIsTransitioning(false);
            setTimeout(() => setIsPaused(false), 8000);
        }, 300);
    };

    const prevImage = () => {
        setIsTransitioning(true);
        setIsPaused(true);
        setTimeout(() => {
            setCurrentImageIndex((prev) => (prev - 1 + products[0].images.length) % products[0].images.length);
            setIsTransitioning(false);
            setTimeout(() => setIsPaused(false), 8000);
        }, 300);
    };

    const goToImage = (index: number) => {
        setIsTransitioning(true);
        setIsPaused(true);
        setTimeout(() => {
            setCurrentImageIndex(index);
            setIsTransitioning(false);
            setTimeout(() => setIsPaused(false), 8000);
        }, 300);
    };

    const togglePause = () => {
        setIsPaused(!isPaused);
    };

    return (
        <section id="products" className="py-12 border-t border-black/10 dark:border-white/10">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="text-center mb-8 space-y-2">
                    <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white tracking-tight">
                        Our Products
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-base font-light">
                        Enterprise-grade AI solutions built to transform how organizations operate.
                    </p>
                </div>

                {/* Product Showcase */}
                <div className="max-w-7xl mx-auto px-4">
                    {products.map((product, index) => (
                        <div key={index} className="relative py-20">
                            {/* Decorative Background Energy */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-20 pointer-events-none">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)]" />
                                <div className="absolute top-0 left-0 w-full h-full border-[1px] border-blue-500/5 rounded-[5rem] rotate-3 animate-pulse" />
                            </div>

                            <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
                                {/* Left: Content Card (Layered Behind) */}
                                <div className="lg:col-span-7 order-2 lg:order-1">
                                    <div className="glass-premium relative z-10 p-10 md:p-16 rounded-[3rem] border border-white/10 dark:bg-slate-900/60 backdrop-blur-3xl shadow-2xl">
                                        <div className="space-y-8">
                                            {/* Brand Header */}
                                            <div className="flex items-center gap-6">
                                                <div className="relative group">
                                                    <div className="absolute -inset-2 bg-blue-500/50 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                                                    <img
                                                        src={product.logoUrl}
                                                        alt={product.name}
                                                        className="relative w-16 h-16 object-cover rounded-2xl border border-white/10"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="text-3xl md:text-5xl font-black text-black dark:text-white tracking-tighter">
                                                        {product.name}
                                                    </h3>
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-green-500/10 text-green-500 border border-green-500/20">
                                                        {product.status}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Tagline & Core Story */}
                                            <div className="space-y-4">
                                                <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                                    {product.tagline}
                                                </p>
                                                <p className="text-lg text-muted-foreground leading-relaxed font-light">
                                                    {product.description}
                                                </p>
                                            </div>

                                            {/* High-Impact Stats Grid */}
                                            <div className="grid grid-cols-3 gap-6">
                                                {product.features.map((feature, idx) => (
                                                    <div key={idx} className="group/stat relative bg-white/5 border border-white/5 rounded-2xl p-6 transition-all hover:bg-white/10 hover:border-blue-500/30">
                                                        <feature.icon className="w-6 h-6 text-blue-500 mb-3 group-hover/stat:scale-110 transition-transform" />
                                                        <div className="text-xl font-bold text-black dark:text-white tracking-tight">{feature.text.split(' ')[0]}</div>
                                                        <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                                                            {feature.text.split(' ').slice(1).join(' ')}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Action Bar */}
                                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                                <Button
                                                    onClick={() => window.open(product.productUrl, '_blank')}
                                                    className="h-16 px-10 text-lg rounded-2xl bg-black dark:bg-white dark:text-black hover:scale-[1.02] transition-transform"
                                                >
                                                    Launch Platform
                                                    <ExternalLink className="ml-2 w-5 h-5" />
                                                </Button>
                                                <Button
                                                    onClick={() => window.open(product.productHuntUrl, '_blank')}
                                                    variant="outline"
                                                    className="h-16 px-10 text-lg rounded-2xl border-white/10 hover:bg-white/5"
                                                >
                                                    View Roadmap
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Floating Visual (Layered Above) */}
                                <div className="lg:col-span-5 order-1 lg:order-2 relative lg:-ml-24 z-20">
                                    <div className="relative group perspective-1000">
                                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-2xl group-hover:opacity-40 transition duration-1000" />
                                        
                                        <div className="relative glass-premium p-3 rounded-[3rem] border border-white/10 shadow-2xl transition-all duration-700 group-hover:rotate-y-12">
                                            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem]">
                                                <img
                                                    src={product.images[currentImageIndex].url}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                                                />
                                                
                                                {/* Floating Image Actions */}
                                                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                                    <Button variant="ghost" size="icon" onClick={prevImage} className="text-white hover:bg-white/20 rounded-full"><ChevronLeft className="w-5 h-5" /></Button>
                                                    <div className="text-xs font-mono text-white px-2">0{currentImageIndex + 1} / 0{product.images.length}</div>
                                                    <Button variant="ghost" size="icon" onClick={nextImage} className="text-white hover:bg-white/20 rounded-full"><ChevronRight className="w-5 h-5" /></Button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Floating Thumbnail Bar (Creative Element) */}
                                        <div className="absolute top-1/2 -right-12 -translate-y-1/2 flex flex-col gap-4">
                                            {product.images.map((img, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => goToImage(idx)}
                                                    className={`w-3 h-12 rounded-full transition-all duration-500 border ${
                                                        idx === currentImageIndex 
                                                        ? 'bg-blue-500 border-blue-400 h-16' 
                                                        : 'bg-white/10 border-white/5 hover:bg-white/30'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <div className="glass-premium p-8 md:p-12 max-w-3xl mx-auto">
                        <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-4">
                            Want to build your own AI-powered solution?
                        </h3>
                        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                            Let's discuss how RootedAI can create custom enterprise solutions tailored to your organization's needs.
                        </p>
                        <button
                            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                            className="px-8 py-3 bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black font-semibold rounded-lg dark:hover:bg-white/90 transition-all duration-300"
                        >
                            Get in Touch
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Products;
