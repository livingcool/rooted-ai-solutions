import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const trailerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        const trailer = trailerRef.current;

        if (!cursor || !trailer) return;

        const onMouseMove = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true);

            // Direct DOM manipulation for performance
            cursor.style.transform = `translate(${e.clientX - 8}px, ${e.clientY - 8}px) scale(${isHovering ? 1.5 : 1})`;
            trailer.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px) scale(${isHovering ? 2 : 1})`;
        };

        const onMouseEnter = () => setIsHovering(true);
        const onMouseLeave = () => setIsHovering(false);

        window.addEventListener("mousemove", onMouseMove);

        // Add hover listeners to interactive elements
        const addListeners = () => {
            const interactiveElements = document.querySelectorAll("a, button, input, textarea, select, [role='button']");
            interactiveElements.forEach((el) => {
                el.addEventListener("mouseenter", onMouseEnter);
                el.addEventListener("mouseleave", onMouseLeave);
            });
            return interactiveElements; // Return for cleanup
        };

        let interactiveEls = addListeners();

        // MutationObserver to handle dynamically added elements
        const observer = new MutationObserver((mutations) => {
            let shouldUpdate = false;
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    shouldUpdate = true;
                }
            });

            if (shouldUpdate) {
                // Clean up old listeners on previously found elements isn't strictly necessary 
                // if we just re-query and re-bind, but to be clean/efficient:
                interactiveEls.forEach(el => {
                    el.removeEventListener("mouseenter", onMouseEnter);
                    el.removeEventListener("mouseleave", onMouseLeave);
                });
                interactiveEls = addListeners();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            interactiveEls.forEach((el) => {
                el.removeEventListener("mouseenter", onMouseEnter);
                el.removeEventListener("mouseleave", onMouseLeave);
            });
            observer.disconnect();
        };
    }, [isVisible, isHovering]);

    if (typeof window === "undefined") return null;

    return (
        <>
            {/* Main Dot */}
            <div
                ref={cursorRef}
                className={cn(
                    "fixed top-0 left-0 z-[9999] w-4 h-4 rounded-full bg-primary pointer-events-none mix-blend-difference transition-opacity duration-300 ease-out hidden md:block",
                    !isVisible && "opacity-0"
                )}
                // Initial style to avoid jumping if possible, though mostly handled by JS
                style={{ transform: 'translate(-100px, -100px)' }}
            />

            {/* Trailing Glow */}
            <div
                ref={trailerRef}
                className={cn(
                    "fixed top-0 left-0 z-[9998] w-8 h-8 rounded-full border border-primary/50 pointer-events-none transition-[opacity,background-color,border-color] duration-300 ease-out hidden md:block",
                    isHovering ? "bg-primary/10 border-primary" : "",
                    !isVisible && "opacity-0"
                )}
                style={{ transform: 'translate(-100px, -100px)' }}
            />
        </>
    );
};

export default CustomCursor;
