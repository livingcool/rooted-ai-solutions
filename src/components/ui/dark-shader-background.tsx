"use client"

import { Canvas } from "@react-three/fiber"
import { ShaderPlane } from "./background-paper-shaders"

export function DarkShaderBackground() {
    return (
        <div className="fixed inset-0 -z-10 bg-[#0a0a0a] overflow-hidden">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                className="w-full h-full"
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />

                {/* Flowing Silk Cloth */}
                <ShaderPlane
                    position={[0, 0, 0]}
                    color1="#111111"  // Deep black/grey base
                    color2="#333333"  // Lighter grey for folds
                />
            </Canvas>

            {/* Subtle lighting overlay to enhance depth without obscuring the silk */}
            <div className="absolute inset-0 pointer-events-none mix-blend-overlay">
                <div
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-black/20 to-black/80"
                />
            </div>
        </div>
    )
}
