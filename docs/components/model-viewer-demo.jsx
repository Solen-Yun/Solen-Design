import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as ModelViewer } from "../../src/components/model-viewer/ModelViewer.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Drag the model to fling it, double-click to unwind back to the start pose. */

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

const DEFAULTS = {
  url: torusModel(),
  environment: "none",
  environmentIntensity: 1,
  exposure: 1,
  autoRotate: true,
  autoRotateSpeed: 0.4,
  autoRotateDelay: 2,
  dragRotate: true,
  turntable: false,
  zoom: true,
  minZoom: 0.7,
  maxZoom: 2,
  hoverTilt: 0.15,
  float: 0.3,
  shadow: true,
  shadowOpacity: 0.45,
  intro: "rise",
  startAngle: -30,
  tilt: 10,
  offsetX: 0,
  offsetY: 0,
  fit: 0.8,
  resetOnDoubleClick: true,
};

const ENVIRONMENTS = [["none", "无"], ["studio", "影棚"], ["city", "城市"], ["sunset", "日落"], ["night", "夜色"]];
const INTROS = [["rise", "升起"], ["spin", "旋入"], ["none", "无"]];

function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={checked ? "switch on" : "switch"}
      onClick={() => onChange(!checked)}
    >
      <span className="switch-knob" />
    </button>
  );
}

function ControlRow({ label, children }) {
  return (
    <div className="control">
      <span className="control-label">{label}</span>
      {children}
    </div>
  );
}

function Slider({ label, value, min, max, step, format, onChange }) {
  return (
    <ControlRow label={label}>
      <output className="control-value">{format(value)}</output>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label={label}
      />
    </ControlRow>
  );
}

function Tabs({ label, options, value, onChange }) {
  return (
    <ControlRow label={label}>
      <div className="view-tabs">
        {options.map(([id, name]) => (
          <button key={id} type="button" className={value === id ? "active" : ""} onClick={() => onChange(id)}>
            {name}
          </button>
        ))}
      </div>
    </ControlRow>
  );
}

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 460 }}>
            <ModelViewer {...opts} />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./model-viewer-preview.html">
          <span aria-hidden="true">⧉</span> 打开完整预览
        </a>
      </div>

      <div className="customize">
        <div className="customize-head">
          <p className="customize-title">自定义</p>
          <button type="button" className="customize-reset" onClick={reset}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            Reset
          </button>
        </div>
        <div className="customize-grid">
          <Tabs label="环境" options={ENVIRONMENTS} value={opts.environment} onChange={(environment) => set({ environment })} />
          <Tabs label="入场" options={INTROS} value={opts.intro} onChange={(intro) => set({ intro })} />
          <Slider label="自转速度" value={opts.autoRotateSpeed} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(autoRotateSpeed) => set({ autoRotateSpeed })} />
          <Slider label="自转延时" value={opts.autoRotateDelay} min={0} max={6} step={0.5} format={(v) => `${v}s`} onChange={(autoRotateDelay) => set({ autoRotateDelay })} />
          <Slider label="悬浮幅度" value={opts.float} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(float) => set({ float })} />
          <Slider label="悬停倾角" value={opts.hoverTilt} min={0} max={0.5} step={0.01} format={(v) => v.toFixed(2)} onChange={(hoverTilt) => set({ hoverTilt })} />
          <Slider label="取景留白" value={opts.fit} min={0.3} max={1.4} step={0.05} format={(v) => v.toFixed(2)} onChange={(fit) => set({ fit })} />
          <Slider label="初始角度" value={opts.startAngle} min={-180} max={180} step={5} format={(v) => `${v}°`} onChange={(startAngle) => set({ startAngle })} />
          <Slider label="俯仰角" value={opts.tilt} min={-40} max={40} step={2} format={(v) => `${v}°`} onChange={(tilt) => set({ tilt })} />
          <Slider label="水平偏移" value={opts.offsetX} min={-1} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(offsetX) => set({ offsetX })} />
          <Slider label="竖直偏移" value={opts.offsetY} min={-1} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(offsetY) => set({ offsetY })} />
          <Slider label="阴影浓度" value={opts.shadowOpacity} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(shadowOpacity) => set({ shadowOpacity })} />
          <Slider label="曝光" value={opts.exposure} min={0.2} max={2.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(exposure) => set({ exposure })} />
          <Slider label="环境亮度" value={opts.environmentIntensity} min={0} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(environmentIntensity) => set({ environmentIntensity })} />
          <ControlRow label="自动旋转">
            <Switch checked={opts.autoRotate} onChange={(autoRotate) => set({ autoRotate })} label="自动旋转" />
          </ControlRow>
          <ControlRow label="转台模式">
            <Switch checked={opts.turntable} onChange={(turntable) => set({ turntable })} label="转台模式" />
          </ControlRow>
          <ControlRow label="可缩放">
            <Switch checked={opts.zoom} onChange={(zoom) => set({ zoom })} label="可缩放" />
          </ControlRow>
          <ControlRow label="接触阴影">
            <Switch checked={opts.shadow} onChange={(shadow) => set({ shadow })} label="接触阴影" />
          </ControlRow>
          <ControlRow label="双击回正">
            <Switch checked={opts.resetOnDoubleClick} onChange={(resetOnDoubleClick) => set({ resetOnDoubleClick })} label="双击回正" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the ring floating over its contact shadow on a dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 240, background: "#101014" }}>
        <ModelViewer url={DEFAULTS.url} width={260} height={220} environment="none" autoRotate float={0.4} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
