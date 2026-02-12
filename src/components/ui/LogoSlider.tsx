import React from "react";
import { cn } from "@/lib/utils";

export interface LogoSliderProps {
    logos: React.ReactNode[];
    speed?: number;
    direction?: "left" | "right";
    className?: string;
}

export function LogoSlider({
    logos,
    speed = 60,
    direction = "left",
    className,
}: LogoSliderProps) {
    // Duration = total width / speed. We approximate total width ~ logos.length * 120px per logo
    // The CSS animation uses percentage-based translateX, so duration just controls pace.
    const duration = Math.max(10, (logos.length * 120) / speed);

    return (
        <div
            className={cn(
                "relative flex items-center overflow-hidden h-20",
                className
            )}
        >
            {/* Edge fade gradients */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-[#050505] to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-[#050505] to-transparent z-20 pointer-events-none" />

            {/* Scrolling track — 3 copies for seamless loop */}
            {[0, 1, 2].map((copyIndex) => (
                <div
                    key={copyIndex}
                    className="flex shrink-0 items-center gap-12 px-6"
                    style={{
                        animation: `logo-slide ${duration}s linear infinite`,
                        animationDirection: direction === "right" ? "reverse" : "normal",
                    }}
                    aria-hidden={copyIndex > 0}
                >
                    {logos.map((logo, idx) => (
                        <div
                            key={`${copyIndex}-${idx}`}
                            className="flex items-center justify-center p-2 transition-transform duration-300 hover:scale-110 cursor-pointer shrink-0"
                        >
                            {logo}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
