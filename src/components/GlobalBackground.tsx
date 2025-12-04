import { useEffect, useRef } from "react";

const GlobalBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let mouse = { x: -1000, y: -1000 };
        let scrollY = 0;

        // Simplex-ish noise function for organic feel
        const noise = (x: number, y: number) => {
            return Math.sin(x * 0.01) + Math.sin(y * 0.01) + Math.sin((x + y) * 0.005);
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        class Particle {
            x: number;
            y: number;
            history: { x: number; y: number }[];
            maxLength: number;
            angle: number;
            speed: number;
            timer: number;
            color: string;
            lineWidth: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.history = [{ x: this.x, y: this.y }];
                this.maxLength = Math.random() * 50 + 20; // Longer trails for roots
                this.angle = 0;
                this.speed = Math.random() * 0.5 + 0.2; // Slower, more deliberate movement
                this.timer = Math.random() * 100;
                this.color = `rgba(255, 255, 255, ${Math.random() * 0.15 + 0.05})`; // Slightly more visible
                this.lineWidth = Math.random() * 1.5 + 0.5;
            }

            update(scrollProgress: number) {
                this.timer++;

                // --- FLOW FIELD DEFINITIONS ---

                // 1. ROOTS (Hero): Downward, weaving, organic
                const rootAngle = (Math.PI / 2) + noise(this.x, this.y) * 0.5;

                // 2. NEURAL GRID (About): Horizontal/Vertical structure
                const gridAngle = noise(this.x, this.y) > 0 ? 0 : Math.PI / 2;

                // 3. EXPANSION (Services): Outward from center
                const centerX = canvas!.width / 2;
                const centerY = canvas!.height / 2;
                const expandAngle = Math.atan2(this.y - centerY, this.x - centerX);

                // 4. SPIRAL (Contact): Swirling inward
                const spiralAngle = Math.atan2(centerY - this.y, centerX - this.x) + Math.PI / 2;

                // --- INTERPOLATION LOGIC ---

                let targetAngle = rootAngle;

                if (scrollProgress < 0.33) {
                    // Morph: Roots -> Neural
                    const t = scrollProgress / 0.33;
                    targetAngle = this.lerpAngle(rootAngle, gridAngle, t);
                } else if (scrollProgress < 0.66) {
                    // Morph: Neural -> Expansion
                    const t = (scrollProgress - 0.33) / 0.33;
                    targetAngle = this.lerpAngle(gridAngle, expandAngle, t);
                } else {
                    // Morph: Expansion -> Spiral
                    const t = (scrollProgress - 0.66) / 0.34;
                    targetAngle = this.lerpAngle(expandAngle, spiralAngle, t);
                }

                // Mouse interaction (Disrupt the roots)
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    const angleToMouse = Math.atan2(dy, dx);
                    const force = (150 - dist) / 150;
                    targetAngle += force * Math.PI; // Turn away/swirl
                }

                // Smoothly rotate towards target angle
                this.angle = this.lerpAngle(this.angle, targetAngle, 0.1);

                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;

                // History for trails
                this.history.push({ x: this.x, y: this.y });
                if (this.history.length > this.maxLength) {
                    this.history.shift();
                }

                // Reset logic
                if (
                    this.x < -50 ||
                    this.x > canvas!.width + 50 ||
                    this.y < -50 ||
                    this.y > canvas!.height + 50 ||
                    this.timer > 300 + Math.random() * 100
                ) {
                    this.reset();
                }
            }

            // Helper for smooth angle interpolation
            lerpAngle(a: number, b: number, t: number) {
                const cs = (1 - t) * Math.cos(a) + t * Math.cos(b);
                const sn = (1 - t) * Math.sin(a) + t * Math.sin(b);
                return Math.atan2(sn, cs);
            }

            reset() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                // Bias reset positions based on flow? 
                // For roots, maybe bias top? Let's keep it random for better distribution.
                if (Math.random() < 0.5) this.y = 0; // More likely to start at top for roots feel

                this.history = [{ x: this.x, y: this.y }];
                this.timer = 0;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.strokeStyle = this.color;
                ctx.lineWidth = this.lineWidth;

                if (this.history.length > 1) {
                    // Draw smooth curve through history points
                    ctx.moveTo(this.history[0].x, this.history[0].y);
                    for (let i = 1; i < this.history.length; i++) {
                        // Simple line to for performance, could use quadraticCurveTo for smoother roots
                        ctx.lineTo(this.history[i].x, this.history[i].y);
                    }
                }
                ctx.stroke();
            }
        }

        const initParticles = () => {
            particles = [];
            const numberOfParticles = 600;
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            // Create trailing effect
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // Lower opacity = longer, smoother trails
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

            particles.forEach((particle) => {
                particle.update(scrollProgress);
                particle.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleScroll = () => {
            scrollY = window.scrollY;
        };

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("scroll", handleScroll);

        resize();
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", handleScroll);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0"
            style={{ opacity: 0.6 }}
        />
    );
};

export default GlobalBackground;
