import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const RobotModel = ({ actionName, expression }: { actionName: string, expression: string | null }) => {
  const group = useRef<THREE.Group>(null);
  // Using suspense boundary wrapper to allow useGLTF
  const { scene, animations } = useGLTF('/models/RobotExpressive.glb');
  const { actions } = useAnimations(animations, group);

  // Manage Animations
  useEffect(() => {
    const action = actions[actionName];
    if (action) {
      action.reset().fadeIn(0.5).play();
      
      if (actionName === 'Jump') {
        action.setLoop(THREE.LoopOnce, 1);
        action.clampWhenFinished = true;
      } else {
        action.setLoop(THREE.LoopRepeat, Infinity);
      }

      return () => {
        action.fadeOut(0.5);
      };
    }
  }, [actionName, actions]);

  // Manage Expressions via Morph Targets
  const targetInfluences = useRef<number[]>([]);

  useEffect(() => {
    // The head mesh containing facial expressions is usually Head_4 in this model
    const face = scene.getObjectByName('Head_4') as THREE.Mesh;
    if (face && face.morphTargetDictionary) {
       targetInfluences.current = new Array(Object.keys(face.morphTargetDictionary).length).fill(0);
       
       if (expression && face.morphTargetDictionary[expression] !== undefined) {
         // Set the target influence for the active expression to 1 (fully visible)
         targetInfluences.current[face.morphTargetDictionary[expression]] = 1;
       }
    }
  }, [expression, scene]);

  useFrame(() => {
    const face = scene.getObjectByName('Head_4') as THREE.Mesh;
    if (face && face.morphTargetInfluences) {
       for(let i = 0; i < face.morphTargetInfluences.length; i++) {
          // Smoothly lerp towards the target expression
          face.morphTargetInfluences[i] = THREE.MathUtils.lerp(
            face.morphTargetInfluences[i], 
            targetInfluences.current[i] || 0, 
            0.1
          );
       }
    }
  });

  return <primitive ref={group} object={scene} position={[0, -2.5, 0]} />;
};

export default function RobotPanel() {
  const [currentAction, setCurrentAction] = useState("Wave");
  const [currentExpression, setCurrentExpression] = useState<string | null>(null);
  const [isSurprise, setIsSurprise] = useState(false);

  // Pre-extract expressions so we don't have to guess the internal IDs
  const { scene } = useGLTF('/models/RobotExpressive.glb');
  const face = scene?.getObjectByName('Head_4') as THREE.Mesh;
  const expressions = face?.morphTargetDictionary ? Object.keys(face.morphTargetDictionary) : [];

  useEffect(() => {
    if (isSurprise) return;

    // Added Running to the sequence along with explicit expression toggling
    const sequence = [
      { name: "Wave", duration: 3000, express: false },
      { name: "Running", duration: 4000, express: true },
      { name: "Idle", duration: 3000, express: false },
      { name: "Walking", duration: 4000, express: true },
      { name: "ThumbsUp", duration: 2500, express: true },
      { name: "Idle", duration: 3000, express: false },
    ];

    let currentStep = 0;
    let timeout: NodeJS.Timeout;

    const playNext = () => {
      const step = sequence[currentStep];
      setCurrentAction(step.name);
      
      // Randomly switch expression if the step asks for it and expressions exist
      if (step.express && expressions.length > 0) {
        const randomExpr = expressions[Math.floor(Math.random() * expressions.length)];
        setCurrentExpression(randomExpr);
      } else {
        setCurrentExpression(null); // Neutral face
      }

      timeout = setTimeout(() => {
        currentStep = (currentStep + 1) % sequence.length;
        playNext();
      }, step.duration);
    };

    playNext();

    return () => clearTimeout(timeout);
  }, [isSurprise, expressions.length]);

  const handleSurprise = () => {
    if (isSurprise) return; 
    
    setIsSurprise(true);
    setCurrentAction("Jump"); 
    
    // Pick the "Surprised" expression if it exists, otherwise just a random one
    if (expressions.includes('Surprised')) {
      setCurrentExpression('Surprised');
    } else if (expressions.length > 0) {
      setCurrentExpression(expressions[Math.floor(Math.random() * expressions.length)]);
    }

    setTimeout(() => {
      setIsSurprise(false); 
      setCurrentExpression(null); // Reset expression after landing
    }, 2000);
  };

  const C = {
    purple: "#240747",
    parchment: "#F0E4D8"
  };

  return (
    <div
      onClick={handleSurprise}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: "450px",
        background: C.parchment,
        borderRadius: 24,
        border: `3px solid ${C.purple}`,
        overflow: "hidden",
        position: "relative",
        cursor: "pointer"
      }}
    >
      {/* 3D Canvas */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Canvas camera={{ position: [0, 2, 8], fov: 40 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[-5, 5, 5]} intensity={2} castShadow />
          <Environment preset="city" />
          <React.Suspense fallback={null}>
            <RobotModel actionName={currentAction} expression={currentExpression} />
            <ContactShadows opacity={0.6} scale={10} blur={2} far={4} position={[0, -2.5, 0]} />
          </React.Suspense>
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            maxPolarAngle={Math.PI / 2 + 0.1} 
            minPolarAngle={Math.PI / 4} 
          />
        </Canvas>
      </div>

      {/* Floating Info */}
      <div style={{ position: 'absolute', top: 20, right: 20, pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
        <span style={{ 
          fontFamily: "var(--font-mono)", 
          fontSize: "0.6rem", 
          letterSpacing: "0.15em", 
          textTransform: "uppercase", 
          color: "rgba(255,255,255,0.6)",
          background: "rgba(255,255,255,0.1)",
          padding: "0.3rem 0.6rem",
          borderRadius: "8px"
        }}>
          Click me!
        </span>
      </div>
    </div>
  );
}

useGLTF.preload('/models/RobotExpressive.glb');
