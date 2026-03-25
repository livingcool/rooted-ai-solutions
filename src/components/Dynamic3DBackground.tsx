import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  Float, 
  Sparkles,
  PerspectiveCamera,
  useScroll,
  MeshDistortMaterial,
  PointMaterial,
  Points
} from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/components/ThemeProvider";
import { useScroll as usePageScroll } from "framer-motion";

// --- Orbital Data Rings ---
const OrbitalRings = ({ color }: { color: string }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * -0.05;
      groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, -5, -40]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[22, 0.05, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[Math.PI / 2.5, Math.PI / 4, 0]}>
        <torusGeometry args={[26, 0.02, 16, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </mesh>
      <mesh rotation={[Math.PI / 1.5, -Math.PI / 4, 0]}>
        <torusGeometry args={[30, 0.08, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} />
      </mesh>
    </group>
  );
};

// --- Neural Network Lines ---
const NeuralNetworkLines = ({ color }: { color: string }) => {
  const count = 150;
  const { mouse } = useThree();
  const pointRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const [positions, setPositions] = useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 45 - 20;
    }
    return pos;
  });

  const basePositions = useMemo(() => new Float32Array(positions), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (!pointRef.current) return;

    const positionsArray = pointRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Drifting flow
      const x = basePositions[i3] + Math.sin(time * 0.2 + i) * 2;
      const y = basePositions[i3 + 1] + Math.cos(time * 0.3 + i) * 2;
      const z = basePositions[i3 + 2] + Math.sin(time * 0.1 + i) * 2;

      // Extremely subtle mouse interaction
      const dx = mouse.x * 30 - x;
      const dy = mouse.y * 30 - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 15) {
        positionsArray[i3] = x - (dx / dist) * 2;
        positionsArray[i3 + 1] = y - (dy / dist) * 2;
      } else {
        positionsArray[i3] = THREE.MathUtils.lerp(positionsArray[i3], x, 0.05);
        positionsArray[i3 + 1] = THREE.MathUtils.lerp(positionsArray[i3 + 1], y, 0.05);
      }
      positionsArray[i3 + 2] = z;
    }

    pointRef.current.geometry.attributes.position.needsUpdate = true;
    if (linesRef.current) {
        linesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const lineIndices: number[] = [];
    const threshold = 14;

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const x1 = basePositions[i * 3];
        const y1 = basePositions[i * 3 + 1];
        const z1 = basePositions[i * 3 + 2];
        const x2 = basePositions[j * 3];
        const y2 = basePositions[j * 3 + 1];
        const z2 = basePositions[j * 3 + 2];

        const dist = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2);
        if (dist < threshold) {
          lineIndices.push(i, j);
        }
      }
    }
    geometry.setIndex(lineIndices);
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [basePositions, positions]);

  return (
    <group>
      <Points ref={pointRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={0.15}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color={color} transparent opacity={0.06} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
};


// --- Interactive Camera ---
const Rig = () => {
    const { camera, mouse } = useThree();
    const { scrollYProgress } = usePageScroll();
    const [isZooming, setIsZooming] = useState(false);
    const vec = new THREE.Vector3();

    useEffect(() => {
        const handleZoom = () => {
            setIsZooming(true);
            setTimeout(() => setIsZooming(false), 1500);
        };
        window.addEventListener('trigger-bg-zoom', handleZoom);
        return () => window.removeEventListener('trigger-bg-zoom', handleZoom);
    }, []);

    useFrame((state) => {
        // Cinematic Parallax
        camera.position.lerp(vec.set(mouse.x * 5, mouse.y * 5, camera.position.z), 0.02);

        // Depth plunge on scroll
        const scroll = scrollYProgress.get();
        const targetZ = 20 + scroll * 40 + (isZooming ? -15 : 0);
        
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, isZooming ? 0.08 : 0.05);
        camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, scroll * 0.3, 0.05);
        camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, scroll * -0.1, 0.05);

        camera.lookAt(0, 0, -20);
    });
    return null;
};

// --- Flare Logic Hook ---
const useBackgroundFlare = () => {
    const [isFlaring, setIsFlaring] = useState(false);
    
    useEffect(() => {
        const handleFlare = () => {
            setIsFlaring(true);
            setTimeout(() => setIsFlaring(false), 2000);
        };
        window.addEventListener('trigger-bg-flare', handleFlare);
        return () => window.removeEventListener('trigger-bg-flare', handleFlare);
    }, []);

    return isFlaring;
};

const BackgroundContent = ({ isDark }: { isDark: boolean }) => {
    const isFlaring = useBackgroundFlare();
    const accentColor = "#0ea5e9";  // Sky 500
    const secondaryColor = "#6366f1"; // Indigo 500

    return (
        <group>
            {/* Orbital Rings */}
            <OrbitalRings color={secondaryColor} />

            {/* Neural Net Grid */}
            <NeuralNetworkLines color={accentColor} />
            
            {/* Volumetric Sparkles */}
            <Sparkles 
                count={isFlaring ? 1000 : 500} 
                scale={100} 
                size={isFlaring ? 4 : 2} 
                color="#ffffff" 
                speed={isFlaring ? 2 : 0.4} 
                opacity={isDark ? 0.8 : 0.4} 
            />

            <Rig />
            
            <ambientLight intensity={isFlaring ? 2 : 0.5} />
            <pointLight position={[10, 20, 10]} intensity={isFlaring ? 5 : 2} color={accentColor} />
            <pointLight position={[-10, -20, -10]} intensity={isFlaring ? 3 : 1} color={secondaryColor} />
            <spotLight position={[0, 0, 40]} angle={0.3} penumbra={1} intensity={isFlaring ? 10 : 2} color="#ffffff" />
        </group>
    );
};

interface Dynamic3DBackgroundProps {
    paused?: boolean;
}

const Dynamic3DBackground = ({ paused = false }: Dynamic3DBackgroundProps) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    if (paused) return null;

    return (
        <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none overflow-hidden">
            {/* Deep immersive gradients */}
            <div 
                className={`absolute inset-0 w-full h-full transition-colors duration-1000 ${
                    isDark 
                    ? "bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617]" 
                    : "bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]"
                }`}
            />
            
            <Canvas
                shadows
                gl={{ 
                    antialias: true, 
                    alpha: true, 
                    stencil: false, 
                    depth: true,
                    powerPreference: "high-performance",
                    failIfMajorPerformanceCaveat: true
                }}
                dpr={[1, 2]}
                camera={{ position: [0, 0, 20], fov: 60 }}
                style={{ opacity: isDark ? 1 : 0.6 }}
            >
                <BackgroundContent isDark={isDark} />
            </Canvas>

            {/* Vignette Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_40%,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/40 dark:to-black/80" />
        </div>
    );
};

export default Dynamic3DBackground;
