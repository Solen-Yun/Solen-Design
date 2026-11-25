import { useState } from "react";
import { DemoFit } from "../demo-fit";
import GridMotion from "../../src/components/grid-motion/GridMotion.jsx";

/* The demo plus a live customize panel — every control is a real option.
   All tiles are inline text and emoji; sweep the pointer across the wall. */

const ITEMS = ["✦", "雾", "◇", "纤维光雾层", "▲", "尘", "●", "网格扭曲显影", "✺", "浪", "■", "颗粒渐变流", "✧", "霜", "◈", "百叶聚光"];

const DEFAULTS = {
  items: ITEMS,
  rows: 4,
  aspectRatio: 1.33,
  gap: 16,
  radius: 14,
  angle: -12,
  tilt: 0,
  speed: 24,
  direction: "alternate",
  parallax: 0.5,
  spotlight: 0.6,
  dim: 0.35,
  grayscale: false,
  fade: 0.5,
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

function Tabs({ label, value, options, onChange }) {
  return (
    <ControlRow label={label}>
      <div className="view-tabs">
        {options.map(([id, text]) => (
          <button key={id} type="button" className={value === id ? "active" : ""} onClick={() => onChange(id)}>
            {text}
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
  const light = opts.theme === "light";

  return (
    <>
      <div className="demo-stage" style={{ background: light ? "#e9e9ee" : "#101014", colorScheme: light ? "light" : "dark" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 340 }}>
            <GridMotion {...opts} />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./grid-motion-preview.html">
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
          <ControlRow label="深色主题">
            <Switch checked={opts.theme === "dark"} onChange={(dark) => set({ theme: dark ? "dark" : "light" })} label="深色主题" />
          </ControlRow>
          <Slider label="行数" value={opts.rows} min={1} max={8} step={1} format={(v) => String(v)} onChange={(rows) => set({ rows })} />
          <Slider label="速度" value={opts.speed} min={0} max={120} step={2} format={(v) => `${v}px/s`} onChange={(speed) => set({ speed })} />
          <Tabs label="方向" value={opts.direction} options={[["alternate", "交替"], ["left", "向左"], ["right", "向右"]]} onChange={(direction) => set({ direction })} />
          <Slider label="墙角" value={opts.angle} min={-45} max={45} step={1} format={(v) => `${v}°`} onChange={(angle) => set({ angle })} />
          <Slider label="后仰" value={opts.tilt} min={0} max={75} step={1} format={(v) => `${v}°`} onChange={(tilt) => set({ tilt })} />
          <Slider label="视差" value={opts.parallax} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(parallax) => set({ parallax })} />
          <Slider label="光池" value={opts.spotlight} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(spotlight) => set({ spotlight })} />
          <Slider label="压暗" value={opts.dim} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(dim) => set({ dim })} />
          <Slider label="羽化" value={opts.fade} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(fade) => set({ fade })} />
          <Slider label="间距" value={opts.gap} min={0} max={48} step={2} format={(v) => `${v}px`} onChange={(gap) => set({ gap })} />
          <ControlRow label="光池外去饱和">
            <Switch checked={opts.grayscale} onChange={(grayscale) => set({ grayscale })} label="光池外去饱和" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the dark tile wall mid-drift with its lit pool. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 170, background: "#101014" }}>
        <GridMotion items={ITEMS} speed={18} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
