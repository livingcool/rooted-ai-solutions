"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "@/components/ThemeProvider"

const GlobalBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { theme } = useTheme()

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

        // Configuration
        const particleCount = Math.min(100, (width * height) / 15000)
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
                this.x += this.vx
                this.y += this.vy

                if (this.x > width) this.x = 0
                if (this.x < 0) this.x = width
                if (this.y > height) this.y = 0
                if (this.y < 0) this.y = height

                const dx = mouse.x - this.x
                const dy = mouse.y - this.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < mouseDistance) {
                    const forceDirectionX = dx / distance
                    const forceDirectionY = dy / distance
                    const force = (mouseDistance - distance) / mouseDistance
                    this.x -= forceDirectionX * force * 0.5
                    this.y -= forceDirectionY * force * 0.5
                    this.targetAlpha = 0.8
                } else {
                    this.targetAlpha = Math.random() * 0.5 + 0.1
                }

                this.alpha += (this.targetAlpha - this.alpha) * 0.05
            }

            draw() {
                if (!ctx) return
                const isDark = document.documentElement.classList.contains("dark")
                const color = isDark ? "255, 255, 255" : "0, 0, 0"

                ctx.fillStyle = `rgba(${color}, ${this.alpha})`
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
                this.angle = 45
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
                const isDark = document.documentElement.classList.contains("dark")
                const color = isDark ? "255, 255, 255" : "0, 0, 0"

                ctx.strokeStyle = `rgba(${color}, 0.5)`
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
            for (let i = 0; i < 2; i++) {
                shootingStars.push(new ShootingStar())
            }
        }

        function animate(time: number) {
            if (!ctx) return
            const deltaTime = time - lastTime
            lastTime = time

            ctx.clearRect(0, 0, width, height)

            const isDark = document.documentElement.classList.contains("dark")
            const color = isDark ? "255, 255, 255" : "0, 0, 0"

            for (let i = 0; i < particles.length; i++) {
                particles[i].update()
                particles[i].draw()

                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < connectionDistance) {
                        ctx.beginPath()
                        const opacity = 1 - distance / connectionDistance
                        ctx.strokeStyle = `rgba(${color}, ${opacity * 0.15})`
                        ctx.lineWidth = 1
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.stroke()
                    }
                }
            }

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
    }, [theme])

    return (
        <div className="fixed inset-0 -z-10 bg-background transition-colors duration-500 pointer-events-none overflow-hidden">
            {/* Engineering Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* Ambient Background Glows - Adjusted for themes */}
            <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-violet-500/10 dark:bg-violet-900/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-500/10 dark:bg-indigo-900/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />

            {/* The Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60 dark:opacity-80" />

            {/* Overlay Gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/20 dark:via-black/20 dark:to-black/80 transition-colors duration-500" />
        </div>
    )
}

export default GlobalBackground
