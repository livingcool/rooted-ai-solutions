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
                particleColor: isDark ? "rgba(99, 102, 241, 0.8)" : "rgba(79, 70, 229, 0.8)",
                lineColor: isDark ? "rgba(168, 85, 247, 0.2)" : "rgba(147, 51, 234, 0.2)"
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
                // Quick check for mouse interaction distance
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
            const isMobile = window.innerWidth < 768;
            const spacing = isMobile ? 60 : 40; // Increased spacing on mobile for fewer particles

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

                    // Quick check - significantly improves performance by avoiding sqrt and further calcs
                    if (Math.abs(dx) > 60 || Math.abs(dy) > 60) continue;

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
            {/* Deep space background */}
            <div className="absolute inset-0 w-full h-full bg-[#030014] transition-colors duration-1000" />
            
            {/* Primary Gradient Mesh */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_20%,_rgba(99,102,241,0.15)_0%,_transparent_50%),radial-gradient(circle_at_80%_80%,_rgba(168,85,247,0.15)_0%,_transparent_50%)]" />

            {/* Technical Grid Pattern */}
            <div 
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]" 
                style={{ 
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }} 
            />

            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ opacity: 0.8 }}
            />
        </div>
    );
};

export default HeroBackground;
