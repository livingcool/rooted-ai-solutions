"use client"

import { useEffect, useRef } from "react"

// --- THE NEW PARTICLE SYSTEM (GlobalBackground) ---
// Refactored to fit inside the parent container using absolute positioning
const GlobalBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let width = window.innerWidth
        let height = window.innerHeight

        // Type definition for internal particle use
        interface ParticleType {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            baseX: number;
            baseY: number;
            update: () => void;
            draw: () => void;
        }

        let particles: ParticleType[] = []
        let scrollY = window.scrollY
        let targetScrollY = scrollY

        // Configuration
        const particleCount = 100
        const connectionDistance = 150
        const mouseDistance = 200

        // Mouse state
        const mouse = { x: -1000, y: -1000 }

        class Particle implements ParticleType {
            x: number
            y: number
            vx: number
            vy: number
            size: number
            baseX: number
            baseY: number

            constructor() {
                this.x = Math.random() * width
                this.y = Math.random() * height
                this.vx = (Math.random() - 0.5) * 0.5
                this.vy = (Math.random() - 0.5) * 0.5
                this.size = Math.random() * 2 + 1
                this.baseX = this.x
                this.baseY = this.y
            }

            update() {
                // Scroll effect: Move particles vertically based on scroll speed
                const scrollSpeed = (targetScrollY - scrollY) * 0.1
                this.y -= scrollSpeed * 0.5 // Parallax movement

                // Wrap around screen
                if (this.y > height) this.y = 0
                if (this.y < 0) this.y = height
                if (this.x > width) this.x = 0
                if (this.x < 0) this.x = width

                // Mouse interaction
                const dx = mouse.x - this.x
                const dy = mouse.y - this.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < mouseDistance) {
                    const forceDirectionX = dx / distance
                    const forceDirectionY = dy / distance
                    const force = (mouseDistance - distance) / mouseDistance
                    const directionX = forceDirectionX * force * 3 // Repel strength
                    const directionY = forceDirectionY * force * 3

                    this.x -= directionX
                    this.y -= directionY
                } else {
                    // Return to base velocity
                    this.x += this.vx
                    this.y += this.vy
                }
            }

            draw() {
                if (!ctx) return
                ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        function init() {
            particles = []
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle())
            }
        }

        function animate() {
            if (!ctx) return
            ctx.clearRect(0, 0, width, height)

            // Smooth scroll interpolation
            scrollY += (targetScrollY - scrollY) * 0.1

            // Update and draw particles
            for (let i = 0; i < particles.length; i++) {
                particles[i].update()
                particles[i].draw()

                // Draw connections
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < connectionDistance) {
                        ctx.beginPath()
                        const opacity = 1 - distance / connectionDistance
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`
                        ctx.lineWidth = 1
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.stroke()
                    }
                }
            }
            requestAnimationFrame(animate)
        }

        const handleResize = () => {
            if (typeof window !== 'undefined') {
                width = window.innerWidth
                height = window.innerHeight
                if (canvas) {
                    canvas.width = width
                    canvas.height = height
                }
                init()
            }
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX
            mouse.y = e.clientY
        }

        const handleScroll = () => {
            targetScrollY = window.scrollY
        }

        window.addEventListener("resize", handleResize)
        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("scroll", handleScroll)

        handleResize()
        animate()

        return () => {
            window.removeEventListener("resize", handleResize)
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <div className="fixed inset-0 -z-10 bg-black pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050505] to-[#0a0a0a]" />
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>
    )
}

export default GlobalBackground