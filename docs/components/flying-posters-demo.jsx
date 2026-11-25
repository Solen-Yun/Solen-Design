import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as FlyingPosters } from "../../src/components/flying-posters/FlyingPosters.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Drag or wheel the column; posters flip as they pass, click one for the hit. */


const ITEMS = [
  { image: "./assets/demo-photos/photo-01.jpg" },
  { image: "./assets/demo-photos/photo-02.jpg" },
  { image: "./assets/demo-photos/photo-03.jpg" },
  { image: "./assets/demo-photos/photo-04.jpg" },
  { image: "./assets/demo-photos/photo-05.jpg" },
  { image: "./assets/demo-photos/photo-06.jpg" },
];

const DEFAULTS = {
  axis: "vertical",
  rotation: 180,
  distortion: 3,
  speed: 0,
  columns: 1,
  lean: 0.6,
  shading: 0.4,
  fade: 0.3,
  radius: 12,
  alternate: true,
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
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ width: "100%", height: 440 }}>
            <FlyingPosters
              items={ITEMS}
              axis={opts.axis}
              rotation={opts.rotation}
              distortion={opts.distortion}
              speed={opts.speed}
              columns={opts.columns}
              lean={opts.lean}
              shading={opts.shading}
              fade={opts.fade}
              radius={opts.radius}
              alternate={opts.alternate}
              planeWidth={260}
              planeHeight={260}
              onItemClick={(item, index) => console.log("tap", index)}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./flying-posters-preview.html">
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
          <ControlRow label="翻转轴">
            <div className="view-tabs">
              {[["vertical", "纵轴"], ["horizontal", "横轴"], ["diagonal", "斜轴"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.axis === id ? "active" : undefined} onClick={() => set({ axis: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="翻转角度" value={opts.rotation} min={0} max={360} step={15} format={(v) => `${v}°`} onChange={(rotation) => set({ rotation })} />
          <Slider label="扭曲" value={opts.distortion} min={0} max={12} step={0.5} format={(v) => v.toFixed(1)} onChange={(distortion) => set({ distortion })} />
          <Slider label="自动漂移" value={opts.speed} min={-8} max={8} step={0.5} format={(v) => `${v.toFixed(1)}/s`} onChange={(speed) => set({ speed })} />
          <Slider label="柱数" value={opts.columns} min={1} max={3} step={1} format={(v) => String(v)} onChange={(columns) => set({ columns })} />
          <Slider label="侧倾" value={opts.lean} min={0} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(lean) => set({ lean })} />
          <Slider label="背转压暗" value={opts.shading} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(shading) => set({ shading })} />
          <Slider label="边缘淡出" value={opts.fade} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(fade) => set({ fade })} />
          <Slider label="圆角" value={opts.radius} min={0} max={60} step={2} format={(v) => String(v)} onChange={(radius) => set({ radius })} />
          <ControlRow label="奇数列反向">
            <Switch checked={opts.alternate} onChange={(alternate) => set({ alternate })} label="奇数列反向" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — one auto-drifting column mid-flip on the dark canvas. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 260, background: "#101014" }}>
        <FlyingPosters items={ITEMS} planeWidth={230} planeHeight={230} speed={1.2} distortion={4} shading={0.5} fade={0.35} radius={14} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
