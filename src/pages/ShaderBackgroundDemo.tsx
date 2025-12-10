"use client"

import { DarkShaderBackground } from "@/components/ui/dark-shader-background"

export default function ShaderBackgroundDemo() {
    return (
        <div className="relative min-h-screen">
            {/* Dark 3D Shader Background */}
            <DarkShaderBackground />

            {/* Content overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    {/* Hero Section */}
                    <div className="space-y-4">
                        <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                            RootedAI
                        </h1>
                        <p className="text-xl md:text-2xl text-white/60 font-light">
                            Premium AI Solutions with Cutting-Edge Technology
                        </p>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid md:grid-cols-3 gap-4 mt-12">
                        {[
                            { title: "Smart Hiring", desc: "AI-powered recruitment" },
                            { title: "Analytics", desc: "Real-time insights" },
                            { title: "Automation", desc: "Streamlined workflows" },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="group p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                            >
                                <h3 className="text-lg font-semibold text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-white/60">{feature.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="pt-8">
                        <button className="px-8 py-4 rounded-full bg-gradient-to-r from-white/20 to-white/10 border border-white/20 text-white font-medium hover:from-white/30 hover:to-white/20 transition-all duration-300 backdrop-blur-sm">
                            Get Started →
                        </button>
                    </div>
                </div>
            </div>

            {/* Ambient lighting overlay */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-3xl" />
            </div>
        </div>
    )
}
