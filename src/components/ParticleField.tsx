import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const ACCENT = "#e8823a";
const BOUNDS = { x: 5.5, y: 3.4, z: 2.2 };
const LINK_DISTANCE = 1.7;

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

function Network({ count = 80 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);
  const reduced = usePrefersReducedMotion();
  const { pointer } = useThree();
  const frameCount = useRef(0);

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * BOUNDS.x * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * BOUNDS.y * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * BOUNDS.z * 2;
      velocities[i * 3] = (Math.random() - 0.5) * 0.012;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.012;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.006;
    }
    return { positions, velocities };
  }, [count]);

  const maxPairs = (count * (count - 1)) / 2;
  const linePositions = useMemo(() => new Float32Array(maxPairs * 2 * 3), [maxPairs]);

  const updateLinks = () => {
    const posAttr = pointsRef.current!.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const lineAttr = linesRef.current!.geometry.attributes.position as THREE.BufferAttribute;
    const larr = lineAttr.array as Float32Array;

    let pairCount = 0;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = arr[i * 3] - arr[j * 3];
        const dy = arr[i * 3 + 1] - arr[j * 3 + 1];
        const dz = arr[i * 3 + 2] - arr[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < LINK_DISTANCE) {
          const o = pairCount * 6;
          larr[o] = arr[i * 3];
          larr[o + 1] = arr[i * 3 + 1];
          larr[o + 2] = arr[i * 3 + 2];
          larr[o + 3] = arr[j * 3];
          larr[o + 4] = arr[j * 3 + 1];
          larr[o + 5] = arr[j * 3 + 2];
          pairCount++;
        }
      }
    }
    linesRef.current!.geometry.setDrawRange(0, pairCount * 2);
    lineAttr.needsUpdate = true;
  };

  useLayoutEffect(() => {
    updateLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      const targetY = pointer.x * 0.12;
      const targetX = -pointer.y * 0.06;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.02);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.02);
    }

    if (reduced) return;

    const posAttr = pointsRef.current!.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities[i * 3];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      arr[i * 3 + 2] += velocities[i * 3 + 2];
      if (arr[i * 3] > BOUNDS.x || arr[i * 3] < -BOUNDS.x) velocities[i * 3] *= -1;
      if (arr[i * 3 + 1] > BOUNDS.y || arr[i * 3 + 1] < -BOUNDS.y) velocities[i * 3 + 1] *= -1;
      if (arr[i * 3 + 2] > BOUNDS.z || arr[i * 3 + 2] < -BOUNDS.z) velocities[i * 3 + 2] *= -1;
    }
    posAttr.needsUpdate = true;

    frameCount.current += 1;
    if (frameCount.current % 3 === 0) updateLinks();
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color={ACCENT} size={0.05} sizeAttenuation transparent opacity={0.85} />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={ACCENT} transparent opacity={0.12} />
      </lineSegments>
    </group>
  );
}

export function ParticleField() {
  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Network />
      </Canvas>
    </div>
  );
}
