import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Item {
    id: number;
    title: string;
    description: string;
    image: string;
    role?: string;
}

interface TestimonialsCardProps {
    items: Item[];
    onChange?: (index: number) => void;
    className?: string;
}

export const TestimonialsCard = ({ items, onChange, className }: TestimonialsCardProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => {
            const newIndex = (prev + 1) % items.length;
            onChange?.(newIndex);
            return newIndex;
        });
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => {
            const newIndex = (prev - 1 + items.length) % items.length;
            onChange?.(newIndex);
            return newIndex;
        });
    };

    useEffect(() => {
        // Notify parent of initial index
        onChange?.(currentIndex);
    }, []);

    if (!items || items.length === 0) return null;

    const currentItem = items[currentIndex];

    return (
        <div className={cn("relative w-full max-w-4xl mx-auto px-4", className)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white dark:bg-neutral-900/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 md:p-12 shadow-xl">

                {/* Left: Image */}
                <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-lg bg-neutral-100 dark:bg-neutral-800">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentItem.id} // Re-render image on change
                            src={currentItem.image}
                            alt={currentItem.title}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }} // Fade out slightly smaller
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 w-full h-full object-cover object-center"
                            onError={(e) => {
                                // Fallback for missing images
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement?.classList.add('fallback-active');
                            }}
                        />
                        {/* Fallback Initial */}
                        <div className={`absolute inset-0 flex items-center justify-center bg-neutral-200 dark:bg-neutral-800 text-4xl font-bold text-neutral-400 dark:text-neutral-600 -z-10`}>
                            {currentItem.title.charAt(0)}
                        </div>
                    </AnimatePresence>
                </div>

                {/* Right: Content */}
                <div className="flex flex-col justify-center space-y-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                        >
                            <h3 className="text-3xl md:text-4xl font-bold text-black dark:text-white font-heading">
                                {currentItem.title}
                            </h3>
                            {currentItem.role && (
                                <p className="text-sm font-medium text-primary uppercase tracking-wider">
                                    {currentItem.role}
                                </p>
                            )}
                            <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed font-light">
                                "{currentItem.description}"
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Controls */}
                    <div className="flex items-center gap-4 pt-4">
                        <button
                            onClick={handlePrev}
                            className="p-3 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-black dark:text-white transition-colors"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <button
                            onClick={handleNext}
                            className="p-3 rounded-full bg-black dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-black transition-colors"
                        >
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
