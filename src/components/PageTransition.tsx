import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PageTransition = ({ children, className }: { children: ReactNode; className?: string }) => {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ 
                duration: 0.8, 
                ease: [0.22, 1, 0.36, 1] 
            }}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
