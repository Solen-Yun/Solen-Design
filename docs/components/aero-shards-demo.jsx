import { useState } from "react";
import { DemoFit } from "../demo-fit";
import AeroShards from "../../src/components/aero-shards/AeroShards.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Short click fires a shockwave ring; holding gathers an orbiting cluster. */

const DEFAULTS = {
  accentColor: "#A855F7",
  placement: "full",
  material: "glass",
  count: 1300,
  speed: 1,
  spread: 1,
  twist: 1,
  billow: 1,
  scale: 1,
  depthOfField: 0.75,
  glow: 0.35,
  markers: "plus",
  lightMode: false,
  paused: false,
};

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

function Color({ label, value, onChange }) {
  return (
    <ControlRow label={label}>
      <input
        type="color"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={label}
      />
    </ControlRow>
  );
}

function Tabs({ label, value, options, onChange }) {
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
          <div style={{ width: "100%", height: 320, position: "relative" }}>
            <AeroShards
              accentColor={opts.accentColor}
              placement={opts.placement}
              material={opts.material}
              count={opts.count}
              speed={opts.speed}
              spread={opts.spread}
              twist={opts.twist}
              billow={opts.billow}
              scale={opts.scale}
              depthOfField={opts.depthOfField}
              glow={opts.glow}
              markers={opts.markers}
              lightMode={opts.lightMode}
              paused={opts.paused}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./aero-shards-preview.html">
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
          <Color label="强调色" value={opts.accentColor} onChange={(accentColor) => set({ accentColor })} />
          <Tabs label="布局" value={opts.placement} options={[["full", "贯穿"], ["left", "左侧"], ["right", "右侧"], ["center", "环形"]]} onChange={(placement) => set({ placement })} />
          <Tabs label="材质" value={opts.material} options={[["glass", "玻璃"], ["chrome", "镀铬"]]} onChange={(material) => set({ material })} />
          <Tabs label="测标" value={opts.markers} options={[["plus", "十字"], ["dots", "圆点"]]} onChange={(markers) => set({ markers })} />
          <Slider label="碎片数" value={opts.count} min={200} max={4000} step={100} format={(v) => String(v)} onChange={(count) => set({ count })} />
          <Slider label="流速" value={opts.speed} min={0} max={3} step={0.05} format={(v) => `${v.toFixed(2)}×`} onChange={(speed) => set({ speed })} />
          <Slider label="丝带宽度" value={opts.spread} min={0} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(spread) => set({ spread })} />
          <Slider label="自转" value={opts.twist} min={0} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(twist) => set({ twist })} />
          <Slider label="起伏" value={opts.billow} min={0} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(billow) => set({ billow })} />
          <Slider label="焦距" value={opts.scale} min={0.4} max={2.5} step={0.05} format={(v) => `${v.toFixed(2)}×`} onChange={(scale) => set({ scale })} />
          <Slider label="景深" value={opts.depthOfField} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(depthOfField) => set({ depthOfField })} />
          <Slider label="辉光" value={opts.glow} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <ControlRow label="亮色模式">
            <Switch checked={opts.lightMode} onChange={(lightMode) => set({ lightMode })} label="亮色模式" />
          </ControlRow>
          <ControlRow label="暂停">
            <Switch checked={opts.paused} onChange={(paused) => set({ paused })} label="暂停" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the ribbons fill the card at the default placement. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 200, position: "relative", background: "#101014" }}>
        <AeroShards />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
