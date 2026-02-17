import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ParallaxFloating = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
    const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
    const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -180]);

    return (
        <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Floating Element 1 - Top Right */}
            <motion.div
                style={{ y: y1, rotate: rotate1 }}
                className="absolute top-[10%] right-[5%] w-64 h-64 rounded-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent blur-3xl"
            />

            {/* Floating Element 2 - Bottom Left */}
            <motion.div
                style={{ y: y2, rotate: rotate2 }}
                className="absolute bottom-[20%] left-[5%] w-96 h-96 rounded-full bg-gradient-to-tr from-cyan-500/10 via-blue-500/5 to-transparent blur-[100px]"
            />

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </div>
    );
};

export default ParallaxFloating;
