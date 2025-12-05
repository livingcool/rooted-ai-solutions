import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealOnScrollProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

const RevealOnScroll = ({ children, className = "", delay = 0.1 }: RevealOnScrollProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 75 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default RevealOnScroll;
