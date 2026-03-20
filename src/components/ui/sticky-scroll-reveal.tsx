import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

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
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    })

    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])
    const scale = useTransform(progress, range, [1, targetScale]);
    const opacity = useTransform(progress, range, [1, 0.6]);
    const top = useTransform(progress, range, ["0vh", `calc(5vh + ${i * 30}px)`]);

    return (
        <div ref={container} className="h-[80vh] lg:h-screen flex items-center justify-center sticky top-0">
            <motion.div
                style={{ 
                    scale, 
                    opacity,
                    backgroundColor: color, 
                    top: `calc(5vh + ${i * 20}px)`, // More compact on mobile
                    zIndex: i + 1
                }}
                className="flex flex-col relative h-auto min-h-[450px] lg:h-[550px] w-full max-w-[1100px] mx-4 rounded-3xl p-8 lg:p-12 origin-top shadow-2xl border border-white/10"
            >
                <div className="flex flex-col lg:flex-row h-full gap-8 lg:gap-12">
                    <div className="w-full lg:w-[40%] relative lg:top-[10%]">
                        <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4 text-white leading-tight">{title}</h2>
                        <p className="text-base lg:text-lg text-white/80 font-sans">{description}</p>
                        <div className="mt-6 lg:mt-8">
                            <div className="p-3 bg-white/10 w-fit rounded-xl border border-white/10">
                                {React.cloneElement(icon as React.ReactElement, { className: "w-8 h-8 lg:w-12 lg:h-12 text-white" })}
                            </div>
                        </div>
                    </div>

                    <div className="relative w-full lg:w-[60%] h-48 lg:h-full rounded-2xl overflow-hidden border border-white/20">
                        <motion.div
                            className="w-full h-full bg-black/20 backdrop-blur-md flex items-center justify-center"
                            style={{ scale: imageScale }}
                        >
                            <div className="opacity-20 text-white w-full h-full flex items-center justify-center p-8 lg:p-12 [&>svg]:w-24 lg:[&>svg]:w-full [&>svg]:h-24 lg:[&>svg]:h-full [&>svg]:stroke-[1]">
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
