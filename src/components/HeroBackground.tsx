import { useEffect, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";

const HeroBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let mouse = { x: -1000, y: -1000 };
        let isDark = document.documentElement.classList.contains('dark');

        // Configuration based on theme
        const getColors = () => {
            isDark = document.documentElement.classList.contains('dark');
            return {
                particleColor: isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)",
                lineColor: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)"
            };
        };

        let { particleColor, lineColor } = getColors();

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
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
                this.size = 2; // Fixed visible dots
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
                const distance = Math.sqrt(dx * dx + dy * dy);
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const maxDistance = 300; // Interaction radius
                const force = (maxDistance - distance) / maxDistance;
                const directionX = forceDirectionX * force * this.density;
                const directionY = forceDirectionY * force * this.density;

                if (distance < maxDistance) {
                    // Repel particles from mouse
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    // Return to original position (elastic effect)
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
            // Create a grid of particles
            const spacing = 40; // Space between dots
            for (let y = 0; y < canvas.height; y += spacing) {
                for (let x = 0; x < canvas.width; x += spacing) {
                    particles.push(new Particle(x, y));
                }
            }
        };

        const connect = () => {
            let opacityValue = 1;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = dx * dx + dy * dy; // optimization (squared distance)

                    if (distance < 3600) { // 60 * 60 = 3600 (connection distance)
                        opacityValue = 1 - (distance / 3600);
                        ctx.strokeStyle = lineColor.replace(/[\d.]+\)$/g, `${opacityValue * 0.2})`); // Use base color with dynamic alpha
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].draw();
                particles[i].update();
            }
            connect();
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        // MutationObserver to detect class changes on html element
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    const colors = getColors();
                    particleColor = colors.particleColor;
                    lineColor = colors.lineColor;
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove);

        resize();
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
            observer.disconnect();
        };
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden">
            {/* Gradient Background Layer */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-black dark:via-gray-900 dark:to-black transition-colors duration-500" />

            {/* Radial Gradient Overlay for depth */}
            <div className="absolute inset-0 w-full h-full opacity-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-200/50 via-transparent to-transparent dark:from-gray-800/50 dark:via-transparent dark:to-transparent" />

            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ opacity: 0.8 }}
            />
        </div>
    );
};

export default HeroBackground;
