import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as ElasticMesh } from "../../src/components/elastic-mesh/ElasticMesh.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Hover dents the surface, press-drag stretches it like taffy, a quick
   click pokes a ripple through the jelly. */

const DEFAULTS = {
  text: "Squish",
  color: "#3b5bff",
  material: "balloon",
  inflate: 1,
  stiffness: 0.5,
  wobble: 0.6,
  grabRadius: 70,
  stretch: 0.5,
  press: 0.5,
  shadow: 0.5,
  intro: true,
  theme: "dark",
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

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 300 }}>
            <ElasticMesh
              text={opts.text}
              color={opts.color}
              material={opts.material}
              inflate={opts.inflate}
              stiffness={opts.stiffness}
              wobble={opts.wobble}
              grabRadius={opts.grabRadius}
              stretch={opts.stretch}
              press={opts.press}
              shadow={opts.shadow}
              intro={opts.intro}
              theme={opts.theme}
            />
            <p
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                paddingBottom: 14,
                margin: 0,
                pointerEvents: "none",
                color: "#52525b",
                fontSize: 13,
                letterSpacing: 2,
              }}
            >
              悬停压陷，按住拖拽，快速点击戳动
            </p>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./elastic-mesh-preview.html">
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
          <ControlRow label="文字">
            <input
              type="text"
              value={opts.text}
              onChange={(event) => set({ text: event.target.value || "Squish" })}
              aria-label="文字"
              style={{ width: 140 }}
            />
          </ControlRow>
          <Color label="基色" value={opts.color} onChange={(color) => set({ color })} />
          <ControlRow label="材质">
            <div className="view-tabs">
              {[["balloon", "气球"], ["chrome", "镀铬"], ["jelly", "果冻"], ["clay", "黏土"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.material === id ? "active" : ""} onClick={() => set({ material: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="浅色主题">
            <Switch checked={opts.theme === "light"} onChange={(light) => set({ theme: light ? "light" : "dark" })} label="浅色主题" />
          </ControlRow>
          <Slider label="膨胀" value={opts.inflate} min={0.1} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(inflate) => set({ inflate })} />
          <Slider label="硬度" value={opts.stiffness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(stiffness) => set({ stiffness })} />
          <Slider label="抖动" value={opts.wobble} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(wobble) => set({ wobble })} />
          <Slider label="作用半径" value={opts.grabRadius} min={10} max={400} step={5} format={(v) => `${v}px`} onChange={(grabRadius) => set({ grabRadius })} />
          <Slider label="拉伸极限" value={opts.stretch} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(stretch) => set({ stretch })} />
          <Slider label="按压深度" value={opts.press} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(press) => set({ press })} />
          <Slider label="投影" value={opts.shadow} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(shadow) => set({ shadow })} />
          <ControlRow label="开场弹出">
            <Switch checked={opts.intro} onChange={(intro) => set({ intro })} label="开场弹出" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — glowing jelly letters mid-intro on a small dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 170, background: "#101014" }}>
        <ElasticMesh text="Jelly" color="#3b5bff" material="jelly" intro={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
