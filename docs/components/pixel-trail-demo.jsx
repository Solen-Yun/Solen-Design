import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as PixelTrail } from "../../src/components/pixel-trail/PixelTrail.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The trail listens on window but only reacts inside its host box, which
   the demo sizes exactly like the usage example does. */

const DEFAULTS = {
  color: "#ffffff",
  ramp: false,
  trailColor: "#7dd3fc",
  gridSize: 40,
  trailSize: 0.1,
  maxAge: 250,
  gap: 0.08,
  shape: "square",
  decay: "fade",
  goo: 2,
  shine: 0.6,
  glow: 0.4,
  sparkle: 0,
  flow: 0.4,
  gravity: 0.2,
  clickBurst: true,
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
          <div style={{ width: "100%", height: 420 }}>
            <PixelTrail
              gridSize={opts.gridSize}
              trailSize={opts.trailSize}
              maxAge={opts.maxAge}
              gap={opts.gap}
              shape={opts.shape}
              decay={opts.decay}
              gooeyFilter={opts.goo > 0 ? { strength: opts.goo } : null}
              color={opts.color}
              trailColor={opts.ramp ? opts.trailColor : undefined}
              shine={opts.shine}
              glow={opts.glow}
              sparkle={opts.sparkle}
              flow={opts.flow}
              gravity={opts.gravity}
              clickBurst={opts.clickBurst}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./pixel-trail-preview.html">
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
          <Color label="主体色" value={opts.color} onChange={(color) => set({ color })} />
          <ControlRow label="双色渐变">
            <Switch checked={opts.ramp} onChange={(ramp) => set({ ramp })} label="双色渐变" />
          </ControlRow>
          {opts.ramp ? <Color label="新触点色" value={opts.trailColor} onChange={(trailColor) => set({ trailColor })} /> : null}
          <Slider label="格子数" value={opts.gridSize} min={10} max={120} step={1} format={(v) => String(v)} onChange={(gridSize) => set({ gridSize })} />
          <Slider label="笔刷半径" value={opts.trailSize} min={0.02} max={0.3} step={0.01} format={(v) => v.toFixed(2)} onChange={(trailSize) => set({ trailSize })} />
          <Slider label="存活时长" value={opts.maxAge} min={60} max={800} step={10} format={(v) => `${v}ms`} onChange={(maxAge) => set({ maxAge })} />
          <Slider label="液态融合" value={opts.goo} min={0} max={6} step={0.1} format={(v) => v.toFixed(1)} onChange={(goo) => set({ goo })} />
          <Slider label="缝隙" value={opts.gap} min={0} max={0.9} step={0.02} format={(v) => v.toFixed(2)} onChange={(gap) => set({ gap })} />
          <ControlRow label="形状">
            <div className="view-tabs">
              {[["square", "方"], ["circle", "圆"], ["diamond", "菱"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.shape === id ? "active" : ""} onClick={() => set({ shape: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="消亡方式">
            <div className="view-tabs">
              {[["fade", "淡出"], ["shrink", "缩小"], ["dither", "抖动"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.decay === id ? "active" : ""} onClick={() => set({ decay: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="斜面高光" value={opts.shine} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(shine) => set({ shine })} />
          <Slider label="底部光晕" value={opts.glow} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <Slider label="闪烁" value={opts.sparkle} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(sparkle) => set({ sparkle })} />
          <Slider label="流速" value={opts.flow} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(flow) => set({ flow })} />
          <Slider label="重力" value={opts.gravity} min={-1} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(gravity) => set({ gravity })} />
          <ControlRow label="点击炸开">
            <Switch checked={opts.clickBurst} onChange={(clickBurst) => set({ clickBurst })} label="点击炸开" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — mint goo cells melting on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 170, background: "#101014" }}>
        <PixelTrail
          gridSize={48}
          trailSize={0.09}
          maxAge={400}
          gooeyFilter={{ strength: 2.4 }}
          color="#5eead4"
          trailColor="#a7f3d0"
          shine={0.7}
          glow={0.5}
          flow={0.5}
          gravity={0.3}
          clickBurst={true}
        />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
