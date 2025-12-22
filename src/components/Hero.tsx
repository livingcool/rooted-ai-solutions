import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, TrendingUp, Users } from "lucide-react";
import TextScramble from "@/components/ui/TextScramble";
import MagneticButton from "@/components/ui/MagneticButton";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");
  const fullText = "ROOTEDAI";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const moveX = clientX - window.innerWidth / 2;
      const moveY = clientY - window.innerHeight / 2;
      const offset = 0.02;

      heroRef.current.style.setProperty("--move-x", `${moveX * offset}px`);
      heroRef.current.style.setProperty("--move-y", `${moveY * offset}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white min-h-[1.2em] leading-tight">
            We automate logistics, hiring, and support{" "}
            <span className="text-white/70">
              so your team saves 40% on ops cost
            </span>
          </h1>

          {/* Target Audience */}
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-medium tracking-wide animate-fade-up" style={{ animationDelay: "0.1s" }}>
            For Indian SMEs, logistics firms, and fast-growing teams
          </p>

          {/* Trusted Impact - Social Proof */}
          <div className="animate-fade-up pt-4" style={{ animationDelay: "0.2s" }}>
            <p className="text-xs uppercase tracking-widest text-white/40 mb-4">Trusted Impact</p>
            <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-bold text-white">10+</div>
                <div className="text-xs uppercase tracking-wider text-white/60">Active AI Agents</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-bold text-white">40%</div>
                <div className="text-xs uppercase tracking-wider text-white/60">Avg Cost Reduction</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-bold text-white">75+</div>
                <div className="text-xs uppercase tracking-wider text-white/60">Projects Delivered</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <MagneticButton>
              <Button
                className="bw-button text-lg px-8 py-6 group"
                onClick={() => window.open("https://wa.me/917904168521?text=Hi,%20I'd%20like%20to%20discuss%20automation%20for%20my%20business", "_blank")}
              >
                Book a Discovery Call
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </MagneticButton>
            <Button
              variant="ghost"
              className="bw-button-outline text-lg px-8 py-6 text-white hover:text-black"
              onClick={() => document.getElementById("case-studies")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Case Studies
            </Button>
          </div>

          {/* Key Value Props */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-4xl mx-auto animate-fade-up" style={{ animationDelay: "0.6s" }}>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Building2 className="w-5 h-5 text-white/60 flex-shrink-0 mt-1" />
              <div className="text-left">
                <div className="text-sm font-semibold text-white">Replace 3-5 FTEs</div>
                <div className="text-xs text-white/60">with AI agents in logistics & support</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <TrendingUp className="w-5 h-5 text-white/60 flex-shrink-0 mt-1" />
              <div className="text-left">
                <div className="text-sm font-semibold text-white">90% error reduction</div>
                <div className="text-xs text-white/60">in repetitive data entry tasks</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Users className="w-5 h-5 text-white/60 flex-shrink-0 mt-1" />
              <div className="text-left">
                <div className="text-sm font-semibold text-white">5-second resolution</div>
                <div className="text-xs text-white/60">for internal support tickets</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;