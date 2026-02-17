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

    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
            <motion.div
                style={{ scale, backgroundColor: color, top: `calc(-5vh + ${i * 25}px)` }}
                className="flex flex-col relative -top-[25%] h-[500px] w-[1000px] rounded-3xl p-12 origin-top shadow-2xl border border-white/10"
            >
                <div className="flex h-full gap-12">
                    <div className="w-[40%] relative top-[10%]">
                        <h2 className="text-4xl font-heading font-bold mb-4 text-white">{title}</h2>
                        <p className="text-lg text-white/80 font-sans">{description}</p>
                        <div className="mt-8">
                            {icon}
                        </div>
                    </div>

                    <div className="relative w-[60%] h-full rounded-2xl overflow-hidden border border-white/20">
                        <motion.div
                            className="w-full h-full bg-black/20 backdrop-blur-md flex items-center justify-center"
                            style={{ scale: imageScale }}
                        >
                            {/* Placeholder for image/content */}
                            <div className="opacity-20 text-white w-full h-full flex items-center justify-center p-12 [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-[1]">
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
        <div ref={container} className="relative mt-[50vh] mb-[50vh]">
            {
                content.map((project, i) => {
                    const targetScale = 1 - ((content.length - i) * 0.05);
                    return <Card key={i} i={i} {...project} progress={scrollYProgress} range={[i * .25, 1]} targetScale={targetScale} />
                })
            }
        </div>
    )
}

export default StickyScrollReveal;
