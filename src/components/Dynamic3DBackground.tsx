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

// --- Custom usePerformance Hook ---
const usePerformance = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleVisibility = () => setIsVisible(document.visibilityState === 'visible');
        document.addEventListener('visibilitychange', handleVisibility);
        return () => document.removeEventListener('visibilitychange', handleVisibility);
    }, []);

    return { isVisible };
};

// --- Optimized Wireframe Knot ---
const WireframeKnot = React.memo(({ color }: { color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.1;
      meshRef.current.rotation.y = time * 0.15;
    }
  });

  return (
    <group position={[0, -5, -40]}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef}>
          <torusKnotGeometry args={[14, 2.5, 120, 24, 2, 5]} />
          <MeshDistortMaterial 
            color={color} 
            speed={2} 
            distort={0.4} 
            wireframe 
            transparent 
            opacity={0.15} 
            emissive={color}
            emissiveIntensity={1.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      </Float>
    </group>
  );
});

// --- Orbital Data Rings ---
const OrbitalRings = React.memo(({ color }: { color: string }) => {
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
});

// --- Neural Network Lines ---
const NeuralNetworkLines = React.memo(({ color }: { color: string }) => {
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
    if (!pointRef.current) return;
    
    // Safety check: if tab is hidden, skip expensive calculations
    if (document.hidden) return;

    const time = state.clock.getElapsedTime();
    const positionsArray = pointRef.current.geometry.attributes.position.array as Float32Array;
    const mx = mouse.x * 30;
    const my = mouse.y * 30;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Drifting flow - use pre-calculated basePositions to avoid drift accumulation issues
      const x = basePositions[i3] + Math.sin(time * 0.2 + i) * 2;
      const y = basePositions[i3 + 1] + Math.cos(time * 0.3 + i) * 2;
      const z = basePositions[i3 + 2] + Math.sin(time * 0.1 + i) * 2;

      // Interaction
      const dx = mx - x;
      const dy = my - y;
      const distSq = dx * dx + dy * dy; // Use squared distance for performance
      
      if (distSq < 225) { // 15 * 15
        const dist = Math.sqrt(distSq);
        positionsArray[i3] = x - (dx / dist) * 2;
        positionsArray[i3 + 1] = y - (dy / dist) * 2;
      } else {
        // Smoother lerp back
        positionsArray[i3] += (x - positionsArray[i3]) * 0.05;
        positionsArray[i3 + 1] += (y - positionsArray[i3 + 1]) * 0.05;
      }
      positionsArray[i3 + 2] = z;
    }

    pointRef.current.geometry.attributes.position.needsUpdate = true;
    if (linesRef.current) {
        linesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  // Pre-calculate line indices ONCE based on initial positions
  const lineIndices = useMemo(() => {
    const indices: number[] = [];
    const thresholdSq = 14 * 14;

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = basePositions[i * 3] - basePositions[j * 3];
        const dy = basePositions[i * 3 + 1] - basePositions[j * 3 + 1];
        const dz = basePositions[i * 3 + 2] - basePositions[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < thresholdSq) {
          indices.push(i, j);
        }
      }
    }
    return new Uint16Array(indices);
  }, [basePositions]);

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setIndex(new THREE.BufferAttribute(lineIndices, 1));
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [lineIndices, positions]);

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
});


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
        const targetZ = 20 + scroll * 40 + (isZooming ? -30 : 0);
        
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

const BackgroundContent = ({ isDark, isVisible }: { isDark: boolean; isVisible: boolean }) => {
    const isFlaring = useBackgroundFlare();
    const accentColor = "#6366f1";   // Deep Indigo
    const secondaryColor = "#a855f7"; // Solar Violet

    if (!isVisible) return null;

    return (
        <group>
            {/* Central Wireframe Focus */}
            <WireframeKnot color={accentColor} />

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
            
            <ambientLight intensity={isFlaring ? 3 : 0.8} />
            <pointLight position={[10, 20, 10]} intensity={isFlaring ? 8 : 4} color={accentColor} />
            <pointLight position={[-10, -20, -10]} intensity={isFlaring ? 5 : 2} color={secondaryColor} />
            <spotLight position={[0, 0, 40]} angle={0.4} penumbra={1} intensity={isFlaring ? 15 : 5} color="#ffffff" />
            
            {/* Dynamic Light Follower */}
            <pointLight 
              position={[Math.sin(Date.now() * 0.001) * 20, Math.cos(Date.now() * 0.001) * 20, -10]} 
              intensity={2} 
              color={accentColor} 
            />
        </group>
    );
};

interface Dynamic3DBackgroundProps {
    paused?: boolean;
}

const Dynamic3DBackground = ({ paused = false }: Dynamic3DBackgroundProps) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const { isVisible } = usePerformance();

    if (paused) return null;

    return (
        <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none overflow-hidden">
            {/* Deep immersive gradients */}
            <div 
                className={`absolute inset-0 w-full h-full transition-colors duration-1000 ${
                    isDark 
                    ? "bg-gradient-to-br from-[#0f0720] via-[#1e1b4b] to-[#0f0720]" 
                    : "bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#ede9fe]"
                }`}
            />
            
            <Canvas
                shadows
                gl={{ 
                    antialias: false, // Performance improvement
                    alpha: true, 
                    stencil: false, 
                    depth: true,
                    powerPreference: "high-performance",
                    failIfMajorPerformanceCaveat: false
                }}
                onCreated={() => {
                  window.dispatchEvent(new CustomEvent('3d-bg-ready'));
                }}
                dpr={[1, 1.5]} // Adaptive DPR
                camera={{ position: [0, 0, 20], fov: 60 }}
                style={{ opacity: isDark ? 1 : 0.6 }}
            >
                <BackgroundContent isDark={isDark} isVisible={isVisible} />
            </Canvas>

            {/* Vignette Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_40%,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/40 dark:to-black/80" />
        </div>
    );
};

export default React.memo(Dynamic3DBackground);
