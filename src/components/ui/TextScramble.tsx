import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface TextScrambleProps {
    text: string;
    className?: string;
    duration?: number;
    characterSet?: string;
}

const TextScramble = ({
    text,
    className = "",
    duration = 1.5,
    characterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?",
}: TextScrambleProps) => {
    const [displayText, setDisplayText] = useState("");
    const [isAnimating, setIsAnimating] = useState(false);
    const elementRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        let frame = 0;
        const totalFrames = duration * 60; // Assuming 60fps
        let animationId: number;

        const animate = () => {
            frame++;
            const progress = frame / totalFrames;

            let scrambled = "";
            for (let i = 0; i < text.length; i++) {
                // "Cooling" effect: characters freeze from left to right
                if (i < Math.floor(progress * text.length)) {
                    scrambled += text[i];
                } else if (text[i] === ' ') {
                    scrambled += ' ';
                } else {
                    scrambled += characterSet[Math.floor(Math.random() * characterSet.length)];
                }
            }

            setDisplayText(scrambled);

            if (frame < totalFrames) {
                animationId = requestAnimationFrame(animate);
            } else {
                setDisplayText(text);
                setIsAnimating(false);
            }
        };

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isAnimating) {
                    setIsAnimating(true);
                    frame = 0;
                    animate();
                }
            },
            { threshold: 0.1 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            cancelAnimationFrame(animationId);
            observer.disconnect();
        };
    }, [text, duration, characterSet]);

    return (
        <motion.span
            ref={elementRef}
            className={`inline-block font-mono ${className}`}
        >
            {displayText}
        </motion.span>
    );
};

export default TextScramble;
