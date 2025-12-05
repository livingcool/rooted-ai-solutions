import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const GlobalBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Parallax layers moving at different speeds
    const starsY = useTransform(scrollY, [0, 1000], [0, 300]); // Stars move slower
    const gridY = useTransform(scrollY, [0, 1000], [0, 100]); // Grid moves very slowly
    const nebulaY = useTransform(scrollY, [0, 1000], [0, 500]); // Nebula moves faster

    return (
        <div className="fixed inset-0 z-[-1] bg-black overflow-hidden">
            {/* Deep Space Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050505] to-[#0a0a0a]" />

            {/* Parallax Stars */}
            <motion.div
                style={{ y: starsY }}
                className="absolute inset-0 opacity-40"
            >
                <div className="absolute w-[2px] h-[2px] bg-white rounded-full top-10 left-20 animate-pulse" />
                <div className="absolute w-[3px] h-[3px] bg-white/50 rounded-full top-40 left-80 animate-pulse delay-75" />
                <div className="absolute w-[1px] h-[1px] bg-white rounded-full top-60 left-40 animate-pulse delay-150" />
                {/* Generate more random stars via CSS or JS loop for better effect if needed */}
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white animate-pulse"
                        style={{
                            width: Math.random() * 2 + "px",
                            height: Math.random() * 2 + "px",
                            top: Math.random() * 100 + "%",
                            left: Math.random() * 100 + "%",
                            opacity: Math.random() * 0.5 + 0.1,
                            animationDelay: Math.random() * 5 + "s",
                        }}
                    />
                ))}
            </motion.div>

            {/* Parallax Grid */}
            <motion.div
                style={{ y: gridY }}
                className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
            />

            {/* Parallax Nebula/Glow */}
            <motion.div
                style={{ y: nebulaY }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-white/5 blur-[100px] rounded-full mix-blend-screen pointer-events-none"
            />
        </div>
    );
};

export default GlobalBackground;
