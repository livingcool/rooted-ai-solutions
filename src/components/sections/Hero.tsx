import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play } from "lucide-react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const contentRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    // Carousel state
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        {
            headline: "Engineering Intelligence",
            subheadline: "Complexity. Simplified.",
            description: "RootedAI delivers autonomous agents, logistics automation, and hiring solutions for scaling enterprises globally."
        },
        {
            headline: "Automate & Scale",
            subheadline: "Focus on Growth",
            description: "AI-powered automation that handles repetitive tasks. Let intelligent systems do the heavy lifting."
        },
        {
            headline: "From Idea to",
            subheadline: "Production Ready",
            description: "Full-stack development expertise. We transform your vision into production-ready software."
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax effect
            gsap.to('.hero-content', {
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                },
                y: 200,
                opacity: 0,
                scale: 0.9,
            });

            // Initial animation
            gsap.from(".hero-content > *", {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                delay: 0.5
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* 3D Scene is handled via global App.tsx component for persistence, 
          but visually acts as the 'absolute' background here */}

            <div
                ref={contentRef}
                className="hero-content relative z-10 text-center px-10 py-16 max-w-4xl mx-auto rounded-[30px] border border-white/10"
                style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(0,0,0,0.6))',
                    backdropFilter: 'blur(25px)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 0 40px rgba(255, 255, 255, 0.03)'
                }}
            >
                <div className="mb-6 inline-block">
                    <span className="py-2 px-4 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-neutral-300 backdrop-blur-md">
                        Engineering Intelligence v2.0
                    </span>
                </div>

                <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-br from-white to-neutral-400 block">
                        {slides[currentSlide].headline}
                    </span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-br from-white via-neutral-200 to-neutral-500 text-4xl md:text-5xl block mt-2 font-normal">
                        {slides[currentSlide].subheadline}
                    </span>
                </h1>

                <p className="hero-subtitle text-xl text-white/70 mb-10 leading-relaxed max-w-2xl mx-auto min-h-[60px]">
                    {slides[currentSlide].description}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <button
                        className="cta-primary relative overflow-hidden group px-10 py-4 rounded-full font-semibold text-white transition-all duration-300"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
                            backdropFilter: 'blur(10px)',
                        }}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Our Solutions <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        <div className="absolute inset-[-2px] rounded-full bg-gradient-to-br from-white to-[#666] -z-10 opacity-30 group-hover:opacity-60 transition-opacity" />
                    </button>

                    <button className="cta-secondary px-10 py-4 rounded-full font-semibold text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/60 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm">
                        <Play size={16} fill="white" /> Showcase
                    </button>
                </div>

                {/* Carousel Indicators */}
                <div className="flex gap-3 justify-center mt-12">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-1.5 rounded-full transition-all duration-500 ${index === currentSlide
                                    ? "w-8 bg-white"
                                    : "w-2 bg-white/20 hover:bg-white/40"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export { Hero };
