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
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay, ease: [0.215, 0.61, 0.355, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default RevealOnScroll;
