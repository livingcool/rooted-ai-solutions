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
        <div className="grid grid-cols-[1.3fr_0.7fr] lg:grid-cols-2 gap-4 md:gap-12 lg:gap-20 items-center">
          {/* Left Column - Main Content */}
          <div className="space-y-4 md:space-y-10 text-left">
            {/* Headline - with transition */}
            <div className="min-h-[140px] md:min-h-[280px]">
              <h1
                key={currentSlide}
                className="text-2xl xs:text-3xl md:text-7xl lg:text-8xl font-bold font-heading text-black dark:text-white leading-[1.1] md:leading-[0.95] tracking-tight animate-fade-up"
              >
                {slides[currentSlide].headline}
                <span className="block mt-1 md:mt-2 bg-gradient-to-r from-black via-black/80 to-black/50 dark:from-white dark:via-white/80 dark:to-white/50 bg-clip-text text-transparent">
                  {slides[currentSlide].subheadline}
                </span>
                {/* Decorative period */}
                <span className="text-primary hidden md:inline-block w-4 h-4 bg-black dark:bg-white rounded-full ml-2 align-baseline animate-pulse"></span>
              </h1>
            </div>

            {/* Subheadline */}
            <div className="relative pl-3 md:pl-6 border-l-2 border-black/10 dark:border-white/10">
              <p
                key={`desc-${currentSlide}`}
                className="text-xs xs:text-sm md:text-xl text-black/70 dark:text-white/70 leading-relaxed max-w-xl animate-fade-up"
                style={{ animationDelay: "0.1s" }}
              >
                {slides[currentSlide].description}
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col md:flex-row flex-wrap gap-3 md:gap-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <MagneticButton>
                <Button
                  key={`cta-${currentSlide}`}
                  size="lg"
                  className="bw-button text-sm md:text-lg font-semibold group h-10 md:h-14 px-4 md:px-8 w-fit"
                  onClick={() => window.open(`https://wa.me/917904168521?text=${encodeURIComponent(slides[currentSlide].ctaMessage)}`, "_blank")}
                >
                  {slides[currentSlide].cta}
                  <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </MagneticButton>

              {/* Desktop Slide Indicators */}
              <div className="hidden md:flex gap-2 md:gap-3 items-center mt-1 md:mt-0">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${index === currentSlide
                      ? "w-6 md:w-10 bg-black dark:bg-white"
                      : "w-1.5 md:w-2 bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40"
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Mobile Stats Carousel - Visible only on mobile */}
            <div className="md:hidden mt-8 w-full overflow-x-auto pb-4 no-scrollbar">
              <div className="flex gap-3">
                {slides[currentSlide].stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-32 glass-premium p-3 rounded-xl border border-white/10 flex flex-col justify-center items-center text-center"
                  >
                    <div className="font-bold text-black dark:text-white text-xl leading-tight">
                      {stat.value}
                    </div>
                    <div className="text-[10px] font-medium text-black/50 dark:text-white/50 uppercase tracking-widest mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
              {/* Mobile Slide Indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${index === currentSlide
                      ? "w-6 bg-black dark:bg-white"
                      : "w-1.5 bg-black/20 dark:bg-white/20"
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Visual Elements & Stats - HIDDEN ON MOBILE */}
          <div className="relative animate-fade-up perspective-1000 hidden md:flex items-center justify-center h-full" style={{ animationDelay: "0.4s" }}>
            <div className="relative w-full aspect-square max-w-[500px] flex items-center justify-center scale-90 md:scale-100 origin-right md:origin-center">

              {/* Rotating Rings Background */}
              <div className="absolute inset-0 border border-black/5 dark:border-white/5 rounded-full animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-4 md:inset-10 border border-black/5 dark:border-white/5 rounded-full animate-[spin_45s_linear_infinite_reverse]" />
              <div className="absolute inset-8 md:inset-20 border border-black/5 dark:border-white/5 rounded-full animate-[spin_30s_linear_infinite]" />

              {/* Stats Overlay - Glass Cards */}
              <div
                key={`stats-${currentSlide}`}
                className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 w-full"
              >
                {slides[currentSlide].stats.map((stat, index) => (
                  <div
                    key={index}
                    className="glass-premium p-2 md:p-8 rounded-xl md:rounded-2xl text-center hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-center items-center backdrop-blur-md min-h-[60px] md:min-h-auto border border-white/10"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`font-bold text-black dark:text-white mb-0 md:mb-1 leading-tight ${stat.value.length > 5 ? 'text-sm md:text-3xl' : 'text-lg md:text-5xl'}`}>
                      {stat.value}
                    </div>
                    <div className="text-[9px] md:text-xs font-medium text-black/50 dark:text-white/50 uppercase tracking-widest">{stat.label}</div>
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