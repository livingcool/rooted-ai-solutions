import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SignalInterference = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        const render = () => {
            const w = canvas.width;
            const h = canvas.height;
            const imageData = ctx.createImageData(w, h);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const value = Math.random() * 255;
                data[i] = value;     // R
                data[i + 1] = value; // G
                data[i + 2] = value; // B
                data[i + 3] = 255;   // A
            }

            ctx.putImageData(imageData, 0, 0);

            // Add some occasional "glitch" horizontal lines
            if (Math.random() > 0.9) {
                ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.2})`;
                ctx.fillRect(0, Math.random() * h, w, Math.random() * 10);
            }

            // Scanlines
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            for (let i = 0; i < h; i += 4) {
                ctx.fillRect(0, i, w, 1);
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        // Clear signal after 1.8 seconds
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 1800);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
            clearTimeout(timer);
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ 
                        opacity: 0, 
                        filter: "brightness(2) blur(10px)",
                        scale: 1.1,
                        transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
                    }}
                    className="fixed inset-0 z-[100] pointer-events-none bg-black overflow-hidden"
                >
                    <canvas 
                        ref={canvasRef} 
                        className="w-full h-full object-cover opacity-60 mix-blend-screen"
                    />
                    {/* Retro "NO SIGNAL" text */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0.8, 1, 0.5] }}
                        transition={{ duration: 0.2, repeat: Infinity }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                        <div className="bg-black/80 px-8 py-4 border-2 border-white/20">
                            <span className="text-white font-mono text-2xl md:text-4xl tracking-[0.5em] uppercase font-bold">
                                No Signal
                            </span>
                        </div>
                    </motion.div>
                    
                    {/* Chromatic aberration effect layer */}
                    <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-30 bg-gradient-to-r from-red-500/20 via-transparent to-blue-500/20" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SignalInterference;
