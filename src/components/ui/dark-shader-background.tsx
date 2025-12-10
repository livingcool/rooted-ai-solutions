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

                {/* Main Shader Plane with visible grey tones */}
                <ShaderPlane
                    position={[0, 0, 0]}
                    color1="#1a1a1a"
                    color2="#4a4a4a"
                />

                {/* Optional: Add EnergyRing if needed */}
                {/* <EnergyRing radius={2} position={[0, 0, -1]} /> */}
            </Canvas>

            {/* Lighting overlay effects */}
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
        </div>
    )
}
