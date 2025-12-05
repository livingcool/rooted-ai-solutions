import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";


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
        <div className="max-w-5xl mx-auto text-center space-y-8">

          {/* Main Headline */}
          <h1 className="text-4xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white min-h-[1.2em]">
            {text.slice(0, 6)}
            <span className="text-white/50">{text.slice(6)}</span>
            <span className="animate-pulse ml-1">|</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
            We engineer autonomy. Replacing operational friction with intelligent velocity.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <Button
              className="bw-button text-lg px-8 py-6 group"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Start Automating
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="ghost"
              className="bw-button-outline text-lg px-8 py-6 text-white hover:text-black"
              onClick={() => document.getElementById("case-studies")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Case Studies
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-20 border-t border-white/10 mt-20 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            {[
              { label: "Accuracy Rate", value: "99.9%" },
              { label: "Time Saved", value: "40h+" },
              { label: "ROI Increase", value: "3x" },
              { label: "Active Agents", value: "500+" },
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/50 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;