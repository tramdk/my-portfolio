import { Canvas, useFrame } from '@react-three/fiber';
import { Torus, Float, MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function RotatingRings() {
  const groupRef = useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.z = t * 0.2;
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Primary Blue Ring */}
      <Torus args={[3.2, 0.03, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial 
          color="#60a5fa" 
          emissive="#3b82f6" 
          emissiveIntensity={2} 
          toneMapped={false} 
        />
      </Torus>
      
      {/* Secondary Purple Ring */}
      <Torus args={[3.4, 0.015, 16, 100]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <meshStandardMaterial 
          color="#a78bfa" 
          emissive="#8b5cf6" 
          emissiveIntensity={1.5} 
          toneMapped={false}
        />
      </Torus>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={2} floatIntensity={1}>
          <mesh position={[
            Math.cos(i * 0.3) * 3.5,
            Math.sin(i * 0.3) * 3.5,
            Math.sin(i * 0.5) * 0.5
          ]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={3} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function ProfileFrame3D() {
  return (
    <div className="absolute -inset-20 z-0 pointer-events-none opacity-80">
      <Canvas camera={{ position: [0, 0, 10] }} alpha={true}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={2} />
        <RotatingRings />
      </Canvas>
    </div>
  );
}
