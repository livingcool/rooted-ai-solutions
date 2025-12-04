import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        window.addEventListener("mousemove", updatePosition);

        // Add hover listeners to interactive elements
        const interactiveElements = document.querySelectorAll("a, button, input, textarea, select, [role='button']");
        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);
        });

        // MutationObserver to handle dynamically added elements
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    const newInteractiveElements = document.querySelectorAll("a, button, input, textarea, select, [role='button']");
                    newInteractiveElements.forEach((el) => {
                        el.removeEventListener("mouseenter", handleMouseEnter);
                        el.removeEventListener("mouseleave", handleMouseLeave);
                        el.addEventListener("mouseenter", handleMouseEnter);
                        el.addEventListener("mouseleave", handleMouseLeave);
                    });
                }
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", updatePosition);
            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleMouseEnter);
                el.removeEventListener("mouseleave", handleMouseLeave);
            });
            observer.disconnect();
        };
    }, [isVisible]);

    if (typeof window === "undefined") return null;

    return (
        <>
            {/* Main Dot */}
            <div
                className={cn(
                    "fixed top-0 left-0 z-[9999] w-4 h-4 rounded-full bg-primary pointer-events-none mix-blend-difference transition-transform duration-100 ease-out hidden md:block",
                    isHovering ? "scale-150" : "scale-100",
                    !isVisible && "opacity-0"
                )}
                style={{
                    transform: `translate(${position.x - 8}px, ${position.y - 8}px) scale(${isHovering ? 1.5 : 1})`,
                }}
            />

            {/* Trailing Glow */}
            <div
                className={cn(
                    "fixed top-0 left-0 z-[9998] w-8 h-8 rounded-full border border-primary/50 pointer-events-none transition-all duration-300 ease-out hidden md:block",
                    isHovering ? "scale-150 bg-primary/10 border-primary" : "scale-100",
                    !isVisible && "opacity-0"
                )}
                style={{
                    transform: `translate(${position.x - 16}px, ${position.y - 16}px) scale(${isHovering ? 2 : 1})`,
                }}
            />
        </>
    );
};

export default CustomCursor;
