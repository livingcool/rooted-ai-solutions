import { useState, useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import SignalInterference from "./ui/SignalInterference";

// ─── Dynamic Copy ────────────────────────────────────────────────────────
const WORDS = [
  "Compliance",
  "Infrastructure",
  "Pipelines",
  "Agents",
  "Systems"
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
      className="inline-flex font-extrabold tracking-tight overflow-hidden text-indigo-600 dark:text-indigo-400 font-syne"
      style={{
        letterSpacing: "-0.04em",
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
const DeepSpaceCanvas = ({ isDark }: { isDark: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const nodes = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const color = isDark ? "167, 139, 250" : "139, 92, 246";

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
  }, [isDark]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.08),transparent_70%)]" />
      <canvas ref={canvasRef} className="absolute inset-0 opacity-40 dark:opacity-60" />
    </div>
  );
};

// ─── Magnetic Button Component ───────────────────────────────────────────
const MagneticButton = ({ children, onClick }: { children?: React.ReactNode, onClick?: () => void }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.35;
    const y = (clientY - (top + height / 2)) * 0.35;
    setPosition({ x, y });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="relative flex justify-center items-center cursor-pointer group"
      onClick={onClick}
    >
      {/* Dynamic Radio Ripples */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="radio-ripple w-[300px] h-[300px] md:w-[400px] md:h-[400px]" style={{ animationDelay: '0s' }} />
        <div className="radio-ripple w-[300px] h-[300px] md:w-[400px] md:h-[400px]" style={{ animationDelay: '1s' }} />
        <div className="radio-ripple w-[300px] h-[300px] md:w-[400px] md:h-[400px]" style={{ animationDelay: '2s' }} />
        <div className="radio-ripple w-[300px] h-[300px] md:w-[400px] md:h-[400px]" style={{ animationDelay: '3s' }} />
      </div>

      <div className="orb-pulse absolute w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-full border border-indigo-500/10 dark:border-indigo-400/5 shadow-[0_0_100px_rgba(99,102,241,0.03)]" />
      <motion.div
        animate={{ x: position.x * 0.5, y: position.y * 0.5 }}
        className="absolute w-52 h-52 md:w-64 md:h-64 rounded-full border border-indigo-500/10 dark:border-indigo-400/10 group-hover:border-indigo-500/30 transition-colors duration-500"
      />
      <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-white dark:bg-slate-950/60 backdrop-blur-xl border border-slate-200 dark:border-white/10 flex flex-col justify-center items-center shadow-2xl dark:shadow-[0_20px_40px_rgba(0,0,0,0.6)] z-20 transition-all duration-500 group-hover:scale-105 group-hover:border-indigo-500/50">
        <span className="font-mono text-[8px] md:text-[9px] text-slate-400 dark:text-slate-500 tracking-[0.2em] mb-3 group-hover:text-indigo-500 transition-colors uppercase">
          Transmission Active
        </span>
        <span className="text-xl md:text-2xl font-black tracking-tighter text-slate-900 dark:text-white mb-3 text-center px-4 leading-tight font-syne">
          GET STARTED
        </span>
        <div className="w-6 h-[2px] bg-indigo-500/40 mb-3 rounded-full transition-all group-hover:w-10 group-hover:bg-indigo-500" />
        <span className="font-mono text-[7px] md:text-[8px] text-indigo-500/60 dark:text-indigo-400/60 tracking-[0.4em] uppercase font-bold">
          R-AI // v1.0
        </span>
      </div>
    </motion.div>
  );
};

// ─── Hero Component ────────────────────────────────────────────────────────
const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const noiseOpacity = useTransform(smoothProgress, [0, 0.4], [isDark ? 0.4 : 0.2, 0]);
  const contentOpacity = useTransform(smoothProgress, [0.6, 0.9], [1, 0]);
  const contentScale = useTransform(smoothProgress, [0, 0.5], [1, 0.95]);
  const contentY = useTransform(smoothProgress, [0, 1], [0, -50]);
  const bgOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);

  return (
    <>
      <style>{`
        .overlay-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        .orb-pulse { animation: orb-pulse 8s ease-in-out infinite; }
        @keyframes orb-pulse { 0%, 100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.1); } }
        
        .radio-ripple {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(99, 102, 241, 0.4);
          animation: radio-ripple 4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
          pointer-events: none;
        }

        @keyframes radio-ripple {
          0% { transform: scale(0.5); opacity: 0; }
          20% { opacity: 0.5; }
          100% { transform: scale(2.5); opacity: 0; }
        }
      `}</style>

      <section ref={containerRef} className="relative min-h-[200vh] bg-transparent">
        <SignalInterference />
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden">
          <motion.div
            style={{ opacity: bgOpacity }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <div className="absolute inset-0 bg-white dark:bg-[#030614] transition-colors duration-1000" />
            <DeepSpaceCanvas isDark={isDark} />
            <motion.div
              style={{ opacity: noiseOpacity }}
              className="absolute inset-0 mix-blend-overlay overlay-noise opacity-20 dark:opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030614]/40 to-[#030614]" />
          </motion.div>

          <motion.div
            style={{ opacity: contentOpacity, scale: contentScale, y: contentY }}
            className="relative z-10 px-4 text-center mt-8"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="px-6 py-2 rounded-full flex gap-3 items-center mb-10 border border-indigo-500/10 bg-indigo-50/30 dark:bg-indigo-500/5 backdrop-blur-md shadow-sm mx-auto w-fit"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              <span className="font-mono text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 dark:text-slate-400">
                Future-Ready AI Engineering
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-[7.5rem] font-black flex flex-wrap justify-center gap-x-6 gap-y-2 leading-[0.9] tracking-tighter mb-12 text-slate-900 dark:text-white font-syne"
            >
              <span className="opacity-95">Engineering</span>
              <LetterCascade words={WORDS} />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="max-w-2xl text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium mb-16 leading-relaxed px-6 font-inter mx-auto"
            >
              Engineering Complexity, Simplified
            </motion.p>

            <MagneticButton
              onClick={() => {
                window.dispatchEvent(new CustomEvent('trigger-bg-flare'));
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </motion.div>
        </div>

        {/* Floating Background Accents */}
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none" />
      </section>
    </>
  );
};

export default Hero;