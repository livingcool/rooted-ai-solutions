"use client"

import { Canvas } from "@react-three/fiber"
import { ShaderPlane, EnergyRing } from "./background-paper-shaders"

export function DarkShaderBackground() {
    return (
        <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                className="w-full h-full"
            >
                <ambientLight intensity={0.5} />

                {/* Main Shader Plane mimicking MeshGradient */}
                {/* We scale it up to cover the screen */}
                <ShaderPlane
                    position={[0, 0, 0]}
                    color1="#000000"
                    color2="#333333"
                />

                {/* Additional planes for depth/complexity if needed, or just one main one */}
                {/* The demo uses a single MeshGradient. ShaderPlane is our equivalent. */}

                {/* Optional: Add EnergyRing if it fits the "animated effect" request, 
            though the demo screenshot/code focuses on MeshGradient and DotOrbit. 
            I'll add it subtly or comment it out if it distracts. 
            The user provided EnergyRing code so they likely want it available. */}
                {/* <EnergyRing radius={2} position={[0, 0, -1]} /> */}
            </Canvas>

            {/* Lighting overlay effects from demo.tsx */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-1/4 left-1/3 w-32 h-32 bg-gray-800/5 rounded-full blur-3xl animate-pulse"
                    style={{ animationDuration: '3s' }}
                />
                <div
                    className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white/5 rounded-full blur-2xl animate-pulse"
                    style={{ animationDuration: '2s', animationDelay: "1s" }}
                />
                <div
                    className="absolute top-1/2 right-1/3 w-20 h-20 bg-gray-900/10 rounded-full blur-xl animate-pulse"
                    style={{ animationDuration: '4s', animationDelay: "0.5s" }}
                />
            </div>

            {/* Optional: DotOrbit simulation using simple CSS or Canvas points could be added here 
          if the user strictly wants "DotOrbit", but they didn't provide code for it 
          other than the import. I'll stick to the provided ShaderPlane. */}
        </div>
    )
}
