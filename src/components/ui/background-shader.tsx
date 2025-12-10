"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

// Dark-themed shader for subtle background effects
const vertexShader = `
  uniform float time;
  uniform float intensity;
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    
    vec3 pos = position;
    pos.y += sin(pos.x * 10.0 + time) * 0.05 * intensity;
    pos.x += cos(pos.y * 8.0 + time * 1.5) * 0.03 * intensity;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  uniform float time;
  uniform float intensity;
  uniform vec3 color1;
  uniform vec3 color2;
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vec2 uv = vUv;
    
    // Create subtle animated noise pattern
    float noise = sin(uv.x * 15.0 + time * 0.3) * cos(uv.y * 12.0 + time * 0.2);
    noise += sin(uv.x * 25.0 - time * 0.5) * cos(uv.y * 20.0 + time * 0.4) * 0.3;
    
    // Mix dark colors based on noise
    vec3 color = mix(color1, color2, noise * 0.3 + 0.5);
    
    // Very subtle glow effect
    float glow = 1.0 - length(uv - 0.5) * 1.5;
    glow = pow(glow, 1.5);
    
    gl_FragColor = vec4(color * glow, glow * 0.3);
  }
`

export function DarkShaderPlane({
    position,
    color1 = "#0a0a0a",
    color2 = "#1a1a1a",
}: {
    position: [number, number, number]
    color1?: string
    color2?: string
}) {
    const mesh = useRef<THREE.Mesh>(null)

    const uniforms = useMemo(
        () => ({
            time: { value: 0 },
            intensity: { value: 0.5 },
            color1: { value: new THREE.Color(color1) },
            color2: { value: new THREE.Color(color2) },
        }),
        [color1, color2],
    )

    useFrame((state) => {
        if (mesh.current) {
            uniforms.time.value = state.clock.elapsedTime * 0.5
            uniforms.intensity.value = 0.5 + Math.sin(state.clock.elapsedTime) * 0.2
        }
    })

    return (
        <mesh ref={mesh} position={position}>
            <planeGeometry args={[4, 4, 32, 32]} />
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                transparent
                side={THREE.DoubleSide}
            />
        </mesh>
    )
}

export function SubtleEnergyRing({
    radius = 1.5,
    position = [0, 0, 0],
}: {
    radius?: number
    position?: [number, number, number]
}) {
    const mesh = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.z = state.clock.elapsedTime * 0.2
            const pulse = 0.15 + Math.sin(state.clock.elapsedTime * 2) * 0.1
            mesh.current.material.opacity = pulse
        }
    })

    return (
        <mesh ref={mesh} position={position}>
            <ringGeometry args={[radius * 0.85, radius, 64]} />
            <meshBasicMaterial color="#1a1a1a" transparent opacity={0.2} side={THREE.DoubleSide} />
        </mesh>
    )
}
