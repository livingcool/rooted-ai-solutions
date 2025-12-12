"use client"

import { useEffect, useRef } from "react"

const GlobalBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let width = window.innerWidth
        let height = window.innerHeight

        interface ParticleType {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            alpha: number;
            targetAlpha: number;
            update: () => void;
            draw: () => void;
        }

        let particles: ParticleType[] = []
        let shootingStars: ShootingStar[] = []
        let lastTime = 0
        let shootingStarTimer = 0

        // Configuration
        const particleCount = Math.min(100, (width * height) / 15000) // Responsive count
        const connectionDistance = 150
        const mouseDistance = 250

        const mouse = { x: -1000, y: -1000 }

        class Particle implements ParticleType {
            x: number
            y: number
            vx: number
            vy: number
            size: number
            alpha: number
            targetAlpha: number

            constructor() {
                this.x = Math.random() * width
                this.y = Math.random() * height
                this.vx = (Math.random() - 0.5) * 0.2
                this.vy = (Math.random() - 0.5) * 0.2
                this.size = Math.random() * 1.5 + 0.5
                this.alpha = Math.random() * 0.5 + 0.1
                this.targetAlpha = this.alpha
            }

            update() {
                // Movement
                this.x += this.vx
                this.y += this.vy

                // Wrap
                if (this.x > width) this.x = 0
                if (this.x < 0) this.x = width
                if (this.y > height) this.y = 0
                if (this.y < 0) this.y = height

                // Mouse interaction
                const dx = mouse.x - this.x
                const dy = mouse.y - this.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < mouseDistance) {
                    // Gentle push
                    const forceDirectionX = dx / distance
                    const forceDirectionY = dy / distance
                    const force = (mouseDistance - distance) / mouseDistance
                    this.x -= forceDirectionX * force * 0.5
                    this.y -= forceDirectionY * force * 0.5
                    this.targetAlpha = 0.8 // Brighten on hover
                } else {
                    this.targetAlpha = Math.random() * 0.5 + 0.1
                }

                // Smooth alpha transition
                this.alpha += (this.targetAlpha - this.alpha) * 0.05
            }

            draw() {
                if (!ctx) return
                ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        class ShootingStar {
            x: number
            y: number
            len: number
            speed: number
            size: number
            waitTime: number
            active: boolean
            angle: number

            constructor() {
                this.x = Math.random() * width
                this.y = Math.random() * height * 0.5
                this.len = Math.random() * 80 + 10
                this.speed = Math.random() * 10 + 6
                this.size = Math.random() * 1 + 0.1
                this.waitTime = new Date().getTime() + Math.random() * 3000 + 500
                this.active = false
                this.angle = 45 // degrees
            }

            update() {
                if (this.active) {
                    this.x -= this.speed
                    this.y += this.speed
                    if (this.x < 0 || this.y >= height) {
                        this.active = false
                        this.waitTime = new Date().getTime() + Math.random() * 3000 + 500
                    }
                } else {
                    if (this.waitTime < new Date().getTime()) {
                        this.active = true
                        this.x = Math.random() * width + 200
                        this.y = -50
                    }
                }
            }

            draw() {
                if (!this.active || !ctx) return

                ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
                ctx.lineWidth = this.size
                ctx.lineCap = "round"

                ctx.beginPath()
                ctx.moveTo(this.x, this.y)
                ctx.lineTo(this.x + this.len, this.y - this.len)
                ctx.stroke()
            }
        }

        function init() {
            particles = []
            shootingStars = []
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle())
            }
            // Add a few shooting stars
            for (let i = 0; i < 2; i++) {
                shootingStars.push(new ShootingStar())
            }
        }

        function animate(time: number) {
            if (!ctx) return
            const deltaTime = time - lastTime
            lastTime = time

            ctx.clearRect(0, 0, width, height)

            // Update and draw particles
            for (let i = 0; i < particles.length; i++) {
                particles[i].update()
                particles[i].draw()

                // Connections
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < connectionDistance) {
                        ctx.beginPath()
                        const opacity = 1 - distance / connectionDistance
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`
                        ctx.lineWidth = 1
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.stroke()
                    }
                }
            }

            // Update and draw shooting stars
            shootingStars.forEach(star => {
                star.update()
                star.draw()
            })

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

        window.addEventListener("resize", handleResize)
        window.addEventListener("mousemove", handleMouseMove)

        handleResize()
        requestAnimationFrame(animate)

        return () => {
            window.removeEventListener("resize", handleResize)
            window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

    return (
        <div className="fixed inset-0 -z-10 bg-black pointer-events-none overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-violet-900/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-900/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />

            {/* The Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />

            {/* Overlay Gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
        </div>
    )
}

export default GlobalBackground
