import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_URLS = {
  desk: "/models/metal_office_desk.glb",
  laptop: "/models/classic_laptop.glb",
  lamp: "/models/desk_lamp_arm_01.glb",
};

useGLTF.preload(MODEL_URLS.desk);
useGLTF.preload(MODEL_URLS.laptop);
useGLTF.preload(MODEL_URLS.lamp);

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

/** Loads a GLTF and returns a clone plus its bounding box, so callers can place it deterministically. */
function useMeasuredGltf(url: string) {
  const gltf = useGLTF(url);
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);
  const box = useMemo(() => new THREE.Box3().setFromObject(scene), [scene]);
  const size = useMemo(() => box.getSize(new THREE.Vector3()), [box]);
  return { scene, box, size };
}

function DeskGroup() {
  const desk = useMeasuredGltf(MODEL_URLS.desk);
  const laptop = useMeasuredGltf(MODEL_URLS.laptop);
  const lamp = useMeasuredGltf(MODEL_URLS.lamp);

  const deskTopY = -desk.box.min.y + desk.size.y;
  const deskWidth = desk.size.x;
  const deskDepth = desk.size.z;

  const laptopPos: [number, number, number] = [
    deskWidth * 0.08,
    deskTopY - laptop.box.min.y,
    -deskDepth * 0.05,
  ];
  const lampPos: [number, number, number] = [
    -deskWidth * 0.32,
    deskTopY - lamp.box.min.y,
    -deskDepth * 0.22,
  ];

  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { pointer } = useThree();

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group || reducedMotion) return;
    group.rotation.y += delta * 0.08;
    const targetTiltX = pointer.y * 0.08;
    const targetTiltZ = -pointer.x * 0.08;
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetTiltX, 0.04);
    group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, targetTiltZ, 0.04);
  });

  return (
    <group ref={groupRef} rotation={[0, Math.PI * 0.18, 0]}>
      <group position={[0, -desk.box.min.y, 0]}>
        <primitive object={desk.scene} />
      </group>
      <primitive object={laptop.scene} position={laptopPos} />
      <primitive object={lamp.scene} position={lampPos} />
    </group>
  );
}

export function DeskScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [3.4, 2.2, 3.6], fov: 32 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[4, 6, 3]}
          intensity={1.4}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <Environment preset="city" environmentIntensity={0.4} />
        <group position={[0, -1.1, 0]} scale={1.15}>
          <DeskGroup />
          <ContactShadows opacity={0.5} scale={6} blur={2.4} far={2} />
        </group>
      </Canvas>
    </div>
  );
}
