import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PageTransition = ({ children, className }: { children: ReactNode; className?: string }) => {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 30, filter: "blur(10px)", scale: 0.98 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, y: -30, filter: "blur(10px)", scale: 1.02 }}
            transition={{ 
                duration: 0.5, 
                ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for a cinematic snap
            }}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
