import fs from "node:fs";
import path from "node:path";
import initOcct from "occt-import-js";

const [, , inputPath, outputPath] = process.argv;

if (!inputPath || !outputPath) {
  console.error("Usage: node scripts/convert-step-to-glb.mjs input.step output.glb");
  process.exit(1);
}

const align4 = (value) => (value + 3) & ~3;
const colorKey = (color) =>
  (color ?? [0.72, 0.75, 0.78])
    .map((channel) => Math.round(channel * 1000) / 1000)
    .join(",");

function collectGroups(root) {
  const groups = [];

  function visit(node) {
    if (node.meshes?.length) {
      groups.push({
        name: node.name || `Assembly group ${groups.length + 1}`,
        meshIndices: node.meshes,
      });
    }

    node.children?.forEach(visit);
  }

  visit(root);
  return groups;
}

function buildGeometryGroups(result) {
  return collectGroups(result.root).map((group) => {
    const positions = [];
    const normals = [];
    const indicesByColor = new Map();
    let vertexOffset = 0;

    for (const meshIndex of group.meshIndices) {
      const mesh = result.meshes[meshIndex];
      const meshPositions = mesh.attributes.position.array;
      const meshNormals = mesh.attributes.normal?.array ?? [];
      const meshIndices = mesh.index.array;
      const defaultColor = mesh.color ?? [0.72, 0.75, 0.78];
      const coveredTriangles = new Set();

      for (const face of mesh.brep_faces ?? []) {
        const color = face.color ?? defaultColor;
        const key = colorKey(color);

        if (!indicesByColor.has(key)) {
          indicesByColor.set(key, { color, indices: [] });
        }

        const target = indicesByColor.get(key).indices;

        for (let triangle = face.first; triangle <= face.last; triangle += 1) {
          const offset = triangle * 3;
          coveredTriangles.add(triangle);
          target.push(
            meshIndices[offset] + vertexOffset,
            meshIndices[offset + 1] + vertexOffset,
            meshIndices[offset + 2] + vertexOffset,
          );
        }
      }

      const fallbackKey = colorKey(defaultColor);
      if (!indicesByColor.has(fallbackKey)) {
        indicesByColor.set(fallbackKey, {
          color: defaultColor,
          indices: [],
        });
      }

      const fallback = indicesByColor.get(fallbackKey).indices;
      const triangleCount = meshIndices.length / 3;

      for (let triangle = 0; triangle < triangleCount; triangle += 1) {
        if (coveredTriangles.has(triangle)) continue;
        const offset = triangle * 3;
        fallback.push(
          meshIndices[offset] + vertexOffset,
          meshIndices[offset + 1] + vertexOffset,
          meshIndices[offset + 2] + vertexOffset,
        );
      }

      for (let index = 0; index < meshPositions.length; index += 3) {
        positions.push(
          meshPositions[index] * 0.001,
          meshPositions[index + 1] * 0.001,
          meshPositions[index + 2] * 0.001,
        );
      }

      if (meshNormals.length === meshPositions.length) {
        normals.push(...meshNormals);
      } else {
        normals.push(...new Array(meshPositions.length).fill(0));
      }

      vertexOffset += meshPositions.length / 3;
    }

    return {
      name: group.name,
      positions: new Float32Array(positions),
      normals: new Float32Array(normals),
      primitives: [...indicesByColor.values()]
        .filter((entry) => entry.indices.length)
        .map((entry) => ({
          color: entry.color,
          indices: new Uint32Array(entry.indices),
        })),
    };
  });
}

