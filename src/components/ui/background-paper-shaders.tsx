"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

// Silky smooth vertex shader
const vertexShader = `
  uniform float time;
  uniform float intensity;
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    
    vec3 pos = position;
    // Gentle flowing movement
    float wave = sin(pos.x * 2.0 + time * 0.5) * 0.2 + cos(pos.y * 1.5 + time * 0.3) * 0.2;
    pos.z += wave * intensity;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

// Premium silky fragment shader
const fragmentShader = `
  uniform float time;
  uniform float intensity;
  uniform vec3 color1;
  uniform vec3 color2;
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vec2 uv = vUv;
    
    // Create organic flow pattern (Silky effect)
    float t = time * 0.2;
    
    // Layer 1: Broad strokes
    float flow1 = sin(uv.x * 8.0 + t) * cos(uv.y * 6.0 - t * 0.5);
    
    // Layer 2: Fine details
    float flow2 = sin(uv.x * 15.0 - t * 1.2) * cos(uv.y * 12.0 + t * 0.8);
    
    // Layer 3: Diagonal movement for silk sheen
    float flow3 = sin((uv.x + uv.y) * 10.0 + t * 0.5);
    
    // Combine layers for rich texture
    float pattern = (flow1 * 0.5 + flow2 * 0.3 + flow3 * 0.2);
    
    // Smooth out the pattern
    pattern = pattern * 0.5 + 0.5; // Normalize to 0-1
    
    // Enhance contrast for "folds"
    float folds = pow(pattern, 1.5);
    
    // Calculate sheen (specular-like highlight) - boosted brightness
    float sheen = smoothstep(0.4, 0.6, pattern) * 0.5;
    
    // Mix colors with premium gradient
    vec3 baseColor = mix(color1, color2, folds);
    
    // Add the sheen
    vec3 finalColor = baseColor + vec3(sheen) * 0.3;
    
    // Subtle vignette - reduced strength
    float vignette = 1.0 - length(uv - 0.5) * 0.6;
    vignette = smoothstep(0.0, 1.0, vignette);
    
    gl_FragColor = vec4(finalColor * vignette, 1.0);
  }
`

export function ShaderPlane({
    position,
    color1 = "#000000",
    color2 = "#333333",
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
            uniforms.time.value = state.clock.elapsedTime
            // Gentle breathing intensity
            uniforms.intensity.value = 0.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
        }
    })

    return (
        <mesh ref={mesh} position={position}>
            {/* High resolution plane for smooth waves */}
            <planeGeometry args={[16, 16, 128, 128]} />
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

export function EnergyRing({
    radius = 1,
    position = [0, 0, 0],
}: {
    radius?: number
    position?: [number, number, number]
}) {
    const mesh = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.z = state.clock.elapsedTime * 0.2
            mesh.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime) * 0.2
        }
    })

    return (
        <mesh ref={mesh} position={position}>
            <ringGeometry args={[radius * 0.95, radius, 64]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
    )
}
