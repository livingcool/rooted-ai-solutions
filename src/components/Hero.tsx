import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// ─── Dynamic Copy ────────────────────────────────────────────────────────
const WORDS = [
  "The Compliance",
  "The Infrastructure",
  "The Pipelines",
  "The Agents",
  "Your Advantage"
];

// ─── Animated Word Flipper (Refactored for Sans-Serif) ───────────────────
interface LetterCascadeProps {
  words: string[];
  intervalMs?: number;
}

const LetterCascade: React.FC<LetterCascadeProps> = ({ words, intervalMs = 3000 }) => {
  const [current, setCurrent] = useState(words[0]);
  const [phase, setPhase] = useState<"idle" | "enter" | "exit">("idle");
  const idxRef = useRef(0);
  const busyRef = useRef(false);

  useEffect(() => {
    const t = setInterval(() => {
      if (busyRef.current) return;
      busyRef.current = true;
      setPhase("exit");
      
      const exitDur = current.length * 20 + 300;
      setTimeout(() => {
        idxRef.current = (idxRef.current + 1) % words.length;
        setCurrent(words[idxRef.current]);
        setPhase("enter");

        const enterDur = words[idxRef.current].length * 30 + 300;
        setTimeout(() => {
          setPhase("idle");
          busyRef.current = false;
        }, enterDur);
      }, exitDur);
    }, intervalMs);

    return () => clearInterval(t);
  }, [words, intervalMs, current.length]);

  return (
    <span
      className="inline-flex font-extrabold tracking-tight overflow-hidden text-[#3B82F6] dark:text-[#5C94FF]"
      style={{
        letterSpacing: "-0.02em",
      }}
    >
      {[...current].map((ch, i) => {
        if (ch === " ") return <span key={i} className="w-[0.3em]" />;
        const isExit = phase === "exit";
        const delayMs = i * (isExit ? 15 : 25);

        return (
          <span key={`${current}-${i}`} className="overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: isExit ? 0 : "100%", opacity: isExit ? 1 : 0 }}
              animate={{ y: isExit ? "-100%" : 0, opacity: isExit ? 0 : 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: delayMs / 1000 }}
            >
              {ch}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
};

// ─── Deep Space Network Canvas ─────────────────────────────────────────────
const DeepSpaceCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Handle resize
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Generate network nodes
    const nodes = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains("dark");
      const color = isDark ? "92, 148, 255" : "59, 130, 246";
      
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0) n.x = canvas.width;
        if (n.x > canvas.width) n.x = 0;
        if (n.y < 0) n.y = canvas.height;
        if (n.y > canvas.height) n.y = 0;

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const d = Math.hypot(n.x - m.x, n.y - m.y);
          if (d < 150) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(${color}, ${(1 - d / 150) * 0.15})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
        
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, 0.5)`;
        ctx.fill();
      }
      frameRef.current = requestAnimationFrame(draw);
    };
    
    draw();
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

// ─── Hero Component ────────────────────────────────────────────────────────
const Hero = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&family=JetBrains+Mono:wght@400;700&display=swap');
        .orb-pulse { animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: .7; transform: scale(0.98); } }
      `}</style>

      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white/0 dark:bg-[#030614]/0 transition-colors duration-700">
        
        {/* Background Network Canvas */}
        <DeepSpaceCanvas />

        {/* ── Main Hero Content ── */}
        <div className="flex flex-col items-center justify-center relative z-10 px-4 text-center mt-12">
          
          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-black flex flex-wrap justify-center gap-x-4 gap-y-2 leading-[1.1] tracking-tighter mb-10 text-slate-900 dark:text-white"
          >
            <span>Engineering</span>
            <LetterCascade words={WORDS} />
          </motion.h1>

          {/* Sub-Pill */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="px-8 py-3 rounded-full flex gap-4 items-center mb-20 border border-blue-500/20 bg-white/60 dark:bg-[#14203c]/80 backdrop-blur-md shadow-sm dark:shadow-[0_0_30px_rgba(92,148,255,0.05)]"
          >
            <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-blue-600 dark:text-[#5C94FF]">
              ENGINEERING INTELLIGENCE <span className="text-slate-400 dark:text-slate-500">.</span> COMPLEXITY <span className="text-purple-600 dark:text-[#D6BCFA]">. SIMPLIFIED</span>
            </span>
          </motion.div>

          {/* Central Initiate Module */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative flex justify-center items-center cursor-pointer group"
            onClick={() => {
              window.dispatchEvent(new CustomEvent('trigger-bg-flare'));
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {/* Visual Halo */}
            <div className="orb-pulse absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border border-blue-500/10 shadow-[inner_0_0_80px_rgba(59,130,246,0.05)] dark:shadow-[inner_0_0_100px_rgba(92,148,255,0.1)]" />
            
            {/* Core Interaction Button */}
            <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-full bg-slate-50/80 dark:bg-[#0a0f1e]/80 backdrop-blur-md border border-slate-200 dark:border-white/10 flex flex-col justify-center items-center shadow-xl dark:shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_0_40px_rgba(0,0,0,0.8)] z-20 transition-all duration-500 group-hover:border-blue-500">
              <span className="font-mono text-[8px] md:text-[9px] text-slate-500 dark:text-zinc-500 tracking-[0.2em] mb-4 group-hover:text-blue-500 transition-colors">
                STATUS: OPTIMIZED
              </span>
              <span className="text-2xl md:text-3xl font-black tracking-tight text-slate-950 dark:text-white mb-4 group-hover:scale-105 transition-transform">
                INITIATE
              </span>
              <div className="w-8 h-[1px] bg-blue-500/50 mb-4" />
              <span className="font-mono text-[8px] md:text-[9px] text-blue-600 dark:text-[#5C94FF] tracking-[0.2em]">
                PROTOCOL ROOT-01
              </span>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default Hero;