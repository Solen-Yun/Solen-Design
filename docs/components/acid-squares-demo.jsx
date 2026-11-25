import { useState } from "react";
import { DemoFit } from "../demo-fit";
import AcidSquares from "../../src/components/acid-squares/AcidSquares.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Click anywhere on the floor to slap a ripple in; hover presses a dent. */

const DEFAULTS = {
  accentColor: "#ff4fb8",
  tileSize: 1,
  gap: 0.12,
  roundness: 0.25,
  rotation: 35,
  speed: 0.6,
  pulse: 1,
  shape: "square",
  lighting: "split",
  hoverEffect: "press",
  zoom: 1,
  lightMode: false,
  pulseOnClick: true,
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
            <AcidSquares
              accentColor={opts.accentColor}
              tileSize={opts.tileSize}
              gap={opts.gap}
              roundness={opts.roundness}
              rotation={opts.rotation}
              speed={opts.speed}
              pulse={opts.pulse}
              shape={opts.shape}
              lighting={opts.lighting}
              hoverEffect={opts.hoverEffect}
              zoom={opts.zoom}
              lightMode={opts.lightMode}
              pulseOnClick={opts.pulseOnClick}
              paused={opts.paused}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./acid-squares-preview.html">
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
          <Color label="主光色" value={opts.accentColor} onChange={(accentColor) => set({ accentColor })} />
          <Slider label="瓦片尺寸" value={opts.tileSize} min={0.2} max={3} step={0.05} format={(v) => `${v.toFixed(2)}×`} onChange={(tileSize) => set({ tileSize })} />
          <Slider label="间距" value={opts.gap} min={0} max={0.6} step={0.02} format={(v) => v.toFixed(2)} onChange={(gap) => set({ gap })} />
          <Slider label="圆角" value={opts.roundness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(roundness) => set({ roundness })} />
          <Slider label="旋转" value={opts.rotation} min={0} max={90} step={1} format={(v) => `${v}°`} onChange={(rotation) => set({ rotation })} />
          <Slider label="速度" value={opts.speed} min={0} max={2} step={0.05} format={(v) => `${v.toFixed(2)}×`} onChange={(speed) => set({ speed })} />
          <Slider label="波纹幅度" value={opts.pulse} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(pulse) => set({ pulse })} />
          <Slider label="缩放" value={opts.zoom} min={0.3} max={4} step={0.05} format={(v) => `${v.toFixed(2)}×`} onChange={(zoom) => set({ zoom })} />
          <Tabs label="形状" value={opts.shape} options={[["square", "方形"], ["round", "圆形"]]} onChange={(shape) => set({ shape })} />
          <Tabs label="布光" value={opts.lighting} options={[["split", "侧光"], ["backlit", "逆光"], ["overhead", "顶光"]]} onChange={(lighting) => set({ lighting })} />
          <Tabs label="悬停" value={opts.hoverEffect} options={[["press", "压低"], ["lift", "抬起"], ["none", "关闭"]]} onChange={(hoverEffect) => set({ hoverEffect })} />
          <ControlRow label="亮色模式">
            <Switch checked={opts.lightMode} onChange={(lightMode) => set({ lightMode })} label="亮色模式" />
          </ControlRow>
          <ControlRow label="点击波纹">
            <Switch checked={opts.pulseOnClick} onChange={(pulseOnClick) => set({ pulseOnClick })} label="点击波纹" />
          </ControlRow>
          <ControlRow label="暂停">
            <Switch checked={opts.paused} onChange={(paused) => set({ paused })} label="暂停" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the glossy dark floor filling the card. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 200, position: "relative", background: "#101014" }}>
        <AcidSquares />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
