"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  useGLTF,
} from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

function Machine() {
  const { scene } = useGLTF("/models/exchange-machine.glb");
  const model = useMemo(() => scene.clone(true), [scene]);
  const ref = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!ref.current) return;

    const materialCache = new Map<string, THREE.MeshStandardMaterial>();

    ref.current.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;

      const source = Array.isArray(object.material)
        ? object.material[0]
        : object.material;
      const key = source?.name || object.uuid;
      const sourceColor =
        source instanceof THREE.MeshStandardMaterial ||
        source instanceof THREE.MeshPhongMaterial ||
        source instanceof THREE.MeshBasicMaterial ||
        source instanceof THREE.MeshLambertMaterial
          ? source.color
          : new THREE.Color("#d8dde2");

      if (!materialCache.has(key)) {
        materialCache.set(
          key,
          new THREE.MeshStandardMaterial({
            name: key,
            color: sourceColor.clone(),
            metalness: 0.05,
            roughness: 0.42,
            side: THREE.DoubleSide,
          }),
        );
      }

      object.material = materialCache.get(key)!;
      object.geometry.computeVertexNormals();
    });

    const box = new THREE.Box3().setFromObject(ref.current);
    const center = box.getCenter(new THREE.Vector3());

    ref.current.position.x -= center.x;
    ref.current.position.y -= center.y;
    ref.current.position.z -= center.z;

    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    if (maxDim > 10) {
      const scale = 10 / maxDim;
      ref.current.scale.setScalar(scale);
    }
  }, [model]);

  return (
    <group ref={ref}>
      <primitive object={model} />
    </group>
  );
}

export default function ModelViewer() {
  return (
    <div className="h-[700px] w-full overflow-hidden rounded-lg bg-slate-100">
      <Canvas
        camera={{
          position: [0, 5, 18],
          fov: 38,
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

        <Machine />

        <OrbitControls
          makeDefault
          enablePan={false}
          minDistance={5}
          maxDistance={50}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
