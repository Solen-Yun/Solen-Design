import { createRoot } from "react-dom/client";
import { ModelViewer } from "../src/react/index.js";

/* 模型展台：左边是自动取景自转的默认展台，右边换了个取景比例、俯仰角与旋入入场；拖拽、缩放、双击回正随便玩。 */

/* Demo asset is generated in code: a torus exported as an inline glTF data URI. */
function torusModel(R = 0.72, r = 0.3, segU = 40, segV = 20) {
  const positions = [];
  const normals = [];
  const indices = [];
  for (let i = 0; i <= segU; i++) {
    const u = (i / segU) * Math.PI * 2;
    const cu = Math.cos(u);
    const su = Math.sin(u);
    for (let j = 0; j <= segV; j++) {
      const v = (j / segV) * Math.PI * 2;
      const cv = Math.cos(v);
      const sv = Math.sin(v);
      positions.push((R + r * cv) * cu, r * sv, (R + r * cv) * su);
      normals.push(cv * cu, sv, cv * su);
    }
  }
  for (let i = 0; i < segU; i++) {
    for (let j = 0; j < segV; j++) {
      const a = i * (segV + 1) + j;
      const b = a + segV + 1;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }
  const toBytes = (array) => {
    const floats = Float32Array.from(array);
    return new Uint8Array(floats.buffer, floats.byteOffset, floats.byteLength);
  };
  const pb = toBytes(positions);
  const nb = toBytes(normals);
  const ib = new Uint8Array(Uint16Array.from(indices).buffer);
  const total = pb.length + nb.length + ib.length;
  const bytes = new Uint8Array(total);
  bytes.set(pb, 0);
  bytes.set(nb, pb.length);
  bytes.set(ib, pb.length + nb.length);
  const table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let base64 = "";
  for (let i = 0; i < bytes.length; i += 3) {
    const n = (bytes[i] << 16) | (bytes[i + 1] << 8) | (bytes[i + 2] ?? 0);
    base64 += table[(n >> 18) & 63] + table[(n >> 12) & 63] + table[(n >> 6) & 63] + (bytes[i + 2] !== undefined ? table[n & 63] : "=");
  }
  const gltf = {
    asset: { version: "2.0" },
    scene: 0,
    scenes: [{ nodes: [0] }],
    nodes: [{ mesh: 0, name: "Ring" }],
    meshes: [{ primitives: [{ attributes: { POSITION: 0, NORMAL: 1 }, indices: 2, material: 0 }] }],
    materials: [{ pbrMetallicRoughness: { baseColorFactor: [0.36, 0.5, 0.58, 1], metallicFactor: 0.85, roughnessFactor: 0.28 } }],
    buffers: [{ uri: `data:application/octet-stream;base64,${base64}`, byteLength: total }],
    bufferViews: [
      { buffer: 0, byteOffset: 0, byteLength: pb.length },
      { buffer: 0, byteOffset: pb.length, byteLength: nb.length },
      { buffer: 0, byteOffset: pb.length + nb.length, byteLength: ib.length },
    ],
    accessors: [
      { bufferView: 0, componentType: 5126, count: positions.length / 3, type: "VEC3", min: [-R - r, -r, -R - r], max: [R + r, r, R + r] },
      { bufferView: 1, componentType: 5126, count: normals.length / 3, type: "VEC3" },
      { bufferView: 2, componentType: 5123, count: indices.length, type: "SCALAR" },
    ],
  };
  return `data:model/gltf+json,${encodeURIComponent(JSON.stringify(gltf))}`;
}

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 32,
      background: "#101014",
      flexWrap: "wrap",
    }}
  >
    <ModelViewer url={torusModel()} width={340} height={340} environment="none" autoRotate float={0.35} />
    <ModelViewer url={torusModel(0.72, 0.18, 48, 24)} width={340} height={340} environment="none" intro="spin" tilt={-18} fit={1.05} autoRotateSpeed={0.7} shadowOpacity={0.3} />
  </div>,
);
