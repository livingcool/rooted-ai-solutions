import React, { useRef, useState } from "react";
import { useScroll, useTransform, motion, MotionValue, useMotionValue, useSpring, useVelocity } from "framer-motion";

interface CardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    i: number;
    progress: MotionValue<number>;
    range: [number, number];
    targetScale: number;
}

const Card = ({ title, description, icon, color, i, progress, range, targetScale }: CardProps) => {
    const container = useRef(null);
    const { scrollYProgress, scrollY } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    });

    // Velocity Skew Logic
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
    const velocitySkew = useTransform(smoothVelocity, [-1000, 0, 1000], [4, 0, -4]);

    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);
    const opacity = useTransform(progress, range, [1, 0.6]);

    // 3D Tilt Logic
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mouseX.set(x / rect.width);
        mouseY.set(y / rect.height);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        // Reset tilt quickly but smoothly
        mouseX.set(0.5);
        mouseY.set(0.5);
    };

    const handleMouseEnter = () => setIsHovered(true);

    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), springConfig);

    // Dynamic Glare calculations
    const glareX = useSpring(useTransform(mouseX, [0, 1], [0, 100]), springConfig);
    const glareY = useSpring(useTransform(mouseY, [0, 1], [0, 100]), springConfig);
    const glareOpacity = useSpring(isHovered ? 1 : 0, { damping: 20, stiffness: 100 });

    return (
        <div ref={container} className="h-[80vh] lg:h-screen flex items-center justify-center sticky top-0 [perspective:2000px]">
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
                style={{ 
                    scale, 
                    opacity,
                    rotateX,
                    rotateY,
                    skewY: velocitySkew,
                    backgroundColor: color, 
                    top: `calc(5vh + ${i * 20}px)`, // More compact on mobile
                    zIndex: i + 1,
                    transformStyle: "preserve-3d"
                }}

                className="flex flex-col relative h-auto min-h-[450px] lg:h-[550px] w-full max-w-[1100px] mx-4 rounded-3xl p-8 lg:p-12 origin-top shadow-2xl border border-white/5 overflow-hidden group"
            >
                {/* Dynamic Glare Layer */}
                <motion.div
                    className="absolute inset-0 z-50 pointer-events-none mix-blend-overlay rounded-3xl"
                    style={{
                        background: useTransform(
                            [glareX, glareY],
                            ([x, y]) => `radial-gradient(circle 600px at ${x}% ${y}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 80%)`
                        ),
                        opacity: glareOpacity
                    }}
                />

                <div className="flex flex-col lg:flex-row h-full gap-8 lg:gap-12 relative z-10 [transform:translateZ(30px)]">
                    <div className="w-full lg:w-[40%] relative lg:top-[10%]">
                        <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4 text-white leading-tight drop-shadow-md">{title}</h2>
                        <p className="text-base lg:text-lg text-white/80 font-sans">{description}</p>
                        <div className="mt-6 lg:mt-8">
                            <div className="p-3 bg-white/10 w-fit rounded-xl border border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                {React.cloneElement(icon as React.ReactElement, { className: "w-8 h-8 lg:w-12 lg:h-12 text-white drop-shadow-lg" } as any)}
                            </div>
                        </div>
                    </div>

                    <div className="relative w-full lg:w-[60%] h-48 lg:h-full rounded-2xl overflow-hidden border border-white/10 [transform:translateZ(50px)] shadow-2xl">
                        <motion.div
                            className="w-full h-full bg-black/20 backdrop-blur-md flex items-center justify-center transition-all duration-700 group-hover:bg-black/10"
                            style={{ scale: imageScale }}
                        >
                            <div className="opacity-20 text-white w-full h-full flex items-center justify-center p-8 lg:p-12 [&>svg]:w-24 lg:[&>svg]:w-full [&>svg]:h-24 lg:[&>svg]:h-full [&>svg]:stroke-[1] transform transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40">
                                {icon}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

const StickyScrollReveal = ({ content }: { content: any[] }) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })

    return (
        <div ref={container} className="relative mt-8 md:mt-12 mb-12 md:mb-24">
            {
                content.map((project, i) => {
                    const targetScale = 1 - ((content.length - i) * 0.05);
                    const start = i * (1 / content.length);
                    const end = (i + 1) * (1 / content.length);
                    return <Card 
                        key={i} 
                        i={i} 
                        {...project} 
                        progress={scrollYProgress} 
                        range={[start, end]} 
                        targetScale={targetScale} 
                    />
                })
            }
        </div>
    )
}

export default StickyScrollReveal;
