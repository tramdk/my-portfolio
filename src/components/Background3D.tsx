import { Canvas } from '@react-three/fiber';
import { Stars, Float, Sphere } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function DragonBall({ position, scale = 1, starCount = 1 }: { position: [number, number, number], scale?: number, starCount?: number }) {
  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={2} position={position} scale={scale}>
      <group>
        {/* Outer transparent shell */}
        <Sphere args={[1, 32, 32]}>
          <meshPhysicalMaterial
            color="#f97316"
            emissive="#ea580c"
            emissiveIntensity={0.1}
            transmission={0.95}
            opacity={1}
            transparent
            roughness={0}
            ior={1.5}
            thickness={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </Sphere>
        {/* Inner stars (red) */}
        <group>
          {Array.from({ length: starCount }).map((_, i) => {
            const angle = (i / starCount) * Math.PI * 2;
            const radius = starCount === 1 ? 0 : 0.4;
            let posX = Math.cos(angle) * radius;
            let posY = Math.sin(angle) * radius;
            
            // Special arrangement for 7 stars
            if (starCount === 7) {
              if (i === 0) { posX = 0; posY = 0; }
              else {
                const a = ((i - 1) / 6) * Math.PI * 2;
                posX = Math.cos(a) * 0.5;
                posY = Math.sin(a) * 0.5;
              }
            }
            
            return (
              <Sphere key={i} args={[0.15, 16, 16]} position={[posX, posY, 0.2]}>
                <meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={0.5} />
              </Sphere>
            );
          })}
        </group>
      </group>
    </Float>
  );
}

function GokuNimbus({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={2} position={position}>
      <group scale={1.2}>
        {/* Nimbus Cloud (Cân Đẩu Vân) */}
        <group position={[0, -0.5, 0]}>
          <Sphere args={[0.8, 32, 32]} position={[0, 0, 0]} scale={[1.5, 0.6, 1]}>
            <meshStandardMaterial color="#facc15" emissive="#eab308" emissiveIntensity={0.4} roughness={0.8} />
          </Sphere>
          <Sphere args={[0.5, 32, 32]} position={[-0.8, 0.1, 0]} scale={[1, 0.8, 1]}>
            <meshStandardMaterial color="#facc15" emissive="#eab308" emissiveIntensity={0.4} roughness={0.8} />
          </Sphere>
          <Sphere args={[0.6, 32, 32]} position={[0.9, 0.1, 0]} scale={[1, 0.8, 1]}>
            <meshStandardMaterial color="#facc15" emissive="#eab308" emissiveIntensity={0.4} roughness={0.8} />
          </Sphere>
          <Sphere args={[0.4, 32, 32]} position={[-0.4, 0.2, 0.5]}>
            <meshStandardMaterial color="#facc15" emissive="#eab308" emissiveIntensity={0.4} roughness={0.8} />
          </Sphere>
          <Sphere args={[0.4, 32, 32]} position={[0.5, 0.2, -0.4]}>
            <meshStandardMaterial color="#facc15" emissive="#eab308" emissiveIntensity={0.4} roughness={0.8} />
          </Sphere>
          {/* Trail effect for Nimbus */}
          <Sphere args={[0.3, 16, 16]} position={[-1.4, 0.2, 0]} scale={[1, 0.6, 1]}>
            <meshStandardMaterial color="#facc15" emissive="#eab308" emissiveIntensity={0.2} transparent opacity={0.6} />
          </Sphere>
        </group>

        {/* Stylized Goku */}
        <group position={[0, 0.5, 0]}>
          {/* Legs */}
          <mesh position={[-0.2, -0.4, 0]} rotation={[0, 0, -0.2]}>
            <cylinderGeometry args={[0.12, 0.1, 0.5, 16]} />
            <meshStandardMaterial color="#ea580c" />
          </mesh>
          <mesh position={[0.2, -0.4, 0]} rotation={[0, 0, 0.2]}>
            <cylinderGeometry args={[0.12, 0.1, 0.5, 16]} />
            <meshStandardMaterial color="#ea580c" />
          </mesh>
          
          {/* Body (Orange Gi) */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.25, 0.3, 0.6, 16]} />
            <meshStandardMaterial color="#ea580c" />
          </mesh>
          
          {/* Belt (Blue) */}
          <mesh position={[0, -0.25, 0]}>
            <cylinderGeometry args={[0.31, 0.31, 0.1, 16]} />
            <meshStandardMaterial color="#1d4ed8" />
          </mesh>
          
          {/* Arms */}
          <mesh position={[-0.35, 0.1, 0]} rotation={[0, 0, 0.5]}>
            <cylinderGeometry args={[0.08, 0.08, 0.5, 16]} />
            <meshStandardMaterial color="#ffedd5" />
          </mesh>
          <mesh position={[0.35, 0.1, 0]} rotation={[0, 0, -0.5]}>
            <cylinderGeometry args={[0.08, 0.08, 0.5, 16]} />
            <meshStandardMaterial color="#ffedd5" />
          </mesh>

          {/* Head */}
          <Sphere args={[0.25, 32, 32]} position={[0, 0.45, 0]}>
            <meshStandardMaterial color="#ffedd5" />
          </Sphere>
          
          {/* Hair (Black Spikes) */}
          <group position={[0, 0.55, 0]}>
            <mesh position={[-0.2, 0.1, 0]} rotation={[0, 0, 0.6]}>
              <coneGeometry args={[0.1, 0.4, 8]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            <mesh position={[-0.1, 0.2, 0]} rotation={[0, 0, 0.3]}>
              <coneGeometry args={[0.12, 0.5, 8]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            <mesh position={[0, 0.25, 0]} rotation={[0, 0, 0]}>
              <coneGeometry args={[0.15, 0.6, 8]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            <mesh position={[0.1, 0.2, 0]} rotation={[0, 0, -0.3]}>
              <coneGeometry args={[0.12, 0.5, 8]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            <mesh position={[0.2, 0.1, 0]} rotation={[0, 0, -0.6]}>
              <coneGeometry args={[0.1, 0.4, 8]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            <mesh position={[0, 0.1, 0.15]} rotation={[0.4, 0, 0]}>
              <coneGeometry args={[0.1, 0.3, 8]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
          </group>
        </group>
      </group>
    </Float>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0 bg-slate-950 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffaa00" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#00aaff" />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={1} fade speed={2} />

        {/* Goku on Nimbus */}
        <GokuNimbus position={[-3, 1, -4]} />

        {/* Transparent Dragon Balls */}
        <DragonBall position={[3, -2, -2]} scale={0.8} starCount={4} />
        <DragonBall position={[4, 3, -5]} scale={0.6} starCount={1} />
        <DragonBall position={[-2, -3, -3]} scale={0.9} starCount={7} />
      </Canvas>
    </div>
  );
}
