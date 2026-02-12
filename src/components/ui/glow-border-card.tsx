import React from "react";
import { cn } from "@/lib/utils";

type ColorPreset = "aurora" | "blue" | "danger" | "success";

interface GlowBorderCardProps extends React.HTMLAttributes<HTMLDivElement> {
    width?: string;
    height?: string;
    aspectRatio?: string | number;
    colorPreset?: ColorPreset;
    animationDuration?: number;
    borderWidth?: number;
    children?: React.ReactNode;
}

const presets = {
    aurora: "from-white via-slate-200 to-neutral-400", // Changed to metallic/silver
    blue: "from-cyan-400 via-blue-500 to-indigo-600",
    danger: "from-red-400 via-orange-500 to-yellow-600",
    success: "from-green-400 via-emerald-500 to-teal-600",
} as const;

export function GlowBorderCard({
    width = "100%",
    height = "100%",
    aspectRatio,
    colorPreset = "aurora",
    animationDuration = 4,
    borderWidth = 2,
    className,
    children,
    ...props
}: GlowBorderCardProps) {
    return (
        <div
            className={cn("relative group rounded-xl overflow-hidden bg-white dark:bg-black", className)}
            style={{
                width,
                height,
                aspectRatio: aspectRatio ? String(aspectRatio) : undefined,
            }}
            {...props}
        >
            {/* Animated Border Gradient */}
            <div
                className="absolute inset-0 z-0 overflow-hidden"
                style={{ margin: -borderWidth }}
            >
                <div
                    className={cn(
                        "absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                        // We use a conic gradient mask or similar technique usually, but for a simple "glow border" 
                        // typically we rotate a conic gradient behind.
                        // Let's us a simple rotating gradient approach.
                    )}
                    style={{
                        animationDuration: `${animationDuration}s`,
                        background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 270deg, var(--glow-color) 360deg)`
                    }}
                />
                {/* Using a simpler approach: A rotating gradient blob behind */}
                <div
                    className={cn(
                        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-gradient-to-r skew-y-12 animate-[spin_4s_linear_infinite] opacity-100",
                        presets[colorPreset]
                    )}
                    style={{
                        animationDuration: `${animationDuration}s`,
                    }}
                />
            </div>

            {/* Inner Content Mask */}
            <div
                className="relative z-10 h-full w-full bg-white dark:bg-black rounded-[inherit]"
                style={{ margin: borderWidth }}
            >
                <div className="h-full w-full rounded-[inherit] overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
}
