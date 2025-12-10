"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { DarkShaderPlane, SubtleEnergyRing } from "./background-shader"

export function DarkShaderBackground() {
    return (
        <div className="fixed inset-0 -z-10 bg-black">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                className="w-full h-full"
            >
                <ambientLight intensity={0.1} />

                {/* Multiple shader planes for depth */}
                <DarkShaderPlane position={[0, 0, 0]} color1="#000000" color2="#0a0a0a" />
                <DarkShaderPlane position={[-2, 1, -1]} color1="#0a0a0a" color2="#1a1a1a" />
                <DarkShaderPlane position={[2, -1, -2]} color1="#050505" color2="#151515" />

                {/* Subtle energy rings */}
                <SubtleEnergyRing radius={2} position={[1, 0.5, -1]} />
                <SubtleEnergyRing radius={1.5} position={[-1, -0.5, -1.5]} />

                {/* Optional: Enable orbit controls for testing (remove in production) */}
                {/* <OrbitControls enableZoom={false} /> */}
            </Canvas>

            {/* Overlay gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/80 pointer-events-none" />

            {/* Subtle lighting effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-white/[0.01] rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
                <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-white/[0.005] rounded-full blur-2xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
            </div>
        </div>
    )
}
