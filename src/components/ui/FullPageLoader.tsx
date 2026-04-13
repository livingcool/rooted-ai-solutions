import MirrorLoader from "./MirrorLoader";
import { motion, AnimatePresence } from "framer-motion";

interface FullPageLoaderProps {
  isVisible?: boolean;
}

/**
 * FullPageLoader - A premium, cinematic loading experience for RootedAI.
 * Darkened for high-end aesthetic across all themes.
 */
const FullPageLoader = ({ isVisible = true }: FullPageLoaderProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
           initial={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
           animate={{ 
             opacity: 1, 
             scale: 1, 
             filter: "blur(0px)",
             transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } 
           }}
           exit={{ 
             opacity: 0, 
             scale: 0.95,
             filter: "blur(20px)",
             transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } 
           }}
           className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#030105] backdrop-blur-2xl"
         >
          {/* Immersive Deep Glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[140px] bg-violet-600/10 animate-pulse" />
          </div>

          <div className="relative z-10">
            <MirrorLoader size={140} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullPageLoader;
