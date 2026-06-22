import { motion } from "framer-motion";
import { useTheme } from "../ThemeProvider";

const ANGLES = [0, 60, 120, 180, 240, 300];
const PETAL_D = "M 50 42 C 50 15, 85 15, 80 45 C 75 75, 55 65, 50 42";

interface MirrorLoaderProps {
  size?: number;
  className?: string;
}

const MirrorLoader = ({ size = 100, className = "" }: MirrorLoaderProps) => {
  const { theme } = useTheme();
  
  // Resolve "system" theme to actual "light" or "dark" for color calculations
  const resolvedTheme = theme === "system" 
    ? (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    : theme;

  const isDark = resolvedTheme === "dark";

  // Color Palettes
  const colors = {
    dull: isDark ? "#c5bef8" : "#8b5cf6",
    bright: isDark ? "#a78bfa" : "#1a0b2e", // Premium Dark Purple
    glow: isDark ? "rgba(167, 139, 250, 0.4)" : "rgba(26, 11, 46, 0.2)",
    ambient: isDark ? "rgba(167, 139, 250, 0.1)" : "rgba(139, 92, 246, 0.05)",
  };

  // Variant for the sequential drawing effect
  const petalVariants = {
    initial: { 
      pathLength: 0, 
      opacity: 0,
      stroke: colors.dull,
      strokeOpacity: isDark ? 0.3 : 0.2
    },
    animate: (i: number) => ({
      pathLength: [0, 1, 1],
      opacity: [0, 1, 1],
      strokeWidth: [1.2, 1.2, 1.5],
      stroke: [colors.dull, colors.dull, colors.bright],
      transition: {
        duration: 2.2,
        delay: i * 0.15,
        times: [0, 0.4, 1],
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 0.5
      } as any
    }),
  };

  const centerDotVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: [0, 1.2, 1],
      opacity: [0, 0.8, 0.4],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.6, 1]
      } as any
    }
  };

  return (
    <div 
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Ambient Glow */}
      <motion.div
        className="absolute inset-0 rounded-full blur-2xl"
        style={{ backgroundColor: colors.ambient }}
        animate={{
          scale: [0.8, 1.1, 0.8],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        } as any}
      />

      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        style={{ 
          filter: `drop-shadow(0 0 8px ${colors.glow})`
        }}
      >
        <defs>
          <radialGradient id="petalGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colors.dull} stopOpacity="0.2" />
            <stop offset="100%" stopColor={colors.bright} stopOpacity="0.6" />
          </radialGradient>
        </defs>

        {/* Ghost structure for depth */}
        {ANGLES.map((angle, i) => (
          <path
            key={`ghost-${i}`}
            d={PETAL_D}
            style={{
              transform: `rotate(${angle}deg)`,
              transformOrigin: "50px 50px",
            }}
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            strokeOpacity="0.05"
          />
        ))}

        {/* Drawing Petals */}
        {ANGLES.map((angle, i) => (
          <motion.path
            key={`petal-${i}`}
            d={PETAL_D}
            style={{
              transform: `rotate(${angle}deg)`,
              transformOrigin: "50px 50px",
            }}
            fill="none"
            strokeWidth="1.2"
            custom={i}
            variants={petalVariants}
            initial="initial"
            animate="animate"
          />
        ))}

        {/* Core Dot */}
        <motion.circle
          cx="50"
          cy="42"
          r="1.5"
          fill={colors.dull}
          variants={centerDotVariants}
          initial="initial"
          animate="animate"
        />
      </svg>
    </div>
  );
};

export default MirrorLoader;

