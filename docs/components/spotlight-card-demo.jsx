import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as SpotlightCard } from "../../src/components/spotlight-card/SpotlightCard.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Leave the card and creep back to watch the proximity halo light it up. */

const DEFAULTS = {
  theme: "dark",
  spotlightColor: "#ffffff",
  intensity: 0.15,
  spotlightSize: 240,
  softness: 0.7,
  shape: "circle",
  borderGlow: 0.6,
  proximity: 80,
  smoothing: 0.3,
  ambient: false,
  flare: true,
  grain: 0,
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

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);
  const dark = opts.theme === "dark";

  return (
    <>
      <div className="demo-stage" style={{ background: dark ? "#101014" : "#e9e9ee", colorScheme: dark ? "dark" : "light" }}>
        <DemoFit>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, width: "100%", height: 320, flexWrap: "wrap" }}>
            <SpotlightCard
              theme={opts.theme}
              spotlightColor={opts.spotlightColor}
              intensity={opts.intensity}
              spotlightSize={opts.spotlightSize}
              softness={opts.softness}
              shape={opts.shape}
              borderGlow={opts.borderGlow}
              proximity={opts.proximity}
              smoothing={opts.smoothing}
              ambient={opts.ambient}
              flare={opts.flare}
              grain={opts.grain}
              style={{ width: 260 }}
            >
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>聚光卡片</h3>
              <p style={{ margin: "8px 0 0", fontSize: 13, lineHeight: 1.5, opacity: 0.65 }}>
                光斑跟着指针走，边框朝光泛亮。移到卡片外面再慢慢靠近，光会提前伸过来。
              </p>
            </SpotlightCard>
            <SpotlightCard
              theme={opts.theme}
              spotlightColor={opts.spotlightColor}
              intensity={opts.intensity}
              spotlightSize={opts.spotlightSize}
              softness={opts.softness}
              shape={opts.shape}
              borderGlow={opts.borderGlow}
              proximity={opts.proximity}
              smoothing={opts.smoothing}
              ambient={opts.ambient}
              flare={opts.flare}
              grain={opts.grain}
              style={{ width: 200 }}
            >
              <div style={{ fontSize: 34 }}>🔦</div>
              <p style={{ margin: "8px 0 0", fontSize: 13, opacity: 0.65 }}>相邻的卡也共享同一束光</p>
            </SpotlightCard>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./spotlight-card-preview.html">
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
          <Color label="光色" value={opts.spotlightColor} onChange={(spotlightColor) => set({ spotlightColor })} />
          <ControlRow label="浅色主题">
            <Switch checked={!dark} onChange={(light) => set({ theme: light ? "light" : "dark" })} label="浅色主题" />
          </ControlRow>
          <ControlRow label="形状">
            <div className="view-tabs">
              {[["circle", "圆池"], ["beam", "光束"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.shape === id ? "active" : ""} onClick={() => set({ shape: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="亮度" value={opts.intensity} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(intensity) => set({ intensity })} />
          <Slider label="光池半径" value={opts.spotlightSize} min={40} max={480} step={10} format={(v) => `${v}px`} onChange={(spotlightSize) => set({ spotlightSize })} />
          <Slider label="柔散" value={opts.softness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(softness) => set({ softness })} />
          <Slider label="轮辋光" value={opts.borderGlow} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(borderGlow) => set({ borderGlow })} />
          <Slider label="邻近范围" value={opts.proximity} min={0} max={240} step={10} format={(v) => `${v}px`} onChange={(proximity) => set({ proximity })} />
          <Slider label="迟滞" value={opts.smoothing} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(smoothing) => set({ smoothing })} />
          <Slider label="颗粒" value={opts.grain} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(grain) => set({ grain })} />
          <ControlRow label="自主巡游">
            <Switch checked={opts.ambient} onChange={(ambient) => set({ ambient })} label="自主巡游" />
          </ControlRow>
          <ControlRow label="按压爆发">
            <Switch checked={opts.flare} onChange={(flare) => set({ flare })} label="按压爆发" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the dark surface with its pointer lamp lit. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 220, background: "#101014" }}>
        <SpotlightCard theme="dark" intensity={0.35} spotlightSize={220} style={{ width: 220 }}>
          <div style={{ fontSize: 32 }}>🔦</div>
          <p style={{ margin: "8px 0 0", fontSize: 13, opacity: 0.65 }}>指针聚光卡片</p>
        </SpotlightCard>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
