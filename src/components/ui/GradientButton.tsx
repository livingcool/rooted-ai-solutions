import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    variant?: 'primary' | 'secondary' | 'icon';
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
    ({ children, className, variant = 'primary', ...props }, ref) => {
        const baseStyles = "relative overflow-hidden font-semibold transition-all duration-300 active:scale-95";

        const variants = {
            primary: "btn-liquid text-white px-8 py-3",
            secondary: "bg-transparent border border-white/20 text-white hover:bg-white/5 px-8 py-3 rounded-full hover:border-white/40",
            icon: "p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 hover:scale-110 transition-transform duration-300 flex items-center justify-center",
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], className)}
                {...props}
            >
                <span className="relative z-10 flex items-center justify-center gap-2">
                    {children}
                </span>
            </button>
        );
    }
);

GradientButton.displayName = "GradientButton";

export { GradientButton };
