import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as ElectricBorder } from "../../src/components/electric-border/ElectricBorder.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Sweep the cursor along the frame to heat it up, click to fire a pulse. */

const DEFAULTS = {
  theme: "dark",
  color: "#7df9ff",
  glowColor: "#7df9ff",
  speed: 1,
  chaos: 0.5,
  spread: 0.6,
  thickness: 1.5,
  strands: 3,
  glow: 0.6,
  intensity: 0.8,
  arcs: 1,
  flicker: 0.5,
  borderRadius: 24,
  offset: 0,
  cursorRadius: 90,
  active: true,
  intro: true,
  interactive: true,
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
  const light = opts.theme === "light";

  return (
    <>
      <div className="demo-stage" style={{ background: light ? "#f4f4f5" : "#101014", colorScheme: light ? "light" : "dark" }}>
        <DemoFit>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", padding: "56px 0" }}>
            <ElectricBorder
              color={opts.color}
              glowColor={opts.glowColor}
              speed={opts.speed}
              chaos={opts.chaos}
              spread={opts.spread}
              thickness={opts.thickness}
              strands={opts.strands}
              glow={opts.glow}
              intensity={opts.intensity}
              arcs={opts.arcs}
              flicker={opts.flicker}
              borderRadius={opts.borderRadius}
              offset={opts.offset}
              cursorRadius={opts.cursorRadius}
              active={opts.active}
              intro={opts.intro}
              interactive={opts.interactive}
              theme={opts.theme}
              style={{ width: "min(420px, 86%)" }}
            >
              <div
                style={{
                  borderRadius: opts.borderRadius,
                  padding: "36px 32px",
                  background: light ? "#ffffff" : "#17171d",
                  textAlign: "center",
                }}
              >
                <p style={{ margin: 0, fontSize: 15, fontWeight: 700, letterSpacing: 1, color: light ? "#18181b" : "#f4f4f5" }}>
                  高压警示
                </p>
                <p style={{ margin: "10px 0 0", fontSize: 13, lineHeight: 1.7, color: light ? "#71717a" : "#a1a1aa" }}>
                  把光标贴着边框扫一圈，电流会跟着过热增亮；点击边框打出脉冲。
                </p>
              </div>
            </ElectricBorder>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./electric-border-preview.html">
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
          <Color label="电流色" value={opts.color} onChange={(color) => set({ color })} />
          <Color label="辉光色" value={opts.glowColor} onChange={(glowColor) => set({ glowColor })} />
          <ControlRow label="亮色主题">
            <Switch checked={light} onChange={(on) => set({ theme: on ? "light" : "dark" })} label="亮色主题" />
          </ControlRow>
          <Slider label="速度" value={opts.speed} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(speed) => set({ speed })} />
          <Slider label="锯齿" value={opts.chaos} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(chaos) => set({ chaos })} />
          <Slider label="游走" value={opts.spread} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(spread) => set({ spread })} />
          <Slider label="主线宽" value={opts.thickness} min={0.25} max={4} step={0.25} format={(v) => `${v}px`} onChange={(thickness) => set({ thickness })} />
          <Slider label="条数" value={opts.strands} min={1} max={6} step={1} format={(v) => String(v)} onChange={(strands) => set({ strands })} />
          <Slider label="辉光" value={opts.glow} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(glow) => set({ glow })} />
          <Slider label="亮度" value={opts.intensity} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(intensity) => set({ intensity })} />
          <Slider label="火花率" value={opts.arcs} min={0} max={4} step={1} format={(v) => String(v)} onChange={(arcs) => set({ arcs })} />
          <Slider label="闪烁" value={opts.flicker} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(flicker) => set({ flicker })} />
          <Slider label="圆角" value={opts.borderRadius} min={0} max={48} step={2} format={(v) => `${v}px`} onChange={(borderRadius) => set({ borderRadius })} />
          <Slider label="外扩" value={opts.offset} min={0} max={32} step={1} format={(v) => `${v}px`} onChange={(offset) => set({ offset })} />
          <Slider label="热度半径" value={opts.cursorRadius} min={20} max={200} step={5} format={(v) => `${v}px`} onChange={(cursorRadius) => set({ cursorRadius })} />
          <ControlRow label="激活">
            <Switch checked={opts.active} onChange={(active) => set({ active })} label="激活" />
          </ControlRow>
          <ControlRow label="光标交互">
            <Switch checked={opts.interactive} onChange={(interactive) => set({ interactive })} label="光标交互" />
          </ControlRow>
          <ControlRow label="开场扫描">
            <Switch checked={opts.intro} onChange={(intro) => set({ intro })} label="开场扫描" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — a cyan frame around a small dark card, sparks included. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 170, background: "#101014" }}>
        <ElectricBorder color="#7df9ff" borderRadius={20} thickness={1.5} strands={3} arcs={1} style={{ width: 220 }}>
          <div style={{ borderRadius: 20, padding: "26px 20px", background: "#17171d", textAlign: "center" }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, letterSpacing: 1, color: "#f4f4f5" }}>HIGH VOLTAGE</p>
          </div>
        </ElectricBorder>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
