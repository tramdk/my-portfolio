import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// ─── Glowing Corner Bracket ───────────────────────────────────────────────────
function CornerBrackets() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      const pulse = Math.sin(state.clock.getElapsedTime() * 2) * 0.05 + 1;
      groupRef.current.scale.setScalar(pulse);
    }
  });

  const bracketColor = '#60a5fa';
  const bracketEmissive = '#3b82f6';
  const bracketMat = (
    <meshStandardMaterial
      color={bracketColor}
      emissive={bracketEmissive}
      emissiveIntensity={3}
      toneMapped={false}
    />
  );

  const thickness = 0.04;
  const len = 0.9;
  const offset = 3.1;

  const corners: [number, number, number, number][] = [
    [1, 1, 0, 0],
    [-1, 1, Math.PI / 2, 0],
    [-1, -1, Math.PI, 0],
    [1, -1, -Math.PI / 2, 0],
  ];

  return (
    <group ref={groupRef}>
      {corners.map(([sx, sy, rot], i) => (
        <group key={i} rotation={[0, 0, rot]}>
          {/* Horizontal bar */}
          <mesh position={[sx * (offset - len / 2), sy * offset, 0]}>
            <boxGeometry args={[len, thickness, thickness]} />
            {bracketMat}
          </mesh>
          {/* Vertical bar */}
          <mesh position={[sx * offset, sy * (offset - len / 2), 0]}>
            <boxGeometry args={[thickness, len, thickness]} />
            {bracketMat}
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ─── Orbital Ring ─────────────────────────────────────────────────────────────
function OrbitalRings() {
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);
  const ring3 = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1.current) ring1.current.rotation.z = t * 0.3;
    if (ring2.current) ring2.current.rotation.z = -t * 0.2;
    if (ring3.current) ring3.current.rotation.z = t * 0.15;
  });

  return (
    <group>
      {/* Outer scan ring */}
      <mesh ref={ring1}>
        <torusGeometry args={[4.2, 0.025, 16, 120]} />
        <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={2} toneMapped={false} transparent opacity={0.6} />
      </mesh>
      {/* Middle ring — tilted */}
      <mesh ref={ring2} rotation={[Math.PI * 0.15, 0, 0]}>
        <torusGeometry args={[3.7, 0.018, 16, 120]} />
        <meshStandardMaterial color="#a78bfa" emissive="#7c3aed" emissiveIntensity={1.8} toneMapped={false} transparent opacity={0.5} />
      </mesh>
      {/* Inner fast ring */}
      <mesh ref={ring3} rotation={[0, Math.PI * 0.1, 0]}>
        <torusGeometry args={[3.2, 0.012, 16, 100]} />
        <meshStandardMaterial color="#34d399" emissive="#10b981" emissiveIntensity={1.5} toneMapped={false} transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

// ─── Holographic scan line ────────────────────────────────────────────────────
function ScanLine() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Oscillate from bottom to top of portrait area
    const y = Math.sin(t * 0.8) * 3.5;
    if (meshRef.current) meshRef.current.position.y = y;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0.1]}>
      <planeGeometry args={[6.4, 0.06]} />
      <meshStandardMaterial
        color="#60a5fa"
        emissive="#60a5fa"
        emissiveIntensity={4}
        transparent
        opacity={0.25}
        toneMapped={false}
      />
    </mesh>
  );
}

// ─── Floating Particles ───────────────────────────────────────────────────────
function Particles() {
  const count = 28;
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  const particles = useMemo(() =>
    Array.from({ length: count }).map((_, i) => ({
      radius: 3.8 + (i % 3) * 0.4,
      angle: (i / count) * Math.PI * 2,
      height: (Math.random() - 0.5) * 6,
      size: 0.04 + Math.random() * 0.04,
      speed: 1 + Math.random() * 2,
      color: ['#60a5fa', '#a78bfa', '#34d399', '#f472b6'][i % 4],
    })), []
  );

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <Float key={i} speed={p.speed} rotationIntensity={1} floatIntensity={1.5}>
          <mesh position={[
            Math.cos(p.angle) * p.radius,
            p.height,
            Math.sin(p.angle) * p.radius * 0.3,
          ]}>
            <sphereGeometry args={[p.size, 8, 8]} />
            <meshStandardMaterial color={p.color} emissive={p.color} emissiveIntensity={4} toneMapped={false} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// ─── Energy Core ──────────────────────────────────────────────────────────────
function EnergyCore() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      meshRef.current.rotation.x = t * 0.3;
      meshRef.current.rotation.y = t * 0.5;
    }
  });

  return (
    <Float speed={2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, -1]}>
        <icosahedronGeometry args={[1.2, 1]} />
        <MeshDistortMaterial
          color="#3b82f6"
          emissive="#1d4ed8"
          emissiveIntensity={0.5}
          distort={0.4}
          speed={3}
          transparent
          opacity={0.08}
          wireframe
        />
      </mesh>
    </Float>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ProfileFrame3D() {
  return (
    <div className="absolute -inset-24 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#60a5fa" />
        <pointLight position={[-5, -5, 3]} intensity={1.5} color="#a78bfa" />
        <pointLight position={[0, 4, 4]} intensity={1} color="#34d399" />

        <CornerBrackets />
        <OrbitalRings />
        <ScanLine />
        <Particles />
        <EnergyCore />
      </Canvas>
    </div>
  );
}
