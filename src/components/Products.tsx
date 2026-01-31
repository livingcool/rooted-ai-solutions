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
                <div className="max-w-6xl mx-auto">
                    {products.map((product, index) => (
                        <div key={index} className="space-y-8">
                            {/* Main Product Card */}
                            <TiltCard className="bw-card p-4 md:p-6 group hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-500">
                                <div className="grid lg:grid-cols-2 gap-6 items-center">
                                    {/* Left: Product Info */}
                                    <div className="space-y-4">
                                        {/* Mobile: Status Pill above */}
                                        <div className="md:hidden inline-flex items-center gap-2 px-2 py-1 bg-black/5 dark:bg-white/5 rounded-full border border-black/5 dark:border-white/5 w-fit">
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                            <span className="text-[10px] uppercase tracking-wider font-semibold text-black/60 dark:text-white/60">{product.status}</span>
                                        </div>

                                        {/* Header Row: Logo, Title */}
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={product.logoUrl}
                                                    alt={`${product.name} Logo`}
                                                    className="w-12 h-12 object-cover rounded-xl border border-black/10 dark:border-white/10"
                                                />
                                                <div>
                                                    <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white leading-tight">
                                                        {product.name}
                                                    </h3>
                                                    {/* Desktop: Status below */}
                                                    <div className="hidden md:flex items-center gap-2 mt-1">
                                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                                        <span className="text-[10px] uppercase tracking-wider font-semibold text-black/60 dark:text-white/60">{product.status}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Tagline & Description */}
                                        <div>
                                            <p className="text-base font-medium text-black/80 dark:text-white/80 mb-2">
                                                {product.tagline}
                                            </p>
                                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                                                {product.description}
                                            </p>
                                        </div>

                                        {/* Features - Horizontal Grid */}
                                        <div className="grid grid-cols-3 gap-2">
                                            {product.features.map((feature, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex flex-col items-center justify-center text-center gap-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg p-2"
                                                >
                                                    <feature.icon className="w-4 h-4 text-black/70 dark:text-white/70" />
                                                    <span className="text-[10px] font-medium leading-tight text-muted-foreground">
                                                        {feature.text}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Use Cases - Inline */}
                                        <div className="text-xs text-muted-foreground border-l-2 border-black/10 dark:border-white/10 pl-3">
                                            <span className="font-semibold text-black/80 dark:text-white/80 mr-1">Best for:</span>
                                            {product.useCases.map(u => u.split(":")[0]).join(", ")}
                                        </div>

                                        {/* Quote - Compact */}
                                        <div className="text-xs italic text-black/60 dark:text-white/60 bg-black/5 dark:bg-white/5 p-3 rounded-lg border border-black/5 dark:border-white/5">
                                            "{product.clientQuote.text}"
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-3 pt-1">
                                            <a
                                                href={product.productUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black text-sm font-semibold rounded-lg transition-all"
                                            >
                                                Launch
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                            <a
                                                href={product.productHuntUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#ff6154] text-white text-sm font-semibold rounded-lg hover:bg-[#ff6154]/90 transition-all"
                                            >
                                                Product Hunt
                                            </a>
                                        </div>
                                    </div>

                                    {/* Right: Image Carousel */}
                                    <div className="space-y-3">
                                        <div
                                            className="relative aspect-video rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5"
                                        >
                                            <div
                                                className={`w-full h-full transition-all duration-500`}
                                            >
                                                <img
                                                    src={product.images[currentImageIndex].url}
                                                    alt={product.images[currentImageIndex].alt}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            {/* Navigation Overlay */}
                                            <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
                                                <Button variant="ghost" size="icon" onClick={prevImage} className="h-8 w-8 bg-black/20 hover:bg-black/40 text-white rounded-full"><ChevronLeft className="w-4 h-4" /></Button>
                                                <Button variant="ghost" size="icon" onClick={nextImage} className="h-8 w-8 bg-black/20 hover:bg-black/40 text-white rounded-full"><ChevronRight className="w-4 h-4" /></Button>
                                            </div>
                                        </div>

                                        {/* Thumbnails - Smaller */}
                                        <div className="grid grid-cols-4 gap-2">
                                            {product.images.map((img, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => goToImage(idx)}
                                                    className={`aspect-video rounded-md overflow-hidden border transition-all duration-300 ${idx === currentImageIndex
                                                        ? "border-black dark:border-white opacity-100"
                                                        : "border-transparent opacity-50 hover:opacity-100"
                                                        }`}
                                                >
                                                    <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </TiltCard>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <div className="bw-card p-8 md:p-12 max-w-3xl mx-auto bg-gradient-to-b from-black/5 to-transparent dark:from-white/5">
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
