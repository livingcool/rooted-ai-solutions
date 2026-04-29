
import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Icosahedron, Cylinder, Torus, ContactShadows, Environment, Text, Html } from '@react-three/drei';
import * as THREE from 'three';

// --- Colors ---
const C = {
  purple: "#240747",
  orange: "#F6851B",
  cream: "#F9EFE9"
};

// --- Single Data Unit Logic ---
function DataUnit({ offset = 0 }) {
  const groupRef = useRef<THREE.Group>(null);
  const jaggedRef = useRef<THREE.Mesh>(null);
  const smoothRef = useRef<THREE.Mesh>(null);
  const finalRef = useRef<THREE.Mesh>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  
  const [hovered, setHovered] = useState(false);
  
  // Materials that could change
  const purpleMat = useMemo(() => new THREE.MeshStandardMaterial({ color: C.purple, roughness: 0.7 }), []);
  const orangeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: C.orange, emissive: C.orange, emissiveIntensity: 0.5, roughness: 0.2 }), []);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Timeline variables
    const time = state.clock.getElapsedTime();
    const cycleDuration = 18; 
    const progress = ((time + offset) % cycleDuration) / cycleDuration; // 0 to 1
    
    // Position x maps from -12 to 12
    const startX = -12;
    const endX = 12;
    const currentX = THREE.MathUtils.lerp(startX, endX, progress);
    
    // Base position
    groupRef.current.position.x = currentX;
    groupRef.current.position.y = 0; // standard conveyor height
    groupRef.current.position.z = 0;
    
    // Dynamically update the hover tooltip without re-rendering React
    if (hovered && labelRef.current) {
        let stage = "";
        if (currentX < -8) stage = "RAW DATA";
        else if (currentX < -4) stage = "STRATEGY SCOPING";
        else if (currentX < 0) stage = "DATA CLEANING";
        else if (currentX < 4) stage = "LLM FINE-TUNING";
        else if (currentX < 8) stage = "VALIDATION";
        else stage = "SYSTEM INTEGRATION";

        if (labelRef.current.innerText !== stage) {
            labelRef.current.innerText = stage;
        }
    }
    
    // Sub-components rotation
    if (jaggedRef.current) {
        jaggedRef.current.rotation.x += 0.05;
        jaggedRef.current.rotation.y += 0.03;
    }
    if (smoothRef.current) {
        smoothRef.current.rotation.x += 0.02;
        smoothRef.current.rotation.y += 0.02;
    }
    if (finalRef.current) {
        // Slow confident rotation
        finalRef.current.rotation.y = time * 0.5;
        finalRef.current.rotation.x = Math.sin(time) * 0.1;
    }

    // STATE MACHINE based on position (mapped roughly to the 6 steps)
    if (currentX < -4) {
      jaggedRef.current!.scale.setScalar(1);
      smoothRef.current!.scale.setScalar(0);
      finalRef.current!.scale.setScalar(0);
      
      // Jitter when raw
      groupRef.current.position.y = Math.sin(time * 20) * 0.1;
    } 
    else if (currentX >= -4 && currentX < 4) {
      // Transition out jagged, in smooth
      const lerpFactor = Math.min((currentX + 4) / 4, 1);
      jaggedRef.current!.scale.setScalar(1 - lerpFactor);
      smoothRef.current!.scale.setScalar(lerpFactor);
      finalRef.current!.scale.setScalar(0);
      
      // Clean smooth transit
      groupRef.current.position.y = 0;
    }
    else if (currentX >= 4 && currentX < 8) {
      jaggedRef.current!.scale.setScalar(0);
      smoothRef.current!.scale.setScalar(1);
      finalRef.current!.scale.setScalar(0);
      
      // Validation press impact simulation
      if (currentX > 5 && currentX < 6) {
         groupRef.current.scale.set(1.2, 0.4, 1.2);
         groupRef.current.position.y = -0.3;
      } else {
         groupRef.current.scale.lerp(new THREE.Vector3(1,1,1), 0.2);
         groupRef.current.position.y = 0;
      }
    }
    else {
       // Integration
       jaggedRef.current!.scale.setScalar(0);
       smoothRef.current!.scale.setScalar(0);
       
       // Snap to final cube
       if (finalRef.current!.scale.x < 0.9) {
           finalRef.current!.scale.setScalar(1);
       }
       
       // Lift sequence
       const liftProgress = Math.max(0, (currentX - 8) / 4);
       groupRef.current.position.y = liftProgress * 4;
       
       // Pulse orange emissive
       orangeMat.emissiveIntensity = 0.5 + Math.sin(time * 10) * 0.3;
    }
  });

  return (
    <group 
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Icosahedron ref={jaggedRef} args={[0.7, 0]} material={purpleMat} />
      <Icosahedron ref={smoothRef} args={[0.6, 2]} material={purpleMat} />
      <Box ref={finalRef} args={[1, 1, 1]} material={orangeMat} />
      
      {/* HTML Tooltip mapped to component spatial position */}
      {hovered && (
         <Html position={[0, 1.8, 0]} center zIndexRange={[100, 0]}>
           <div 
             ref={labelRef} 
             style={{ 
               background: C.orange, 
               color: C.purple, 
               padding: '4px 8px', 
               borderRadius: '4px', 
               fontFamily: 'var(--font-mono)', 
               fontSize: '11px', 
               fontWeight: 'bold', 
               whiteSpace: 'nowrap', 
               pointerEvents: 'none',
               boxShadow: '2px 2px 0 #240747',
               border: '1.5px solid #240747'
             }}
           >
              PROCESSING...
           </div>
         </Html>
      )}
    </group>
  );
}

