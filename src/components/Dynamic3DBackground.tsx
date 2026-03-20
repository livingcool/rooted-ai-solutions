import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  Float, 
  Sphere, 
  MeshDistortMaterial, 
  MeshWobbleMaterial, 
  Points, 
  PointMaterial, 
  PerspectiveCamera,
  Environment,
  Text,
  useScroll
} from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/components/ThemeProvider";
import { useScroll as usePageScroll } from "framer-motion";

// --- Neural Network Component ---
const NeuralNetwork = ({ color }: { color: string }) => {
  const count = 100;
  const { mouse } = useThree();
  const pointRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const [positions, setPositions] = useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 45;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 45;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 45;
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
      // Gentle floating
      const x = basePositions[i3] + Math.sin(time * 0.5 + i) * 0.5;
      const y = basePositions[i3 + 1] + Math.cos(time * 0.4 + i) * 0.5;
      const z = basePositions[i3 + 2] + Math.sin(time * 0.3 + i) * 0.5;

      // Mouse interaction
      const dx = mouse.x * 20 - x;
      const dy = mouse.y * 20 - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 8) {
        positionsArray[i3] = x - (dx / dist) * 2;
        positionsArray[i3 + 1] = y - (dy / dist) * 2;
      } else {
        positionsArray[i3] = THREE.MathUtils.lerp(positionsArray[i3], x, 0.1);
        positionsArray[i3 + 1] = THREE.MathUtils.lerp(positionsArray[i3 + 1], y, 0.1);
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
    const threshold = 12;

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
          size={0.12}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color={color} transparent opacity={0.08} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
};

// --- Floating Shapes ---
const FloatingEntities = ({ accentColor, secondaryColor }: { accentColor: string, secondaryColor: string }) => {
  return (
    <group>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-15, 10, -10]}>
          <icosahedronGeometry args={[2, 1]} />
          <MeshDistortMaterial 
            color={accentColor} 
            speed={2} 
            distort={0.3} 
            transparent 
            opacity={0.15} 
            wireframe 
          />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[18, -8, -15]}>
          <octahedronGeometry args={[2.5, 0]} />
          <MeshWobbleMaterial 
            color={secondaryColor} 
            speed={3} 
            factor={0.1} 
            transparent 
            opacity={0.15} 
            wireframe 
          />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={0.5} floatIntensity={3}>
        <mesh position={[12, 12, -25]}>
          <dodecahedronGeometry args={[3, 0]} />
          <meshBasicMaterial color={accentColor} wireframe transparent opacity={0.1} />
        </mesh>
      </Float>
    </group>
  );
};

// --- Stylized Root Structure (Neural Core) ---
const RootStructure = ({ color }: { color: string }) => {
  const rootRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (rootRef.current) {
      rootRef.current.rotation.y = time * 0.1;
      // Gentle pulsing of the whole core
      rootRef.current.scale.setScalar(1 + Math.sin(time * 0.5) * 0.05);
    }
  });

  const branches = useMemo(() => {
    return [...Array(12)].map((_, i) => ({
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI * 2, 0] as [number, number, number],
      scale: 0.5 + Math.random() * 1.5,
      delay: Math.random() * 10
    }));
  }, []);

  return (
    <group ref={rootRef} position={[0, 0, -25]}>
      {/* Central Core Sphere */}
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} wireframe />
      </mesh>
      <mesh scale={0.8}>
        <sphereGeometry args={[2, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>

      {/* Branching Structure */}
      {branches.map((branch, i) => (
        <group key={i} rotation={branch.rotation}>
          <mesh position={[0, 5 * branch.scale, 0]}>
            <cylinderGeometry args={[0.02, 0.2, 10 * branch.scale, 8]} />
            <meshBasicMaterial color={color} transparent opacity={0.1} wireframe />
          </mesh>
          {/* Energy Nodes at branch tips */}
          <mesh position={[0, 10 * branch.scale, 0]}>
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshBasicMaterial color={color} transparent opacity={0.6} />
          </mesh>
        </group>
      ))}

      {/* Outer Halo Rings */}
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
            <torusGeometry args={[6, 0.02, 16, 100]} />
            <meshBasicMaterial color={color} transparent opacity={0.1} />
        </mesh>
        <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
            <torusGeometry args={[8, 0.01, 16, 100]} />
            <meshBasicMaterial color={color} transparent opacity={0.05} />
        </mesh>
      </group>
    </group>
  );
};

const Stars = () => {
  const count = 1200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 150;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 150;
        pos[i * 3 + 2] = -60 - Math.random() * 80;
    }
    return pos;
  }, []);

  return (
    <Points positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.3}
      />
    </Points>
  );
};

// --- Interactive Camera ---
const Rig = () => {
  const { camera, mouse } = useThree();
  const { scrollYProgress } = usePageScroll();
  const vec = new THREE.Vector3();
  const rotationVec = new THREE.Euler();

  useFrame((state) => {
    // Mouse Parallax
    camera.position.lerp(vec.set(mouse.x * 3, mouse.y * 3, camera.position.z), 0.05);
    
    // Scroll Parallax (Depth and subtle rotation)
    const scroll = scrollYProgress.get();
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 30 + scroll * 20, 0.1);
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, scroll * 0.2, 0.1);
    
    camera.lookAt(0, 0, 0);
  });
  return null;
};

const BackgroundContent = ({ isDark }: { isDark: boolean }) => {
    const accentColor = "#00d4aa";
    const secondaryColor = "#ff9f43";

    return (
        <group>
            <NeuralNetwork color={accentColor} />
            <FloatingEntities accentColor={accentColor} secondaryColor={secondaryColor} />
            <RootStructure color={accentColor} />
            <Stars />
            <Rig />
            
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} color={accentColor} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color={secondaryColor} />
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
            {/* Base Gradient Layer */}
            <div 
                className={`absolute inset-0 w-full h-full transition-colors duration-1000 ${
                    isDark 
                    ? "bg-gradient-to-br from-black via-[#0a0f14] to-black" 
                    : "bg-gradient-to-br from-white via-gray-50 to-gray-100"
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
                camera={{ position: [0, 0, 30], fov: 60 }}
                style={{ opacity: 0.8 }}
            >
                <BackgroundContent isDark={isDark} />
            </Canvas>

            {/* Subtle Overlay to ensure readability */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_0%,_var(--tw-gradient-stops))] from-transparent via-transparent to-white/10 dark:to-black/30" />
        </div>
    );
};

export default Dynamic3DBackground;
