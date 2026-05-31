"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Bounds,
  Center,
  OrbitControls,
  Environment,
  useGLTF,
} from "@react-three/drei";
import {
  Suspense,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import * as THREE from "three";

type ModelViewerProps = {
  variant?: "product" | "hero";
  allowInsideView?: boolean;
};

type MachineProps = {
  animateAssembly?: boolean;
  insideView?: boolean;
};

const coverMeshNames = new Set(["Node1", "Node4", "Node5"]);
const topPlateMeshNames = new Set(["Node10", "Node14", "Node17", "Node31"]);
const productModelRotation: [number, number, number] = [
  -0.62,
  Math.PI - 0.72,
  -0.16,
];

function getMaterialColor(material: THREE.Material | undefined) {
  const encodedColor = material?.name.match(/^FF([0-9A-Fa-f]{6})$/)?.[1];

  if (encodedColor) {
    return new THREE.Color(`#${encodedColor}`);
  }

  if (
    material instanceof THREE.MeshStandardMaterial ||
    material instanceof THREE.MeshPhongMaterial ||
    material instanceof THREE.MeshBasicMaterial ||
    material instanceof THREE.MeshLambertMaterial
  ) {
    return material.color.clone();
  }

  return new THREE.Color("#d8dde2");
}

function Machine({ animateAssembly = false, insideView = false }: MachineProps) {
  const { scene } = useGLTF("/models/exchange-machine.glb");
  const model = useMemo(() => scene.clone(true), [scene]);

  useLayoutEffect(() => {
    const materialCache = new Map<string, THREE.MeshStandardMaterial>();

    model.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;

      const source = Array.isArray(object.material)
        ? object.material[0]
        : object.material;
      const isCoverMesh = coverMeshNames.has(object.name);
      const isTopPlateMesh = topPlateMeshNames.has(object.name);
      const key = `${source?.name || object.uuid}-${insideView && isCoverMesh ? "ghost" : "solid"}`;
      const sourceColor = getMaterialColor(source);

      if (!materialCache.has(key)) {
        materialCache.set(
          key,
          new THREE.MeshStandardMaterial({
            name: key,
            color: sourceColor.clone(),
            metalness: 0.05,
            roughness: insideView && isCoverMesh ? 0.18 : 0.42,
            transparent: insideView && isCoverMesh,
            opacity: insideView && isCoverMesh ? 0.16 : 1,
            depthWrite: !(insideView && isCoverMesh),
            side: THREE.DoubleSide,
          }),
        );
      }

      object.material = materialCache.get(key)!;
      object.geometry.computeVertexNormals();
      object.visible = !(insideView && isTopPlateMesh);
    });

    if (!animateAssembly) return;

    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    let index = 0;

    model.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;

      const finalPosition = object.position.clone();
      const worldPosition = object.getWorldPosition(new THREE.Vector3());
      const direction = worldPosition.sub(center);

      if (direction.lengthSq() < 0.001) {
        direction.set(
          Math.sin(index * 1.7),
          Math.cos(index * 2.1),
          Math.sin(index * 2.6),
        );
      }

      direction.normalize().multiplyScalar(26);

      object.userData.finalPosition = finalPosition;
      object.userData.startPosition = finalPosition.clone().add(direction);
      object.position.copy(object.userData.startPosition);
      index += 1;
    });
  }, [animateAssembly, insideView, model]);

  useFrame(({ clock }) => {
    if (!animateAssembly) return;

    const progress = Math.min(clock.getElapsedTime() / 2.4, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);

    model.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;

      const startPosition = object.userData.startPosition as
        | THREE.Vector3
        | undefined;
      const finalPosition = object.userData.finalPosition as
        | THREE.Vector3
        | undefined;

      if (!startPosition || !finalPosition) return;

      object.position.lerpVectors(
        startPosition,
        finalPosition,
        easedProgress,
      );
    });
  });

  return (
    <Center>
      <group rotation={productModelRotation}>
        <primitive object={model} />
      </group>
    </Center>
  );
}

function MuseumRig({
  children,
  enabled,
}: {
  children: ReactNode;
  enabled: boolean;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current || !enabled) return;

    const elapsed = clock.getElapsedTime();
    const assemblyProgress = Math.min(elapsed / 2.4, 1);
    const rotationProgress = Math.max(elapsed - 1.8, 0);

    ref.current.rotation.y = 0.05 * assemblyProgress + rotationProgress * 0.035;
    ref.current.rotation.x = 0.2;
    ref.current.rotation.z = -0.04;
  });

  return <group ref={ref}>{children}</group>;
}

export default function ModelViewer({
  variant = "product",
  allowInsideView = false,
}: ModelViewerProps) {
  const isHero = variant === "hero";
  const [insideView, setInsideView] = useState(false);

  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg bg-slate-100 ${
        isHero ? "h-full min-h-[440px]" : "h-[700px]"
      }`}
    >
      {allowInsideView && (
        <div className="absolute left-4 top-4 z-10 flex rounded-full border border-slate-300 bg-white/90 p-1 shadow-lg shadow-slate-900/10 backdrop-blur">
          <button
            type="button"
            onClick={() => setInsideView(false)}
            className={`rounded-full px-4 py-2 text-sm font-black transition ${
              insideView
                ? "text-slate-600 hover:text-slate-950"
                : "bg-slate-950 text-white"
            }`}
          >
            Exterior
          </button>
          <button
            type="button"
            onClick={() => setInsideView(true)}
            className={`rounded-full px-4 py-2 text-sm font-black transition ${
              insideView
                ? "bg-teal-500 text-white"
                : "text-slate-600 hover:text-slate-950"
            }`}
          >
            See inside
          </button>
        </div>
      )}
      <Canvas
        camera={{
          position: isHero ? [10, 14, 24] : [10, 14, 24],
          fov: isHero ? 42 : 42,
        }}
      >
        <color attach="background" args={["#f1f5f9"]} />

        <hemisphereLight
          args={["#ffffff", "#64748b", 1.3]}
        />

        <directionalLight
          position={[12, 12, 12]}
          intensity={2.4}
        />

        <directionalLight
          position={[-10, 5, -10]}
          intensity={0.8}
        />

        <Environment preset="studio" />

        <Suspense fallback={null}>
          <Bounds
            key={insideView ? "inside" : "exterior"}
            fit
            clip
            observe
            margin={isHero ? 2.35 : 2.05}
          >
            <MuseumRig enabled={isHero}>
              <Machine animateAssembly={isHero} insideView={insideView} />
            </MuseumRig>
          </Bounds>
        </Suspense>

        {!isHero && (
          <OrbitControls
            makeDefault
            enablePan={false}
            minDistance={5}
            maxDistance={50}
            autoRotate
            autoRotateSpeed={0.5}
          />
        )}
      </Canvas>
    </div>
  );
}
