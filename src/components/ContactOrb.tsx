import { useLayoutEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const ACCENT = "#e8823a";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useLayoutEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const listener = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);
  return reduced;
}

function Orb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const reduced = usePrefersReducedMotion();
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    if (!reduced) {
      meshRef.current.rotation.y += delta * 0.15;
    }
    const targetX = pointer.y * 0.15;
    const targetZ = -pointer.x * 0.15;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX, 0.03);
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, targetZ, 0.03);
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.5, 5]} />
      <MeshDistortMaterial
        color={ACCENT}
        distort={0.35}
        speed={reduced ? 0 : 1.4}
        wireframe
        roughness={0.3}
      />
    </mesh>
  );
}

export function ContactOrb() {
  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.2], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 3, 3]} intensity={0.8} />
        <Orb />
      </Canvas>
    </div>
  );
}
