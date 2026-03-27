import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Sphere, OrbitControls, MeshDistortMaterial } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function TechNode({ position, size = 0.5, color = "#00f2ff" }: { position: [number, number, number], size?: number, color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
      meshRef.current.position.y += Math.sin(state.clock.getElapsedTime() + position[0]) * 0.002;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5} position={position}>
      <Sphere ref={meshRef} args={[size, 16, 16]}>
        <meshStandardMaterial 
          color={color} 
          wireframe
          transparent 
          opacity={0.6}
          emissive={color}
          emissiveIntensity={1}
        />
      </Sphere>
      <pointLight intensity={2} distance={5} color={color} />
    </Float>
  );
}

function DataConnection({ nodeA, nodeB, color = "#4f46e5" }: { nodeA: [number, number, number], nodeB: [number, number, number], color?: string }) {
  const points = useMemo(() => [new THREE.Vector3(...nodeA), new THREE.Vector3(...nodeB)], [nodeA, nodeB]);
  const lineGeometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial color={color} transparent opacity={0.2} linewidth={1} />
    </line>
  );
}

function DigitalRain() {
  const count = 40;
  const positions = useMemo(() => {
    return Array.from({ length: count }).map(() => ([
      (Math.random() - 0.5) * 40,
      Math.random() * 20 - 10,
      (Math.random() - 0.5) * 20
    ] as [number, number, number]));
  }, []);

  return (
    <group>
      {positions.map((pos, i) => (
        <TechNode key={i} position={pos} size={Math.random() * 0.3 + 0.1} color={i % 3 === 0 ? "#22d3ee" : "#6366f1"} />
      ))}
    </group>
  );
}

function TechCore() {
  return (
    <group position={[0, 0, 0]}>
      <Sphere args={[2.5, 64, 64]}>
        <MeshDistortMaterial
          color="#0ea5e9"
          emissive="#312e81"
          emissiveIntensity={0.5}
          distort={0.4}
          speed={4}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
      {/* Outer shell */}
      <Sphere args={[3, 32, 32]}>
        <meshStandardMaterial color="#0ea5e9" wireframe transparent opacity={0.1} />
      </Sphere>
      <pointLight intensity={10} distance={50} color="#00f2ff" />
    </group>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0 bg-[#020617] pointer-events-none">
      <Canvas camera={{ position: [0, 5, 20], fov: 45 }}>
        <fog attach="fog" args={["#020617", 10, 50]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#4f46e5" />
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={1} fade speed={1} />
        
        <group rotation={[Math.PI / 10, 0, 0]}>
          <TechCore />
          <DigitalRain />
        </group>

        {/* Dynamic slow rotation of the whole setup */}
        <SceneController />
      </Canvas>
      
      {/* Visual Overlay for Screen Space Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020617_100%)] opacity-60" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none" />
    </div>
  );
}

function SceneController() {
  useFrame((state) => {
    state.camera.position.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 2;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}


