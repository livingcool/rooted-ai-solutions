"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

// GLSL Simplex Noise function for organic movement
const noiseFunction = `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                        -0.577350269189626, // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
`

const vertexShader = `
  uniform float time;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  ${noiseFunction}
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Create flowing cloth movement using noise
    float noiseVal = snoise(vec2(pos.x * 0.5 + time * 0.2, pos.y * 0.5 + time * 0.1));
    float wave = sin(pos.x * 2.0 + time * 0.5) * 0.5 + cos(pos.y * 1.5 + time * 0.4) * 0.5;
    
    // Combine noise and waves for organic cloth physics
    float displacement = (noiseVal * 1.5 + wave * 0.5);
    
    // Apply displacement to Z axis (up/down)
    pos.z += displacement * 0.8;
    
    vPosition = pos;
    
    // Recalculate normal for lighting (approximate)
    vec3 newNormal = normal;
    newNormal.x -= displacement * 0.2;
    newNormal.y -= displacement * 0.2;
    vNormal = normalize(newNormal);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  uniform float time;
  uniform vec3 color1;
  uniform vec3 color2;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  void main() {
    // Silk sheen calculation
    vec3 lightDir = normalize(vec3(1.0, 1.0, 2.0)); // Light coming from top-right
    vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
    
    // Diffuse lighting (soft shadows)
    float diff = max(dot(vNormal, lightDir), 0.0);
    
    // Specular lighting (shiny silk highlights)
    vec3 reflectDir = reflect(-lightDir, vNormal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0); // High shininess for silk
    
    // Rim lighting (edge glow)
    float rim = 1.0 - max(dot(viewDir, vNormal), 0.0);
    rim = pow(rim, 3.0);
    
    // Mix colors based on height/displacement
    float heightFactor = smoothstep(-1.0, 1.0, vPosition.z);
    vec3 baseColor = mix(color1, color2, heightFactor);
    
    // Combine all lighting components
    vec3 finalColor = baseColor;
    finalColor += vec3(spec) * 0.4; // Add white specular highlight
    finalColor += baseColor * rim * 0.5; // Add rim glow
    finalColor += baseColor * diff * 0.2; // Add diffuse light
    
    // Ensure visibility
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

export function ShaderPlane({
    position,
    color1 = "#1a1a1a",
    color2 = "#4a4a4a",
}: {
    position: [number, number, number]
    color1?: string
    color2?: string
}) {
    const mesh = useRef<THREE.Mesh>(null)

    const uniforms = useMemo(
        () => ({
            time: { value: 0 },
            color1: { value: new THREE.Color(color1) },
            color2: { value: new THREE.Color(color2) },
        }),
        [color1, color2],
    )

    useFrame((state) => {
        if (mesh.current) {
            uniforms.time.value = state.clock.elapsedTime
        }
    })

    return (
        <mesh ref={mesh} position={position} rotation={[-Math.PI / 6, 0, 0]}>
            {/* High resolution for smooth cloth simulation */}
            <planeGeometry args={[20, 20, 128, 128]} />
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
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
    // Keeping this for compatibility, but the main effect is the ShaderPlane
    return null;
}
