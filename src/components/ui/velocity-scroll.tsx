import { useRef } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame
} from "framer-motion";
import { wrap } from "@motionone/utils";

interface VelocityScrollProps {
    text: string;
    default_velocity?: number;
    className?: string;
}

interface ParallaxTextProps {
    children: string;
    baseVelocity: number;
    className?: string;
}

function ParallaxText({ children, baseVelocity = 100, className }: ParallaxTextProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);

    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="parallax">
            <motion.div className="scroller flex flex-nowrap whitespace-nowrap" style={{ x }}>
                <span className={`block mr-8 ${className}`}>{children} </span>
                <span className={`block mr-8 ${className}`}>{children} </span>
                <span className={`block mr-8 ${className}`}>{children} </span>
                <span className={`block mr-8 ${className}`}>{children} </span>
            </motion.div>
        </div>
    );
}

const VelocityScroll = ({ text, default_velocity = 5, className }: VelocityScrollProps) => {
    return (
        <section className="relative w-full overflow-hidden tracking-[-2px] leading-[0.8] m-0 whitespace-nowrap flex flex-col flex-nowrap">
            <ParallaxText baseVelocity={default_velocity} className={className}>
                {text}
            </ParallaxText>
            <ParallaxText baseVelocity={-default_velocity} className={className}>
                {text}
            </ParallaxText>
        </section>
    );
};

export default VelocityScroll;
