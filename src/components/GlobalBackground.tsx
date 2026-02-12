import { useEffect, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";

interface GlobalBackgroundProps {
    paused?: boolean;
}

const GlobalBackground = ({ paused = false }: GlobalBackgroundProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();
    const pausedRef = useRef(paused);

    useEffect(() => {
        pausedRef.current = paused;
    }, [paused]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let mouse = { x: -1000, y: -1000 };
        let isDark = document.documentElement.classList.contains('dark');
        let isHeroVisible = true;

        // Configuration based on theme
        const getColors = () => {
            isDark = document.documentElement.classList.contains('dark');
            return {
                particleColor: isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.4)",
            };
        };

        let { particleColor } = getColors();

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        let resizeTimeout: NodeJS.Timeout;
        const debouncedResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resize, 200);
        };

        class Particle {
            x: number;
            y: number;
            baseX: number;
            baseY: number;
            size: number;
            density: number;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.baseX = x;
                this.baseY = y;
                this.size = 1.5;
                this.density = (Math.random() * 30) + 1;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = particleColor;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update() {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;

                if (Math.abs(dx) > 300 || Math.abs(dy) > 300) {
                    if (this.x !== this.baseX) {
                        const dx = this.x - this.baseX;
                        this.x -= dx / 10;
                    }
                    if (this.y !== this.baseY) {
                        const dy = this.y - this.baseY;
                        this.y -= dy / 10;
                    }
                    return;
                }

                const distance = Math.sqrt(dx * dx + dy * dy);
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const maxDistance = 300;
                const force = (maxDistance - distance) / maxDistance;
                const directionX = forceDirectionX * force * this.density;
                const directionY = forceDirectionY * force * this.density;

                if (distance < maxDistance) {
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    if (this.x !== this.baseX) {
                        const dx = this.x - this.baseX;
                        this.x -= dx / 10;
                    }
                    if (this.y !== this.baseY) {
                        const dy = this.y - this.baseY;
                        this.y -= dy / 10;
                    }
                }
            }
        }

        const initParticles = () => {
            particles = [];
            const isMobile = window.innerWidth < 768;
            const spacing = isMobile ? 80 : 60;
            for (let y = 0; y < canvas.height; y += spacing) {
                for (let x = 0; x < canvas.width; x += spacing) {
                    particles.push(new Particle(x, y));
                }
            }
        };

        const animate = () => {
            // Pause if prop is set OR if Hero section is covering the screen (roughly top 80vh)
            if (pausedRef.current || (isHeroVisible && window.scrollY < window.innerHeight * 0.8)) {
                animationFrameId = requestAnimationFrame(animate);
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].draw();
                particles[i].update();
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleScroll = () => {
            isHeroVisible = window.scrollY < window.innerHeight;
        };

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    const colors = getColors();
                    particleColor = colors.particleColor;
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });

        window.addEventListener("resize", debouncedResize);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("scroll", handleScroll, { passive: true });

        resize();
        animate();

        return () => {
            window.removeEventListener("resize", debouncedResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", handleScroll);
            cancelAnimationFrame(animationFrameId);
            observer.disconnect();
            clearTimeout(resizeTimeout);
        };
    }, []);

    return (
        <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-black dark:via-gray-900 dark:to-black transition-colors duration-500" />
            <div className="absolute inset-0 w-full h-full opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-200/40 via-transparent to-transparent dark:from-gray-800/40 dark:via-transparent dark:to-transparent" />

            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ opacity: 0.5 }}
            />
        </div>
    );
};

export default GlobalBackground;
