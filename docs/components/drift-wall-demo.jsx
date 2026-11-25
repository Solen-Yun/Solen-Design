import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as DriftWall } from "../../src/components/drift-wall/DriftWall.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Move the pointer to lean the wall, hover tiles to lift them. */


const ITEMS = [
  { image: "./assets/demo-photos/photo-01.jpg", title: "海浪" },
  { image: "./assets/demo-photos/photo-02.jpg", title: "星球" },
  { image: "./assets/demo-photos/photo-03.jpg", title: "秋叶" },
  { image: "./assets/demo-photos/photo-04.jpg", title: "植物" },
  { image: "./assets/demo-photos/photo-05.jpg", title: "花朵" },
  { image: "./assets/demo-photos/photo-06.jpg", title: "山峦" },
  { image: "./assets/demo-photos/photo-07.jpg", title: "游鱼" },
  { image: "./assets/demo-photos/photo-08.jpg", title: "夜枭" },
];

const DEFAULTS = {
  columns: 5,
  speed: 42,
  direction: "up",
  variance: 0.45,
  parallax: 0.6,
  pauseOnHover: false,
  lift: 64,
  fade: 0.6,
  dim: 0.55,
  grayscale: false,
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

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);

  return (
    <>
      <div className="demo-stage" style={{ background: "#0a0a10", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ width: "100%", height: 460 }}>
            <DriftWall items={ITEMS} columns={opts.columns} speed={opts.speed} direction={opts.direction} variance={opts.variance} parallax={opts.parallax} pauseOnHover={opts.pauseOnHover} lift={opts.lift} fade={opts.fade} dim={opts.dim} grayscale={opts.grayscale} />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./drift-wall-preview.html">
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
          <Slider label="列数" value={opts.columns} min={3} max={8} step={1} format={(v) => String(v)} onChange={(columns) => set({ columns })} />
          <Slider label="速度" value={opts.speed} min={0} max={120} step={2} format={(v) => `${v}px/s`} onChange={(speed) => set({ speed })} />
          <ControlRow label="方向">
            <div className="view-tabs">
              {[["up", "向上"], ["down", "向下"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.direction === id ? "active" : undefined} onClick={() => set({ direction: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="列间差异" value={opts.variance} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(variance) => set({ variance })} />
          <Slider label="视差" value={opts.parallax} min={0} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(parallax) => set({ parallax })} />
          <Slider label="抬起高度" value={opts.lift} min={0} max={160} step={4} format={(v) => `${v}px`} onChange={(lift) => set({ lift })} />
          <Slider label="边缘渐隐" value={opts.fade} min={0.2} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(fade) => set({ fade })} />
          <Slider label="暗度" value={opts.dim} min={0.2} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(dim) => set({ dim })} />
          <ControlRow label="悬停暂停">
            <Switch checked={opts.pauseOnHover} onChange={(pauseOnHover) => set({ pauseOnHover })} label="悬停暂停" />
          </ControlRow>
          <ControlRow label="灰度砖块">
            <Switch checked={opts.grayscale} onChange={(grayscale) => set({ grayscale })} label="灰度砖块" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the tilted wall drifting on a dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 240, background: "#0a0a10" }}>
        <DriftWall items={ITEMS} columns={4} speed={36} dim={0.5} fade={0.55} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
