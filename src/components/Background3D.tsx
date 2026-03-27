import { Canvas } from '@react-three/fiber';
import { Stars, Float, Sphere } from '@react-three/drei';

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0 bg-slate-950 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        {/* Subtle star background */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        {/* Floating abstract tech spheres */}
        <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2} position={[3, 2, -4]}>
          <Sphere args={[1.2, 32, 32]}>
            <meshStandardMaterial color="#3b82f6" wireframe opacity={0.15} transparent />
          </Sphere>
        </Float>

        <Float speed={2} rotationIntensity={2} floatIntensity={1.5} position={[-4, -2, -5]}>
          <Sphere args={[1.8, 32, 32]}>
            <meshStandardMaterial color="#8b5cf6" wireframe opacity={0.1} transparent />
          </Sphere>
        </Float>

        <Float speed={1} rotationIntensity={1} floatIntensity={2} position={[2, -3, -3]}>
          <Sphere args={[0.8, 32, 32]}>
            <meshStandardMaterial color="#ec4899" wireframe opacity={0.15} transparent />
          </Sphere>
        </Float>
      </Canvas>
    </div>
  );
}
