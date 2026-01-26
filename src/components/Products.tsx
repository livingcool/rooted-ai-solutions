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
        <section id="products" className="py-16 border-t border-black/10 dark:border-white/10">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tight">
                        Our Products
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-light">
                        Enterprise-grade AI solutions built to transform how organizations operate.
                    </p>
                </div>

                {/* Product Showcase */}
                <div className="max-w-7xl mx-auto">
                    {products.map((product, index) => (
                        <div key={index} className="space-y-8">
                            {/* Main Product Card */}
                            <TiltCard className="bw-card p-6 md:p-8 group hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-500">
                                <div className="grid lg:grid-cols-2 gap-8 items-center">
                                    {/* Left: Product Info */}
                                    <div className="space-y-6">
                                        {/* Logo & Status */}
                                        <div className="flex items-center gap-6">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/5 dark:from-white/20 dark:to-white/5 rounded-2xl blur-xl transition-all duration-500" />
                                                <img
                                                    src={product.logoUrl}
                                                    alt={`${product.name} Logo`}
                                                    className="relative w-16 h-16 object-cover rounded-2xl border border-black/10 dark:border-white/10"
                                                />
                                            </div>
                                            <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-2 rounded-full">
                                                <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse" />
                                                <span className="text-xs text-black/80 dark:text-white/80 font-medium">{product.status}</span>
                                            </div>
                                        </div>

                                        {/* Title & Tagline */}
                                        <div className="space-y-3">
                                            <h3 className="text-2xl md:text-4xl font-bold text-black dark:text-white group-hover:translate-x-1 transition-transform duration-300">
                                                {product.name}
                                            </h3>
                                            <p className="text-lg md:text-xl text-black/70 dark:text-white/70 font-medium leading-tight">
                                                {product.tagline}
                                            </p>
                                        </div>

                                        {/* Description */}
                                        <p className="text-muted-foreground leading-relaxed text-base">
                                            {product.description}
                                        </p>

                                        {/* Use Cases */}
                                        <div className="space-y-2">
                                            <div className="text-sm font-semibold text-black/90 dark:text-white/90">Use Cases:</div>
                                            <div className="space-y-2">
                                                {product.useCases.map((useCase, idx) => (
                                                    <div key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                                                        <span className="text-muted-foreground opacity-50">•</span>
                                                        <span>{useCase}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Features */}
                                        <div className="grid grid-cols-1 gap-3">
                                            {product.features.map((feature, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center gap-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg px-4 py-3 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors duration-300"
                                                >
                                                    <feature.icon className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                                                    <span className="text-sm text-black/80 dark:text-white/80 font-medium">
                                                        {feature.text}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Client Quote */}
                                        <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg p-4">
                                            <div className="text-2xl text-black/20 dark:text-white/20 mb-2">"</div>
                                            <p className="text-sm text-black/80 dark:text-white/80 italic mb-3">
                                                {product.clientQuote.text}
                                            </p>
                                            <div className="text-xs text-muted-foreground">
                                                — {product.clientQuote.author}
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                            <a
                                                href={product.productUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black font-semibold rounded-lg dark:hover:bg-white/90 transition-all duration-300 group/btn"
                                            >
                                                Launch Product
                                                <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                                            </a>

                                            <a
                                                href={product.productHuntUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#ff6154] text-white font-semibold rounded-lg hover:bg-[#ff6154]/90 transition-all duration-300 group/btn"
                                            >
                                                <svg className="w-5 h-5" viewBox="0 0 40 40" fill="none">
                                                    <path
                                                        d="M20 0C8.955 0 0 8.955 0 20s8.955 20 20 20 20-8.955 20-20S31.045 0 20 0zm7.5 21h-5v-5h5v5z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                                Product Hunt
                                                <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                                            </a>
                                        </div>
                                    </div>

                                    {/* Right: Image Carousel with 3D Animation */}
                                    <div className="relative">
                                        <div
                                            className="relative aspect-video rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-gradient-to-br from-black/5 to-transparent dark:from-white/5 perspective-1000"
                                            style={{ perspective: '1000px' }}
                                        >
                                            {/* Main Image with 3D flip animation */}
                                            <div
                                                className={`w-full h-full transition-all duration-700 ${isTransitioning
                                                    ? 'scale-95 opacity-0 rotate-y-90'
                                                    : 'scale-100 opacity-100 rotate-y-0'
                                                    }`}
                                                style={{
                                                    transformStyle: 'preserve-3d',
                                                    transform: isTransitioning ? 'rotateY(90deg) scale(0.95)' : 'rotateY(0deg) scale(1)',
                                                }}
                                            >
                                                <img
                                                    src={product.images[currentImageIndex].url}
                                                    alt={product.images[currentImageIndex].alt}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            {/* Navigation Overlay */}
                                            <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-black/20 via-transparent to-black/20">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={prevImage}
                                                    className="bg-black/10 dark:bg-white/10 backdrop-blur-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black border border-black/20 dark:border-white/20 rounded-full"
                                                >
                                                    <ChevronLeft className="w-6 h-6" />
                                                </Button>

                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={togglePause}
                                                    className="bg-black/10 dark:bg-white/10 backdrop-blur-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black border border-black/20 dark:border-white/20 rounded-full"
                                                >
                                                    {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                                                </Button>

                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={nextImage}
                                                    className="bg-black/10 dark:bg-white/10 backdrop-blur-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black border border-black/20 dark:border-white/20 rounded-full"
                                                >
                                                    <ChevronRight className="w-6 h-6" />
                                                </Button>
                                            </div>

                                            {/* Image Counter */}
                                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                                {product.images.map((_, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => goToImage(idx)}
                                                        className={`h-2 rounded-full transition-all duration-300 ${idx === currentImageIndex
                                                            ? "w-8 bg-black dark:bg-white"
                                                            : "w-2 bg-black/40 hover:bg-black/60 dark:bg-white/40 dark:hover:bg-white/60"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Thumbnail Preview */}
                                        <div className="grid grid-cols-4 gap-3 mt-4">
                                            {product.images.map((img, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => goToImage(idx)}
                                                    className={`aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 ${idx === currentImageIndex
                                                        ? "border-black dark:border-white scale-105"
                                                        : "border-black/20 dark:border-white/20 hover:border-black/50 dark:hover:border-white/50 opacity-60 hover:opacity-100"
                                                        }`}
                                                >
                                                    <img
                                                        src={img.url}
                                                        alt={img.alt}
                                                        className="w-full h-full object-cover"
                                                    />
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
