import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const RootScrollHero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedCount, setLoadedCount] = useState(0);

    // Total frames in the sequence
    const frameCount = 240;

    // Scroll progress from 0 to 1
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Smooth scroll progress for smoother animation
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 30, // Reduced from 40 for lighter feel
        damping: 25,   // Increased from 20 for less oscillation
        restDelta: 0.001,
    });

    // Map scroll progress to frame index
    const frameIndex = useTransform(smoothProgress, [0, 1], [0, frameCount - 1]);

    // Preload images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const imagePromises = [];

            for (let i = 1; i <= frameCount; i++) {
                const promise = new Promise<void>((resolve, reject) => {
                    const img = new Image();
                    // Format: ezgif-frame-001.jpg, ezgif-frame-010.jpg, ezgif-frame-100.jpg
                    const paddedIndex = i.toString().padStart(3, "0");
                    img.src = `/Sequence/ezgif-frame-${paddedIndex}.jpg`;
                    img.onload = () => {
                        setLoadedCount((prev) => prev + 1);
                        loadedImages[i - 1] = img; // Store in correct index
                        resolve();
                    };
                    img.onerror = (e) => {
                        console.error(`Failed to load frame ${i}`, e);
                        // Resolve anyway to avoid blocking
                        resolve();
                    };
                });
                imagePromises.push(promise);
            }

            await Promise.all(imagePromises);
            setImages(loadedImages);
            setIsLoading(false);
        };

        loadImages();
    }, []);

    // Canvas drawing logic
    useEffect(() => {
        const render = (index: number) => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext("2d");
            if (!canvas || !ctx) return;

            // Clear canvas once per frame
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Frame Blending Logic
            const prevIndex = Math.floor(index);
            const nextIndex = Math.min(Math.ceil(index), frameCount - 1);
            const alpha = index - prevIndex; // Fractional part for blending

            const imgPrev = images[prevIndex];
            const imgNext = images[nextIndex];

            if (!imgPrev) return;

            // Mobile: use "contain" logic to show full width (Math.min behavior-ish, or just limit scale)
            // Desktop: use "cover" logic (Math.max)
            const isMobile = window.innerWidth <= 768;

            let scale;
            if (isMobile) {
                // For mobile, we want to ensure the tree width fits or isn't too zoomed. 
                // Using Math.max might zooom in if image is landscape and screen is portrait.
                // Let's try to fit width primarily, but ensure it covers height if possible, or just standard object-cover but maybe less aggressive?
                // Actually user wants "full look", implying they see cropped sides. 
                // If we use scaling based on WIDTH, it fits the width.
                const scaleWidth = canvas.width / imgPrev.width;
                const scaleHeight = canvas.height / imgPrev.height;

                // If we use the smaller scale, we fit the whole image (contain). 
                // Since bg is black, this is safe.
                scale = Math.max(scaleWidth, scaleHeight * 0.8); // slight hybrid? No, let's trust "contain" concept but maybe ensure it covers enough. 
                // actually, let's just use scaleWidth to ensure full width is visible.
                scale = Math.max(scaleWidth, scaleHeight); // Wait, this IS cover. 

                // If image is 1920x1080 (1.77) and screen is 400x800 (0.5), 
                // scaleWidth = 0.2, scaleHeight = 0.74. 
                // Math.max picks 0.74. Image width becomes 1920*0.74 = 1420. Screen width 400. 
                // Cropped huge.

                // If we pick scaleWidth (0.2), Image width = 384. Screen 400. Fits. 
                // Image height = 1080*0.2 = 216. Screen 800. Black bars top/bottom. 
                // This preserves "full look".
                scale = Math.max(scaleWidth, scaleHeight * 0.5); // Ensure it doesn't get TOO small? 
                // Let's try purely fitting width for "full look". 
                scale = Math.max(scaleWidth, canvas.height / imgPrev.height * 0.6); // Compromise? 
                // Let's just try to prioritize width on mobile.
                if (canvas.height > canvas.width) { // Portrait
                    scale = Math.max(scaleWidth, scaleHeight * 0.6);
                } else {
                    scale = Math.max(scaleWidth, scaleHeight);
                }
            } else {
                scale = Math.max(
                    canvas.width / imgPrev.width,
                    canvas.height / imgPrev.height
                );
            }

            const w = imgPrev.width * scale;
            const h = imgPrev.height * scale;
            const x = (canvas.width - w) / 2;
            const y = (canvas.height - h) / 2;

            // Draw Previous Frame (Base)
            ctx.globalAlpha = 1;
            ctx.drawImage(imgPrev, x, y, w, h);

            // Draw Next Frame (blended overlay)
            if (imgNext && prevIndex !== nextIndex && !isMobile) {
                ctx.globalAlpha = alpha;
                ctx.drawImage(imgNext, x, y, w, h);
            }

            // Restore alpha
            ctx.globalAlpha = 1;
        };

        const unsubscribe = frameIndex.on("change", (latest) => {
            render(latest);
        });

        // Initial render if images are ready
        if (!isLoading && images.length > 0) {
            render(frameIndex.get());
        }

        // Handle resize
        const handleResize = () => {
            if (canvasRef.current && !isLoading && images.length > 0) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                render(frameIndex.get());
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Set initial size

        return () => {
            unsubscribe();
            window.removeEventListener("resize", handleResize);
        };
    }, [isLoading, images, frameIndex]);


    // --- Text Animations ---
    // Opacity Transforms
    const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.25], [0, 1, 1, 0]);
    const opacity2 = useTransform(scrollYProgress, [0.25, 0.3, 0.45, 0.5], [0, 1, 1, 0]);
    const opacity3 = useTransform(scrollYProgress, [0.5, 0.55, 0.7, 0.75], [0, 1, 1, 0]);
    const opacity4 = useTransform(scrollYProgress, [0.75, 0.8], [0, 1]);

    // TranslateY Transforms for subtle movement
    const y1 = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.25], [20, 0, 0, -20]);
    const y2 = useTransform(scrollYProgress, [0.25, 0.3, 0.45, 0.5], [20, 0, 0, -20]);
    const y3 = useTransform(scrollYProgress, [0.5, 0.55, 0.7, 0.75], [20, 0, 0, -20]);
    const y4 = useTransform(scrollYProgress, [0.75, 0.8], [20, 0]);

    // Pointer events control - ensure we can click buttons when visible
    const pointerEvents1 = useTransform(opacity1, (v) => v > 0.5 ? "auto" : "none");
    const pointerEvents2 = useTransform(opacity2, (v) => v > 0.5 ? "auto" : "none");
    const pointerEvents3 = useTransform(opacity3, (v) => v > 0.5 ? "auto" : "none");
    const pointerEvents4 = useTransform(opacity4, (v) => v > 0.5 ? "auto" : "none");


    return (
        <section ref={containerRef} className="relative h-[500vh] bg-black">
            {/* Loading Overlay */}
            {isLoading && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
                    <div className="text-2xl font-bold font-heading animate-pulse tracking-widest">ROOTEDAI</div>
                    <div className="mt-4 w-64 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white transition-all duration-100 ease-out"
                            style={{ width: `${(loadedCount / frameCount) * 100}%` }}
                        />
                    </div>
                    <p className="mt-2 text-xs text-white/50 font-mono">
                        Initializing Neural Interface... {Math.round((loadedCount / frameCount) * 100)}%
                    </p>
                </div>
            )}

            {/* Sticky Canvas Wrapper */}
            <div className={`sticky top-0 h-screen w-full overflow-hidden z-0 transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover will-change-transform"
                />
            </div>

            {/* --- Sticky Text Overlays --- */}
            <div className={`sticky top-0 h-screen w-full z-10 pointer-events-none transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>

                {/* Section 1: Idea to Production */}
                <motion.div
                    style={{ opacity: opacity1, y: y1, pointerEvents: pointerEvents1 }}
                    className="absolute top-[35%] md:top-[40%] left-[5%] md:left-[10vw] max-w-[90%] md:max-w-[600px] text-left"
                >
                    <h2 className="text-4xl md:text-7xl font-bold font-heading tracking-tight mb-4 drop-shadow-2xl bg-clip-text text-transparent bg-gradient-to-br from-gray-100 via-gray-400 to-gray-900">
                        From Idea to <br /><span className="text-gray-300">Production Ready</span>
                    </h2>
                    <p className="text-base md:text-xl text-gray-400 font-light leading-relaxed">
                        Full-stack development expertise. We transform your vision into production-ready software with modern tech and best practices.
                    </p>
                </motion.div>

                {/* Section 2: Full Stack */}
                <motion.div
                    style={{ opacity: opacity2, y: y2, pointerEvents: pointerEvents2 }}
                    className="absolute top-[35%] md:top-[35%] right-[5%] md:right-[10vw] max-w-[90%] md:max-w-[600px] text-right"
                >
                    <h2 className="text-4xl md:text-7xl font-bold font-heading tracking-tight mb-4 drop-shadow-2xl bg-clip-text text-transparent bg-gradient-to-br from-gray-100 via-gray-400 to-gray-900">
                        Full Stack <br /><span className="text-gray-300">Development</span>
                    </h2>
                    <div className="flex flex-col items-end gap-2">
                        <p className="text-lg md:text-2xl text-gray-300 font-medium tracking-wide">
                            Modern Tech Stack • Fast Deployment
                        </p>
                        <p className="text-sm md:text-base text-gray-500 font-mono">
                            Python / React / Node / AI-Native
                        </p>
                    </div>
                </motion.div>

                {/* Section 3: Scalable Solutions */}
                <motion.div
                    style={{ opacity: opacity3, y: y3, pointerEvents: pointerEvents3 }}
                    className="absolute top-[30%] left-1/2 -translate-x-1/2 w-full max-w-[90%] md:max-w-[800px] text-center"
                >
                    <h2 className="text-4xl md:text-7xl font-bold font-heading tracking-tight mb-6 drop-shadow-2xl bg-clip-text text-transparent bg-gradient-to-br from-gray-100 via-gray-400 to-gray-900">
                        Scalable Solutions
                    </h2>
                    <p className="text-base md:text-2xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
                        Enterprise-grade infrastructure rooted in <span className="text-gray-300 font-medium">intelligent automation</span>.
                    </p>
                </motion.div>

                {/* Section 4: Call to Action */}
                <motion.div
                    style={{ opacity: opacity4, y: y4, pointerEvents: pointerEvents4 }}
                    className="absolute top-[40%] left-1/2 -translate-x-1/2 w-full max-w-[90%] md:max-w-[600px] text-center"
                >
                    <h2 className="text-5xl md:text-8xl font-bold font-heading tracking-tighter mb-4 drop-shadow-2xl bg-clip-text text-transparent bg-gradient-to-br from-gray-100 via-gray-400 to-gray-900">
                        Start Building
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 mb-8 font-light">
                        Transform your vision into reality with RootedAI
                    </p>

                    <Button
                        size="lg"
                        className="bg-transparent border border-white text-white hover:bg-white hover:text-black transition-all duration-300 rounded-full px-12 py-8 text-xl group"
                        onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    >
                        Get Started
                        <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-2 animate-bounce"
                >
                    <span className="text-xs uppercase tracking-widest">Scroll to Explore</span>
                    <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
                </motion.div>
            </div>
        </section>
    );
};

export default RootScrollHero;
