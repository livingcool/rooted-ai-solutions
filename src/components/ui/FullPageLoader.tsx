import MirrorLoader from "./MirrorLoader";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "../ThemeProvider";

interface FullPageLoaderProps {
  isVisible?: boolean;
}

const FullPageLoader = ({ isVisible = true }: FullPageLoaderProps) => {
  const [status, setStatus] = useState("READING.");
  const { theme } = useTheme();
  
  const resolvedTheme = theme === "system" 
    ? (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    : theme;

  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    if (!isVisible) return;

    let index = 0;
    const statuses = ["READING.", "REFLECTING.", "PROCESSING.", "READY."];
    
    const interval = setInterval(() => {
      index = (index + 1) % statuses.length;
      setStatus(statuses[index]);
    }, 1200);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 0.5 }}
           className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden ${
             isDark ? "bg-[#0f051a]" : "bg-[#ebebf0]"
           }`}
         >
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] ${
              isDark ? "bg-[#a78bfa]/5" : "bg-[#1a0b2e]/5"
            }`} />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-10">
            <MirrorLoader size={120} />
            
            <div className="h-6 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={status}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className={`text-[11px] font-mono tracking-[0.5em] uppercase ${
                    isDark ? "text-[#c5bef8]/80" : "text-[#1a0b2e]/60"
                  }`}
                >
                  {status}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullPageLoader;

