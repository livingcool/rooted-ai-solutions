"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { RootedLogoMark, RootedLogoType } from "./icons/RootedLogo";

export const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [animationType, setAnimationType] = useState<"logo" | "blog" | "services" | "casestudies" | "products" | "careers" | "contact" | "default">("logo");
    const location = useLocation();

    useEffect(() => {
        // Reset loading state on route change
        setIsLoading(true);

        // Determine Animation Type based on Route
        const path = location.pathname;
        if (path === "/" || path === "/about") {
            setAnimationType("logo");
        } else if (path.startsWith("/blog")) {
            setAnimationType("blog");
        } else if (path.startsWith("/services")) {
            setAnimationType("services");
        } else if (path.startsWith("/case-studies")) {
            setAnimationType("casestudies");
        } else if (path.startsWith("/products")) {
            setAnimationType("products");
        } else if (path.startsWith("/careers")) {
            setAnimationType("careers");
        } else if (path.startsWith("/contact")) {
            setAnimationType("contact");
        } else {
            setAnimationType("default");
        }

        // Simulating load time for effect (since this is a transition loader)
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500); // Slightly longer to appreciate the animation

        return () => clearTimeout(timer);
    }, [location.pathname]);

    const containerVariants = {
        initial: { opacity: 1 },
        exit: {
            y: "-100%",
            transition: {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.2,
            },
        },
    };

    const markVariants = {
        hidden: { pathLength: 0, opacity: 0, fill: "rgba(255, 255, 255, 0)" },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: { pathLength: { duration: 1.5, ease: "easeInOut" }, opacity: { duration: 0.2 } },
        },
        filled: {
            fill: "rgba(255, 255, 255, 1)",
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    // Reusable Emoji Loader Component
    const EmojiLoader = ({ emoji, text }: { emoji: string, text: string }) => (
        <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="flex flex-col items-center gap-4"
        >
            <div className="text-[6rem] md:text-[8rem] filter drop-shadow-2xl animate-bounce">
                {emoji}
            </div>
            <h2 className="text-white text-2xl font-heading tracking-widest uppercase animate-pulse text-center">
                {text}
            </h2>
        </motion.div>
    );

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key={location.pathname} // Force re-render on path change
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
                    variants={containerVariants}
                    initial="initial"
                    exit="exit"
                >
                    {/* Background Grid */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                        style={{
                            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                            backgroundSize: "50px 50px"
                        }}
                    />

                    <div className="relative z-10 flex flex-col items-center gap-6">
                        {animationType === "logo" && (
                            <>
                                <div className="w-24 h-24 md:w-32 md:h-32 text-white">
                                    <RootedLogoMark
                                        className="w-full h-full"
                                        variant={markVariants}
                                        initial="hidden"
                                        animate={["visible", "filled"]}
                                    />
                                </div>
                                <div className="w-48 md:w-64 h-auto">
                                    <RootedLogoType
                                        className="w-full h-auto object-contain invert brightness-0 filter"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.6, duration: 0.8 }}
                                    />
                                </div>
                            </>
                        )}

                        {animationType === "blog" && <EmojiLoader emoji="🤔" text="Loading Thoughts..." />}
                        {animationType === "services" && <EmojiLoader emoji="⚙️" text="Initializing Services..." />}
                        {animationType === "casestudies" && <EmojiLoader emoji="📈" text="Analyzing Data..." />}
                        {animationType === "products" && <EmojiLoader emoji="🚀" text="Preparing Launch..." />}
                        {animationType === "careers" && <EmojiLoader emoji="💼" text="Reviewing Opportunities..." />}
                        {animationType === "contact" && <EmojiLoader emoji="📬" text="Establishing Connection..." />}

                        {animationType === "default" && (
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="flex flex-col items-center gap-4"
                            >
                                <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                                <h2 className="text-white/60 text-sm tracking-widest uppercase">
                                    Initialize...
                                </h2>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
