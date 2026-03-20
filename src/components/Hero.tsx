import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { motion, AnimatePresence } from "framer-motion";
import ParallaxFloating from "@/components/ui/parallax-floating";

const Hero = () => {
  const words = ["Intelligence", "Automation", "Safety", "Compliance", "The Scale", "The Future"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-16">
      <ParallaxFloating />
      <div className="container mx-auto px-2 relative z-10 text-center">

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-8xl font-bold font-heading text-black dark:text-white tracking-tight leading-tight flex flex-col md:flex-row items-center justify-center gap-y-2 md:gap-y-0 gap-x-0 md:gap-x-4 mb-4 md:mb-8 px-4">
          <span className="shrink-0">Engineering</span>
          <span className="relative inline-block min-w-[280px] md:min-w-[500px] text-center md:text-left">
            <AnimatePresence mode="wait">
              <motion.span
                key={words[index]}
                initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -20, opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute left-0 top-0 w-full md:w-auto text-center md:text-left bg-gradient-to-r from-gray-500 via-gray-800 to-black dark:from-gray-100 dark:via-gray-300 dark:to-gray-500 bg-clip-text text-transparent whitespace-nowrap"
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
            <span className="opacity-0 block whitespace-nowrap" aria-hidden="true">Intelligence</span>
          </span>
        </h1>

         {/* Technical Sub-Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-12"
        >
          <p className="text-sm md:text-xl font-mono tracking-[0.3em] uppercase text-blue-600 dark:text-blue-400 font-bold">
            Engineering Intelligence<span className="text-slate-400">.</span>
            <span className="text-slate-900 dark:text-white">COMPLEXITY</span>
            <span className="text-slate-400">.</span>
            <span className="text-purple-600 dark:text-purple-400">SIMPLIFIED</span>
          </p>
        </motion.div>

        {/* Creative CTA: The System Node */}
        <div className="flex justify-center mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="group relative cursor-pointer"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            {/* Outer Ring */}
            <div className="absolute inset-[-20px] rounded-full border border-blue-500/20 dark:border-blue-400/20 group-hover:border-blue-500/50 transition-all duration-700 animate-pulse" />
            
            {/* Morphing Orb */}
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full glass-premium flex items-center justify-center border-2 border-slate-200 dark:border-white/10 overflow-hidden group-hover:border-blue-500 transition-all duration-500 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
              
              {/* Inner Content */}
              <div className="relative z-10 text-center">
                <div className="text-[10px] font-mono tracking-widest text-slate-500 mb-2 group-hover:text-blue-500 transition-colors uppercase">
                  Status: Optimized
                </div>
                <div className="text-2xl md:text-3xl font-black tracking-tighter text-slate-950 dark:text-white group-hover:scale-110 transition-transform duration-500">
                  INITIATE
                </div>
                <div className="mt-2 flex items-center justify-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                  <div className="w-1 h-1 rounded-full bg-blue-500" />
                  <div className="w-12 h-[1px] bg-slate-400 dark:bg-slate-600" />
                  <div className="w-1 h-1 rounded-full bg-blue-500" />
                </div>
                <div className="mt-2 text-[8px] font-mono tracking-[0.2em] text-slate-400 uppercase">
                  Protocol Root-01
                </div>
              </div>

              {/* Decorative data scan line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-blue-500/30 -translate-y-full group-hover:animate-scan z-20" />
            </div>

            {/* Hover Tooltip/Label */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-max opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <span className="text-xs font-mono font-bold tracking-[0.4em] text-blue-600 dark:text-blue-400 uppercase">
                Discover the Intelligence
              </span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Hero;