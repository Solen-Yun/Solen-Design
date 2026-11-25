import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as GlassIcons } from "../../src/components/glass-icons/GlassIcons.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Glyphs are inline SVG shapes, gradients come from the built-in palette. */

const GLYPHS = {
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.8-3.8" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
      <path d="m12 3 2.8 5.9 6.2.8-4.6 4.4 1.2 6.4L12 17.4 6.4 20.5l1.2-6.4L3 9.7l6.2-.8L12 3z" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20.5 4.7 13a4.7 4.7 0 0 1 6.6-6.6l.7.7.7-.7a4.7 4.7 0 0 1 6.6 6.6L12 20.5z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
};

const ITEMS = [
  { label: "Home", icon: GLYPHS.home, color: "blue" },
  { label: "Search", icon: GLYPHS.search, color: "teal" },
  { label: "Star", icon: GLYPHS.star, color: "purple" },
  { label: "Bolt", icon: GLYPHS.bolt, color: "orange" },
  { label: "Heart", icon: GLYPHS.heart, color: "red" },
  { label: "Mail", icon: GLYPHS.mail, color: "green" },
];

const DEFAULTS = {
  theme: "dark",
  plate: "tilt",
  hover: "press",
  labels: "hover",
  size: 82,
  roundness: 0.6,
  refraction: 0.8,
  dispersion: 0,
  frost: 0.2,
  shine: 0.85,
  tilt: 30,
};

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

function Segmented({ label, value, options, onChange }) {
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

  return (
    <>
      <div
        className="demo-stage"
        style={{
          background:
            opts.theme === "dark"
              ? "radial-gradient(120% 120% at 30% 20%, #2b2438 0%, #101014 60%)"
              : "radial-gradient(120% 120% at 30% 20%, #ffffff 0%, #e5e7ee 70%)",
          colorScheme: opts.theme,
        }}
      >
        <DemoFit>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 300 }}>
            <GlassIcons
              items={ITEMS}
              theme={opts.theme}
              plate={opts.plate}
              hover={opts.hover}
              labels={opts.labels}
              size={opts.size}
              roundness={opts.roundness}
              refraction={opts.refraction}
              dispersion={opts.dispersion}
              frost={opts.frost}
              shine={opts.shine}
              tilt={opts.tilt}
              columns={3}
              intro={false}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./glass-icons-preview.html">
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
          <Segmented label="主题" value={opts.theme} options={[["dark", "深色"], ["light", "浅色"]]} onChange={(theme) => set({ theme })} />
          <Segmented label="色板姿态" value={opts.plate} options={[["tilt", "斜置"], ["offset", "偏移"], ["circle", "圆形"], ["none", "无"]]} onChange={(plate) => set({ plate })} />
          <Segmented label="悬停" value={opts.hover} options={[["lift", "抬升"], ["float", "悬浮"], ["press", "按压"]]} onChange={(hover) => set({ hover })} />
          <Segmented label="标签" value={opts.labels} options={[["hover", "悬停"], ["always", "常显"], ["none", "无"]]} onChange={(labels) => set({ labels })} />
          <Slider label="尺寸" value={opts.size} min={56} max={110} step={2} format={(v) => `${v}px`} onChange={(size) => set({ size })} />
          <Slider label="圆角" value={opts.roundness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(roundness) => set({ roundness })} />
          <Slider label="折射" value={opts.refraction} min={0} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(refraction) => set({ refraction })} />
          <Slider label="色散" value={opts.dispersion} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(dispersion) => set({ dispersion })} />
          <Slider label="磨砂" value={opts.frost} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(frost) => set({ frost })} />
          <Slider label="高光" value={opts.shine} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(shine) => set({ shine })} />
          <Slider label="倾斜角" value={opts.tilt} min={0} max={60} step={1} format={(v) => `${v}°`} onChange={(tilt) => set({ tilt })} />
        </div>
      </div>
    </>
  );
}

/* Gallery card — the grid resting on a dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: 170,
          background: "radial-gradient(120% 120% at 30% 20%, #2b2438 0%, #101014 60%)",
        }}
      >
        <GlassIcons items={ITEMS} size={62} gap={44} columns={3} intro={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
