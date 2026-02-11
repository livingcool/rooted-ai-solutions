import React from 'react';
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
    ({ children, className, hoverEffect = true, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "glass-panel p-6 relative overflow-hidden",
                    hoverEffect && "glass-card",
                    className
                )}
                {...props}
            >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

                {/* Content */}
                <div className="relative z-10">
                    {children}
                </div>
            </div>
        );
    }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
