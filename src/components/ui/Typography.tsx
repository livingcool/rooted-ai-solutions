import React from 'react';
import { cn } from "@/lib/utils";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
    className?: string;
    gradient?: boolean;
}

export const H1 = ({ children, className, gradient = true, ...props }: HeadingProps) => (
    <h1
        className={cn(
            "text-5xl md:text-7xl font-bold tracking-tight mb-6",
            gradient && "text-gradient",
            className
        )}
        {...props}
    >
        {children}
    </h1>
);

export const H2 = ({ children, className, gradient = true, ...props }: HeadingProps) => (
    <h2
        className={cn(
            "text-4xl md:text-5xl font-bold tracking-tight mb-4",
            gradient && "text-gradient",
            className
        )}
        {...props}
    >
        {children}
    </h2>
);

export const H3 = ({ children, className, gradient = false, ...props }: HeadingProps) => (
    <h3
        className={cn(
            "text-2xl md:text-3xl font-semibold tracking-tight mb-3",
            gradient && "text-gradient-subtle",
            className
        )}
        {...props}
    >
        {children}
    </h3>
);

export const Paragraph = ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
        className={cn(
            "text-lg text-muted-foreground leading-relaxed",
            className
        )}
        {...props}
    >
        {children}
    </p>
);