// --- Machine Environment ---
function AssemblyEnvironment() {
  const machineMat = new THREE.MeshStandardMaterial({ color: C.purple, roughness: 0.8, metalness: 0.5 });
  const laserMat = new THREE.MeshBasicMaterial({ color: C.orange, transparent: true, opacity: 0.6 });

  // Press Animation
  const pressRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
     if (pressRef.current) {
        // Press cycles every time a unit passes x approx 5.5
        // Using a general sine wave timed roughly with the units
        const speed = (2 * Math.PI) / (18 / 3); // 3 units max offset
        // Quick snap down motion
        const cycle = Math.sin(clock.getElapsedTime() * speed);
        pressRef.current.position.y = cycle > 0.85 ? 0.8 : 2.5;
     }
  });

  return (
     <group>
       {/* Background structural wall */}
       <Box args={[30, 8, 1]} position={[0, 2, -3]} material={machineMat} />
       
       {/* Conveyor Belt Base */}
       <Box args={[30, 0.5, 4]} position={[0, -1, 0]} material={machineMat} />
       
       {/* Conveyor Tracks */}
       <Cylinder args={[0.1, 0.1, 30]} position={[0, -0.6, 1.8]} rotation={[0, 0, Math.PI/2]} material={machineMat} />
       <Cylinder args={[0.1, 0.1, 30]} position={[0, -0.6, -1.8]} rotation={[0, 0, Math.PI/2]} material={machineMat} />
       
       {/* Station 2: Scoping (Scanner Gate) */}
       <group position={[-6, 1.5, 0]}>
         <Box args={[1, 3, 4.5]} material={machineMat} />
         <Box args={[0.8, 2.5, 4]} material={new THREE.MeshBasicMaterial({ color: C.purple, transparent:true, opacity: 0 })} />
         {/* Laser Grid */}
         <Box args={[0.05, 2.8, 3.8]} material={laserMat} />
       </group>
       
       {/* Station 4: Fine Tuning (Orbital Array) */}
       <group position={[2, 1.5, 0]}>
         <Torus args={[2, 0.2, 8, 24]} rotation={[Math.PI/2, Math.PI/4, 0]} material={machineMat} />
         <Cylinder args={[0.1, 0.1, 3]} position={[0, 2, 0]} material={laserMat} />
       </group>

       {/* Station 5: Validation Press */}
       <group position={[5.5, 2.5, 0]}>
         <Box args={[1.5, 4, 2]} material={machineMat} position={[0, 2, 0]} />
         <Box ref={pressRef} args={[1.2, 1.5, 1.2]} position={[0, 0, 0]} material={machineMat}>
            <Text position={[0, -0.8, 0.6]} rotation={[-Math.PI/2, 0, 0]} fontSize={0.3} color={C.cream} anchorX="center" anchorY="middle">
              TESTED
            </Text>
         </Box>
       </group>
       
       {/* Station 6: Integration Bay */}
       <group position={[10, 3, -1]}>
         <Box args={[4, 0.5, 4]} position={[0, 2, 0]} material={machineMat} />
         <Cylinder args={[0.3, 0.3, 4]} position={[-1.5, 0, 0]} material={machineMat} />
         <Cylinder args={[0.3, 0.3, 4]} position={[1.5, 0, 0]} material={machineMat} />
       </group>
     </group>
  );
}

export default function AssemblyLine() {
  return (
    <div style={{ width: "100%", height: "300px", background: C.cream, borderRadius: 24, padding: "16px", boxSizing: "border-box" }}>
      <div style={{ width: "100%", height: "100%", borderRadius: 16, overflow: "hidden", border: `3px solid ${C.purple}`, position: "relative" }}>
        {/* Underlay instruction */}
        <div style={{ position: "absolute", top: 12, left: 16, zIndex: 10 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", color: C.purple, opacity: 0.6, fontWeight: 700, textTransform: "uppercase" }}>
                Process Visualization
            </span>
        </div>
        
        <Canvas camera={{ position: [0, 8, 16], fov: 35 }}>
          <ambientLight intensity={2} />
          <directionalLight position={[10, 10, 10]} intensity={3} castShadow />
          <directionalLight position={[-10, 5, -5]} intensity={1.5} />
          <Environment preset="city" />
          
          <AssemblyEnvironment />
          
          {/* We stagger 3 Data Units uniformly across the 18s duration */}
          <DataUnit offset={0} />
          <DataUnit offset={6} />
          <DataUnit offset={12} />
          
          <ContactShadows position={[0, -1.1, 0]} opacity={0.6} blur={2.5} far={10} />
        </Canvas>
      </div>
    </div>
  );
}
