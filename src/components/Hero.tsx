import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      headline: "Engineering",
      subheadline: "Intelligence",
      description: "COMPLEXITY. SIMPLIFIED. We automate logistics, hiring, and support for Indian SMEs and scaling enterprises with autonomous agents.",
      cta: "Get Custom Solution",
      ctaMessage: "Hi, I'd like a customized software solution from RootedAI",
      stats: [
        { value: "100%", label: "Custom Built" },
        { value: "2-4 Wk", label: "Delivery" },
        { value: "24/7", label: "Support" },
        { value: "AI-First", label: "Approach" },
      ],
    },
    {
      headline: "Automate &",
      subheadline: "Focus on Growth",
      description: "AI-powered automation that handles repetitive tasks. Let intelligent systems do the heavy lifting while your team focuses on innovation.",
      cta: "Automate Your Workflow",
      ctaMessage: "Hi, I'd like to automate my workflow with RootedAI",
      stats: [
        { value: "90%", label: "Time Saved" },
        { value: "Zero", label: "Errors" },
        { value: "5+", label: "Solutions" },
        { value: "24/7", label: "Active" },
      ],
    },
    {
      headline: "From Idea to",
      subheadline: "Production Ready",
      description: "Full-stack development expertise. We transform your vision into production-ready software with modern tech and best practices.",
      cta: "Start Building",
      ctaMessage: "Hi, I'd like to start building with RootedAI",
      stats: [
        { value: "Full", label: "Stack Dev" },
        { value: "Modern", label: "Tech Stack" },
        { value: "Fast", label: "Deployment" },
        { value: "Scalable", label: "Solutions" },
      ],
    },
    {
      headline: "Smart Solutions,",
      subheadline: "Lower Costs",
      description: "Reduce operational costs with intelligent automation and streamlined processes. Get enterprise quality without enterprise overhead.",
      cta: "Cut Your Costs",
      ctaMessage: "Hi, I'd like to reduce costs with RootedAI",
      stats: [
        { value: "40%", label: "Cost Savings" },
        { value: "Fast", label: "ROI" },
        { value: "No", label: "Overhead" },
        { value: "Proven", label: "Results" },
      ],
    },
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-16 md:pt-0 md:pb-0"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Main Content */}
          <div className="space-y-10 text-left">
            {/* Headline - with transition */}
            <div className="min-h-[220px] md:min-h-[280px]">
              <h1
                key={currentSlide}
                className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading text-black dark:text-white leading-[0.95] tracking-tight animate-fade-up"
              >
                {slides[currentSlide].headline}
                <span className="block mt-2 bg-gradient-to-r from-black via-black/80 to-black/50 dark:from-white dark:via-white/80 dark:to-white/50 bg-clip-text text-transparent">
                  {slides[currentSlide].subheadline}
                </span>
                {/* Decorative period */}
                <span className="text-primary hidden md:inline-block w-4 h-4 bg-black dark:bg-white rounded-full ml-2 align-baseline animate-pulse"></span>
              </h1>
            </div>

            {/* Subheadline */}
            <div className="relative pl-6 border-l-2 border-black/10 dark:border-white/10">
              <p
                key={`desc-${currentSlide}`}
                className="text-lg md:text-xl text-black/70 dark:text-white/70 leading-relaxed max-w-xl animate-fade-up"
                style={{ animationDelay: "0.1s" }}
              >
                {slides[currentSlide].description}
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <MagneticButton>
                <Button
                  key={`cta-${currentSlide}`}
                  size="lg"
                  className="bw-button text-lg font-semibold group h-14 px-8"
                  onClick={() => window.open(`https://wa.me/917904168521?text=${encodeURIComponent(slides[currentSlide].ctaMessage)}`, "_blank")}
                >
                  {slides[currentSlide].cta}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </MagneticButton>
              <div className="flex gap-3 items-center">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all duration-500 ${index === currentSlide
                      ? "w-10 bg-black dark:bg-white"
                      : "w-2 bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40"
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Visual Elements & Stats */}
          <div className="relative animate-fade-up perspective-1000" style={{ animationDelay: "0.4s" }}>
            <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center">

              {/* Rotating Rings Background */}
              <div className="absolute inset-0 border border-black/5 dark:border-white/5 rounded-full animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-10 border border-black/5 dark:border-white/5 rounded-full animate-[spin_45s_linear_infinite_reverse]" />
              <div className="absolute inset-20 border border-black/5 dark:border-white/5 rounded-full animate-[spin_30s_linear_infinite]" />

              {/* Stats Overlay - Glass Cards */}
              <div
                key={`stats-${currentSlide}`}
                className="relative z-10 grid grid-cols-2 gap-4 w-full"
              >
                {slides[currentSlide].stats.map((stat, index) => (
                  <div
                    key={index}
                    className="glass-premium p-6 md:p-8 rounded-2xl text-center hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-center items-center backdrop-blur-md"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`font-bold text-black dark:text-white mb-1 ${stat.value.length > 5 ? 'text-2xl md:text-3xl' : 'text-3xl md:text-5xl'}`}>
                      {stat.value}
                    </div>
                    <div className="text-xs font-medium text-black/50 dark:text-white/50 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};


export default Hero;