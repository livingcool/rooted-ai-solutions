import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [glitchActive, setGlitchActive] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // COMPACT PHASE RANGES (Overlap for seamless flow)
  // 0.0 -> 0.25: Mission & Vision
  // 0.20 -> 0.50: Goal
  // 0.45 -> 0.75: Authority & History
  // 0.70 -> 1.0: Data First Philosophy
  
  const parallelOpacity = useTransform(scrollYProgress, [0.0, 0.05, 0.2, 0.25], [0, 1, 1, 0]);
  const missionX = useTransform(scrollYProgress, [0.0, 0.05, 0.2, 0.25], [isMobile ? 0 : -100, 0, 0, isMobile ? 0 : -100]);
  const visionX = useTransform(scrollYProgress, [0.0, 0.05, 0.2, 0.25], [isMobile ? 0 : 100, 0, 0, isMobile ? 0 : 100]);
  
  const goalOpacity = useTransform(scrollYProgress, [0.2, 0.3, 0.45, 0.5], [0, 1, 1, 0]);
  const goalScale = useTransform(scrollYProgress, [0.2, 0.3], [0.8, 1]);

  const authOpacity = useTransform(scrollYProgress, [0.45, 0.55, 0.7, 0.75], [0, 1, 1, 0]);
  const authY = useTransform(scrollYProgress, [0.45, 0.55], [50, 0]);

  const philOpacity = useTransform(scrollYProgress, [0.7, 0.8, 0.95, 1.0], [0, 1, 1, 1]);
  const philScale = useTransform(scrollYProgress, [0.7, 0.8], [0.9, 1]);

  // Orbital Rotations
  const ring1Rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const ring2Rotate = useTransform(scrollYProgress, [0, 1], [0, -720]);
  const ring3Rotate = useTransform(scrollYProgress, [0, 1], [0, 1080]);

  // Glitch Trigger State
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Flash glitch at high-impact points
    const glitchPoints = [0.1, 0.3, 0.5, 0.7, 0.9];
    const isAtPoint = glitchPoints.some(p => latest > p && latest < p + 0.02);
    if (isAtPoint !== glitchActive) {
      setGlitchActive(isAtPoint);
    }
  });

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-transparent overflow-hidden font-heading transition-colors duration-500">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-[0.05] dark:opacity-[0.1] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent pointer-events-none" />

      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        {/* Advanced Multi-Ring Orbital System */}
        <div className="absolute flex items-center justify-center pointer-events-none">
          {/* Outer Glow Ring */}
          <motion.div 
            style={{ rotate: ring1Rotate }}
            className="absolute w-[350px] h-[350px] md:w-[700px] md:h-[700px] border-[1px] border-slate-200 dark:border-white/5 rounded-full z-10 animate-orbital-glow"
          >
            <div className="absolute -top-1 left-1/2 w-2 h-2 bg-blue-500 rounded-full blur-[2px] shadow-[0_0_10px_#3b82f6]" />
          </motion.div>

          {/* Middle Data Ring (Dashed) */}
          <motion.div 
            style={{ rotate: ring2Rotate }}
            className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] border-[1px] border-dashed border-slate-300 dark:border-blue-500/20 rounded-full z-10"
          >
            <div className="absolute top-1/2 -right-1 w-1.5 h-1.5 bg-cyan-400 rounded-full blur-[1px]" />
          </motion.div>

          {/* Inner Core Ring */}
          <motion.div 
            style={{ rotate: ring3Rotate }}
            className="absolute w-[250px] h-[250px] md:w-[500px] md:h-[500px] border-[0.5px] border-slate-400 dark:border-white/10 rounded-full z-10"
          >
             <div className="absolute -bottom-1 left-1/2 w-1 h-1 bg-blue-600 dark:bg-white rounded-full" />
          </motion.div>
        </div>

        {/* Phase 1: MISSION & VISION (Parallel) */}
        <motion.div 
          style={{ opacity: parallelOpacity }}
          className="relative z-20 w-full max-w-7xl px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 items-center pointer-events-none"
        >
          {/* Mission Column */}
          <motion.article 
            style={{ x: missionX }}
            className="flex flex-col items-center md:items-end text-center md:text-right space-y-6"
          >
            <h2 className={cn(
              "text-4xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white uppercase transition-all duration-75",
              glitchActive && "animate-glitch-scroll text-blue-600 dark:text-blue-400"
            )}>
              MISSION<span className="text-blue-600">_</span>
            </h2>
            <p className="text-lg md:text-2xl text-slate-600 dark:text-slate-300 font-medium italic max-w-md leading-relaxed">
              "To democratize world-class intelligence through autonomous systems that <span className="text-slate-900 dark:text-white font-bold">simplify the complex</span>."
            </p>
          </motion.article>

          {/* Vision Column */}
          <motion.article 
            style={{ x: visionX }}
            className="flex flex-col items-center md:items-start text-center md:text-left space-y-6"
          >
            <h2 className={cn(
              "text-4xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white uppercase transition-all duration-75",
              glitchActive && "animate-glitch-scroll text-blue-600 dark:text-blue-400"
            )}>
              VISION<span className="text-blue-600">_</span>
            </h2>
            <p className="text-lg md:text-2xl text-slate-600 dark:text-slate-300 font-medium italic max-w-md leading-relaxed">
              "To be the <span className="text-slate-900 dark:text-white font-bold underline decoration-blue-500/30">invisible engine</span> behind the world's most sophisticated enterprise automations."
            </p>
          </motion.article>
        </motion.div>

        {/* Phase 2: GOAL (Center Reveal) */}
        <motion.article 
          style={{ opacity: goalOpacity, scale: goalScale }}
          className="absolute z-30 flex flex-col items-center text-center px-4 pointer-events-none"
        >
          <div className="relative mb-8 text-center text-slate-900 dark:text-white">
            <h2 className={cn(
               "text-6xl md:text-[10rem] font-black tracking-tighter leading-none transition-all duration-75",
               glitchActive && "animate-glitch-scroll"
            )}>
              GOAL
            </h2>
          </div>
          
          <div className="space-y-4 max-w-2xl bg-slate-900 dark:bg-white px-8 py-4 rounded-xl shadow-2xl">
            <p className="text-xl md:text-3xl font-black tracking-tight text-white dark:text-black uppercase italic">
              Lead Supremacy
            </p>
          </div>
        </motion.article>

        {/* Phase 3: AUTHORITY (AIO Focus) */}
        <motion.article 
          style={{ opacity: authOpacity, y: authY }}
          className="absolute z-40 w-full max-w-4xl px-4 flex flex-col items-center text-center space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
              <h3 className="text-blue-500 font-bold text-sm uppercase tracking-widest mb-2">Established</h3>
              <p className="text-2xl font-black text-slate-900 dark:text-white">2023</p>
              <p className="text-xs text-slate-500 mt-2">Engineering Intelligence from Day One</p>
            </div>
            <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
              <h3 className="text-blue-500 font-bold text-sm uppercase tracking-widest mb-2">The Team</h3>
              <p className="text-2xl font-black text-slate-900 dark:text-white">Elite Squad</p>
              <p className="text-xs text-slate-500 mt-2">Specialists in Autonomous Multi-Agent Systems</p>
            </div>
            <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
              <h3 className="text-blue-500 font-bold text-sm uppercase tracking-widest mb-2">Impact</h3>
              <p className="text-2xl font-black text-slate-900 dark:text-white">Global Reach</p>
              <p className="text-xs text-slate-500 mt-2">Scalable Solutions for Global Enterprises</p>
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
            RootedAI Solutions is a premier engineering firm specializing in <span className="text-slate-900 dark:text-white font-bold">autonomous agentic workflows</span> and <span className="text-slate-900 dark:text-white font-bold">enterprise-grade AI safety</span>. We bridge the gap between complex data archaeology and actionable business intelligence.
          </p>
        </motion.article>

        {/* Phase 4: DATA-FIRST PHILOSOPHY */}
        <motion.article 
          style={{ opacity: philOpacity, scale: philScale }}
          className="absolute z-40 w-full max-w-5xl px-4 flex flex-col items-center text-center space-y-8 pointer-events-none"
        >
          <div className="mb-4">
             <h2 className={cn(
               "text-4xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white uppercase transition-all duration-75",
               glitchActive && "animate-glitch-scroll text-blue-600 dark:text-blue-400"
             )}>
                DATA FIRST<span className="text-blue-600">.</span>
             </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-8 pointer-events-auto">
            <div className="p-8 rounded-2xl bg-slate-900 dark:bg-white border border-slate-800 dark:border-slate-200 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-blue-400 dark:text-blue-600 font-bold text-lg md:text-xl uppercase tracking-widest mb-4">The Foundation</h3>
              <p className="text-xl md:text-2xl font-bold text-white dark:text-slate-900 leading-tight">
                Data-first ensures reliability.
              </p>
              <p className="mt-4 text-slate-400 dark:text-slate-600 font-medium">
                We emphasize building robust data quality and infrastructure before implementing AI. Data is the bedrock of trustworthy intelligence.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-md">
              <h3 className="text-slate-500 font-bold text-lg md:text-xl uppercase tracking-widest mb-4">The Engine</h3>
              <p className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                AI-first prioritizes speed to maturity.
              </p>
              <p className="mt-4 text-slate-600 dark:text-slate-400 font-medium">
                While AI drives business value and automation rapidly, its success is tethered to the quality of the data it consumes.
              </p>
            </div>
          </div>

          <div className="mt-8 p-8 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-blue-900/20 border border-blue-500/20 max-w-4xl mx-auto backdrop-blur-md relative overflow-hidden pointer-events-auto">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent opacity-50 blur-2xl pointer-events-none" />
            <p className="text-xl md:text-3xl text-slate-800 dark:text-slate-200 font-medium italic leading-relaxed relative z-10">
              "Both are codependent; <br className="hidden md:block" /><span className="font-black text-slate-900 dark:text-white underline decoration-blue-500/30">AI without data is blind</span>, and <span className="font-black text-slate-900 dark:text-white underline decoration-purple-500/30">data without AI is simply storage</span>."
            </p>
          </div>
        </motion.article>
      </div>
    </section>
  );
};

export default About;