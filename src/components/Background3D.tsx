import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Sphere, MeshDistortMaterial, Trail } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function Planet({ 
  radius, 
  distance, 
  speed, 
  color, 
  roughness = 0.5, 
  metalness = 0.5,
  hasRing = false 
}: { 
  radius: number, 
  distance: number, 
  speed: number, 
  color: string,
  roughness?: number,
  metalness?: number,
  hasRing?: boolean
}) {
  const planetRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    if (planetRef.current) {
      planetRef.current.position.x = Math.cos(t) * distance;
      planetRef.current.position.z = Math.sin(t) * distance;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={planetRef}>
      <Trail 
        width={1} 
        length={10} 
        color={color} 
        attenuation={(t) => t * t}
      >
        <Sphere ref={meshRef} args={[radius, 32, 32]}>
          <meshStandardMaterial 
            color={color} 
            roughness={roughness} 
            metalness={metalness} 
            emissive={color}
            emissiveIntensity={0.2}
          />
        </Sphere>
      </Trail>
      
      {hasRing && (
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <ringGeometry args={[radius * 1.4, radius * 2.2, 64]} />
          <meshStandardMaterial 
            color={color} 
            transparent 
            opacity={0.4} 
            side={THREE.DoubleSide} 
          />
        </mesh>
      )}
    </group>
  );
}

function Sun() {
  return (
    <group>
      <Sphere args={[2, 64, 64]}>
        <MeshDistortMaterial
          color="#facc15"
          emissive="#ea580c"
          emissiveIntensity={2}
          distort={0.4}
          speed={2}
        />
      </Sphere>
      <pointLight intensity={10} distance={100} color="#f97316" />
      <div className="sun-glow" />
    </group>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0 bg-[#020617] pointer-events-none">
      <Canvas camera={{ position: [0, 15, 25], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <Stars radius={150} depth={50} count={5000} factor={4} saturation={1} fade speed={1} />
        
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
          <group rotation={[-Math.PI / 8, 0, 0]}>
            <Sun />
            
            {/* Mercury */}
            <Planet radius={0.3} distance={4} speed={0.8} color="#94a3b8" />
            
            {/* Venus */}
            <Planet radius={0.5} distance={6} speed={0.6} color="#fbbf24" />
            
            {/* Earth */}
            <Planet radius={0.6} distance={8} speed={0.4} color="#3b82f6" />
            
            {/* Mars */}
            <Planet radius={0.4} distance={10} speed={0.3} color="#ef4444" />
            
            {/* Jupiter */}
            <Planet radius={1.2} distance={14} speed={0.2} color="#d97706" />
            
            {/* Saturn */}
            <Planet radius={1.0} distance={18} speed={0.15} color="#eab308" hasRing={true} />
            
            {/* Uranus */}
            <Planet radius={0.7} distance={22} speed={0.1} color="#60a5fa" />
            
            {/* Neptune */}
            <Planet radius={0.7} distance={25} speed={0.08} color="#4f46e5" />
          </group>
        </Float>
      </Canvas>
      
      {/* Visual Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020617]/80" />
    </div>
  );
}

