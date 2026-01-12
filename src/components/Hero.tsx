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
      headline: "Automate Everything,",
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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const moveX = clientX - window.innerWidth / 2;
      const moveY = clientY - window.innerHeight / 2;
      const offset = 0.01;

      heroRef.current.style.setProperty("--move-x", `${moveX * offset}px`);
      heroRef.current.style.setProperty("--move-y", `${moveY * offset}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-24 pb-12 md:pt-20 md:pb-0"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 right-10 w-64 h-64 rounded-full bg-gradient-to-br from-black/5 to-transparent dark:from-white/10 blur-3xl"
          style={{ transform: 'translate(var(--move-x), var(--move-y))' }}
        />
        <div
          className="absolute bottom-1/4 left-10 w-96 h-96 rounded-full bg-gradient-to-tr from-black/5 to-transparent dark:from-white/5 blur-3xl"
          style={{ transform: 'translate(calc(var(--move-x) * -1), calc(var(--move-y) * -1))' }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[auto] md:min-h-[80vh]">
          {/* Left Column - Main Content */}
          <div className="space-y-8 text-left">
            {/* Headline - with transition */}
            <div className="min-h-[200px] md:min-h-[250px]">
              <h1
                key={currentSlide}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-black dark:text-white leading-tight animate-fade-up"
              >
                {slides[currentSlide].headline}{" "}
                <span className="block mt-2 bg-gradient-to-r from-black via-black/90 to-black/70 dark:from-white dark:via-white/90 dark:to-white/70 bg-clip-text text-transparent">
                  {slides[currentSlide].subheadline}
                </span>
              </h1>
            </div>

            {/* Subheadline */}
            <p
              key={`desc-${currentSlide}`}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              {slides[currentSlide].description}
            </p>

            {/* CTA Button */}
            <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <MagneticButton>
                <Button
                  key={`cta-${currentSlide}`}
                  size="lg"
                  className="bw-button text-lg font-semibold group"
                  onClick={() => window.open(`https://wa.me/917904168521?text=${encodeURIComponent(slides[currentSlide].ctaMessage)}`, "_blank")}
                >
                  {slides[currentSlide].cta}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </MagneticButton>
            </div>

            {/* Carousel Indicator Dots */}
            <div className="flex gap-3 pt-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${index === currentSlide
                    ? "w-12 bg-black dark:bg-white"
                    : "w-12 bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40"
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Visual Elements & Stats */}
          <div className="relative animate-fade-up" style={{ animationDelay: "0.4s" }}>
            {/* Decorative Shapes - More prominent */}
            <div className="relative w-full h-[550px] flex items-center justify-center">
              {/* Corner decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-gradient-to-br from-orange-500/30 to-red-500/30 blur-2xl animate-pulse-glow"></div>
              <div className="absolute top-20 right-10 w-24 h-24 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 blur-xl"></div>

              {/* Abstract geometric shapes */}
              <div className="absolute top-10 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 blur-xl"></div>
              <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-gradient-to-tr from-yellow-500/20 to-red-500/20 blur-xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-br from-black/10 to-black/5 dark:from-white/10 dark:to-white/5 blur-2xl"></div>

              {/* Glowing corner accent */}
              <div className="absolute -top-4 -right-4 w-32 h-32">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-black/20 dark:from-white/20 via-orange-500/20 to-transparent blur-xl animate-pulse"></div>
              </div>

              {/* Stats Overlay - Bigger cards with animations */}
              <div
                key={`stats-${currentSlide}`}
                className="relative z-10 grid grid-cols-2 gap-6 max-w-lg animate-fade-up"
              >
                {slides[currentSlide].stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bw-card p-6 md:p-8 text-center hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-300 backdrop-blur-sm hover:scale-105 flex flex-col justify-center items-center h-full"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`font-bold text-black dark:text-white mb-2 ${stat.value.length > 6 ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-4xl md:text-5xl'}`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-black/60 dark:text-white/60 uppercase tracking-wider">{stat.label}</div>
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