function createGlb(geometryGroups) {
  const gltf = {
    asset: { version: "2.0", generator: "Medivonix STEP converter" },
    scene: 0,
    scenes: [{ nodes: [] }],
    nodes: [],
    meshes: [],
    materials: [],
    accessors: [],
    bufferViews: [],
    buffers: [{ byteLength: 0 }],
  };
  const chunks = [];
  const materialMap = new Map();
  let byteOffset = 0;

  function addChunk(typedArray, target) {
    const source = Buffer.from(
      typedArray.buffer,
      typedArray.byteOffset,
      typedArray.byteLength,
    );
    const paddedLength = align4(source.length);
    const chunk = Buffer.alloc(paddedLength);
    source.copy(chunk);

    const bufferView = gltf.bufferViews.length;
    gltf.bufferViews.push({
      buffer: 0,
      byteOffset,
      byteLength: source.length,
      target,
    });
    chunks.push(chunk);
    byteOffset += paddedLength;
    return bufferView;
  }

  function addAccessor(typedArray, type, componentType, target, min, max) {
    const bufferView = addChunk(typedArray, target);
    const accessor = gltf.accessors.length;
    gltf.accessors.push({
      bufferView,
      componentType,
      count: typedArray.length / (type === "VEC3" ? 3 : 1),
      type,
      ...(min ? { min } : {}),
      ...(max ? { max } : {}),
    });
    return accessor;
  }

  function getMaterial(color) {
    const key = colorKey(color);
    if (materialMap.has(key)) return materialMap.get(key);

    const material = gltf.materials.length;
    gltf.materials.push({
      name: `Material ${key}`,
      pbrMetallicRoughness: {
        baseColorFactor: [color[0], color[1], color[2], 1],
        metallicFactor: 0.03,
        roughnessFactor: 0.48,
      },
      doubleSided: true,
    });
    materialMap.set(key, material);
    return material;
  }

  for (const group of geometryGroups) {
    const min = [Infinity, Infinity, Infinity];
    const max = [-Infinity, -Infinity, -Infinity];

    for (let index = 0; index < group.positions.length; index += 3) {
      for (let axis = 0; axis < 3; axis += 1) {
        min[axis] = Math.min(min[axis], group.positions[index + axis]);
        max[axis] = Math.max(max[axis], group.positions[index + axis]);
      }
    }

    const positionAccessor = addAccessor(
      group.positions,
      "VEC3",
      5126,
      34962,
      min,
      max,
    );
    const normalAccessor = addAccessor(
      group.normals,
      "VEC3",
      5126,
      34962,
    );
    const primitives = group.primitives.map((primitive) => ({
      attributes: {
        POSITION: positionAccessor,
        NORMAL: normalAccessor,
      },
      indices: addAccessor(primitive.indices, "SCALAR", 5125, 34963),
      material: getMaterial(primitive.color),
      mode: 4,
    }));
    const mesh = gltf.meshes.length;
    const node = gltf.nodes.length;

    gltf.meshes.push({ name: group.name, primitives });
    gltf.nodes.push({ name: group.name, mesh });
    gltf.scenes[0].nodes.push(node);
  }

  const binaryChunk = Buffer.concat(chunks);
  gltf.buffers[0].byteLength = binaryChunk.length;

  const jsonSource = Buffer.from(JSON.stringify(gltf));
  const jsonChunk = Buffer.alloc(align4(jsonSource.length), 0x20);
  jsonSource.copy(jsonChunk);

  const header = Buffer.alloc(12);
  header.writeUInt32LE(0x46546c67, 0);
  header.writeUInt32LE(2, 4);
  header.writeUInt32LE(12 + 8 + jsonChunk.length + 8 + binaryChunk.length, 8);

  const jsonHeader = Buffer.alloc(8);
  jsonHeader.writeUInt32LE(jsonChunk.length, 0);
  jsonHeader.writeUInt32LE(0x4e4f534a, 4);

  const binaryHeader = Buffer.alloc(8);
  binaryHeader.writeUInt32LE(binaryChunk.length, 0);
  binaryHeader.writeUInt32LE(0x004e4942, 4);

  return Buffer.concat([
    header,
    jsonHeader,
    jsonChunk,
    binaryHeader,
    binaryChunk,
  ]);
}

const occt = await initOcct();
const result = occt.ReadStepFile(fs.readFileSync(inputPath), {
  linearUnit: "millimeter",
  linearDeflectionType: "bounding_box_ratio",
  linearDeflection: 0.005,
  angularDeflection: 0.5,
});

if (!result.success) {
  throw new Error(`Could not import STEP file: ${inputPath}`);
}

const geometryGroups = buildGeometryGroups(result);
const glb = createGlb(geometryGroups);

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, glb);

const triangleCount = geometryGroups.reduce(
  (total, group) =>
    total +
    group.primitives.reduce(
      (subtotal, primitive) => subtotal + primitive.indices.length / 3,
      0,
    ),
  0,
);

console.log(
  `Created ${outputPath} with ${geometryGroups.length} groups and ${triangleCount} triangles.`,
);
