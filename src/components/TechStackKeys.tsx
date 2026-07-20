import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, Environment } from "@react-three/drei";
import * as THREE from "three";
import { techStack, type TechKey } from "../data/techStack";

const COLUMNS = 4;
const GAP = 1.08;

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

function relativeLuminance(hex: string) {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16) / 255;
  const g = parseInt(c.slice(2, 4), 16) / 255;
  const b = parseInt(c.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function makeKeyTexture(key: TechKey) {
  const size = 320;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const textColor = relativeLuminance(key.color) > 0.55 ? "#111113" : "#fafafa";
  const dotOffColor = relativeLuminance(key.color) > 0.55 ? "rgba(17,17,19,0.28)" : "rgba(250,250,250,0.28)";

  ctx.fillStyle = key.color;
  ctx.fillRect(0, 0, size, size);

  ctx.fillStyle = textColor;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const maxWidth = size - 40;
  let fontSize = 46;
  do {
    ctx.font = `700 ${fontSize}px 'Geist Mono Variable', ui-monospace, monospace`;
    fontSize -= 2;
  } while (ctx.measureText(key.name).width > maxWidth && fontSize > 20);

  ctx.fillText(key.name, size / 2, size / 2 - 14);

  const dotY = size / 2 + 58;
  const dotSpacing = 32;
  const startX = size / 2 - dotSpacing;
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc(startX + i * dotSpacing, dotY, 7, 0, Math.PI * 2);
    ctx.fillStyle = i < key.level ? textColor : dotOffColor;
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function Key({
  data,
  position,
}: {
  data: TechKey;
  position: [number, number, number];
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [pressed, setPressed] = useState(false);
  const texture = useMemo(() => makeKeyTexture(data), [data]);

  useFrame(() => {
    if (!groupRef.current) return;
    const target = pressed ? -0.09 : 0;
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      target,
      0.25
    );
  });

  return (
    <group
      position={position}
      onPointerDown={(e) => {
        e.stopPropagation();
        setPressed(true);
      }}
      onPointerUp={() => setPressed(false)}
      onPointerOut={() => setPressed(false)}
    >
      <group ref={groupRef}>
        <RoundedBox args={[0.92, 0.28, 0.92]} radius={0.07} smoothness={4}>
          <meshStandardMaterial color={data.color} roughness={0.45} metalness={0.1} />
        </RoundedBox>
        <mesh position={[0, 0.145, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.82, 0.82]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

function Keyboard() {
  const groupRef = useRef<THREE.Group>(null);
  const reduced = usePrefersReducedMotion();
  const { pointer } = useThree();

  const rows = Math.ceil(techStack.length / COLUMNS);
  const offsetX = ((COLUMNS - 1) * GAP) / 2;
  const offsetZ = ((rows - 1) * GAP) / 2;

  useFrame(() => {
    if (!groupRef.current || reduced) return;
    const targetY = pointer.x * 0.1;
    const targetX = pointer.y * 0.04;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.03);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.03);
  });

  return (
    <group ref={groupRef}>
      {techStack.map((key, i) => {
        const col = i % COLUMNS;
        const row = Math.floor(i / COLUMNS);
        return (
          <Key
            key={key.name}
            data={key}
            position={[col * GAP - offsetX, 0, row * GAP - offsetZ]}
          />
        );
      })}
    </group>
  );
}

export function TechStackKeys() {
  return (
    <div className="absolute inset-0">
      <Canvas
        orthographic
        dpr={[1, 1.5]}
        camera={{ position: [4.4, 4.8, 4.4], zoom: 95, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 5, 3]} intensity={1.1} />
        <Environment preset="city" environmentIntensity={0.3} />
        <Keyboard />
      </Canvas>
    </div>
  );
}
