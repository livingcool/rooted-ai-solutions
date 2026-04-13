import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PETAL_PATH = "M 50 42 C 50 15, 85 15, 80 45 C 75 75, 55 65, 50 42";
const ANGLES = [0, 60, 120, 180, 240, 300];
const COL_LIGHT = "#c5bef8";
const COL_DEEP = "#8b7ff0";

const Petal = ({ angle, index }: { angle: number; index: number }) => {
  return (
    <g transform={`rotate(${angle}, 50, 50)`}>
      {/* Ghost Path */}
      <path
        d={PETAL_PATH}
        fill="none"
        stroke={COL_LIGHT}
        strokeWidth="1.5"
        strokeLinecap="round"
        className="opacity-[0.08]"
      />
      {/* Animated Path */}
      <motion.path
        d={PETAL_PATH}
        fill="none"
        stroke={COL_LIGHT}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: 1, 
          opacity: 0.7,
          transition: {
            pathLength: { delay: 0.2 + index * 0.2, duration: 0.6, ease: "easeInOut" },
            opacity: { delay: 0.2 + index * 0.2, duration: 0.3 }
          }
        }}
      />
    </g>
  );
};

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // The total animation duration for all petals is 0.2 (start) + 5 * 0.2 (last stagger) + 0.6 (duration) = 1.8s
    // We add a small buffer for the final pulse visual in the original
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#030614]"
        >
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Background Atmosphere */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0.05, 0.15, 0.05], scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-indigo-500/20 blur-[80px] rounded-full"
            />
            
            <svg
              viewBox="0 0 100 100"
              className="w-40 h-40 md:w-56 md:h-56 overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Central Pulse Dot */}
              <motion.circle
                cx="50"
                cy="50"
                r="1.8"
                fill={COL_DEEP}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                style={{ filter: "url(#glow)" }}
              />

              {/* The Petals */}
              {ANGLES.map((angle, i) => (
                <Petal key={angle} angle={angle} index={i} />
              ))}

              {/* Completion Highlight */}
              <motion.circle
                cx="50"
                cy="50"
                r="2.2"
                fill="white"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 2] }}
                transition={{ delay: 2.2, duration: 0.8 }}
              />
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
