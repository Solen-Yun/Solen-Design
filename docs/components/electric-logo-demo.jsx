import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as ElectricLogo } from "../../src/components/electric-logo/ElectricLogo.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Hover supercharges the strands near the cursor; clicking fires a
   shockwave pulse that visibly warps the outline. */


const LOGOS = {
  bolt: "./assets/demo-photos/photo-01.jpg",
  star: "./assets/demo-photos/photo-02.jpg",
  ring: "./assets/demo-photos/photo-03.jpg",
  bolt8: "./assets/demo-photos/photo-04.jpg",
};

const DEFAULTS = {
  logo: "bolt",
  color: "#ecc7ff",
  glowColor: "#ad6dff",
  scale: 0.7,
  intensity: 1,
  glow: 1,
  thickness: 1.5,
  strands: 4,
  bend: 0.6,
  crackle: 1.5,
  arcs: 1,
  flicker: 0.6,
  fill: 0,
  speed: 2.5,
  interactive: true,
  cursorIntensity: 0.75,
  cursorRadius: 100,
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

function Tabs({ options, value, onChange, label }) {
  return (
    <ControlRow label={label}>
      <div className="view-tabs">
        {options.map(([id, text]) => (
          <button key={id} type="button" className={value === id ? "active" : undefined} onClick={() => onChange(id)}>
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
  const { logo, ...rest } = opts;

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 340 }}>
            <ElectricLogo {...rest} src={LOGOS[logo]} />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./electric-logo-preview.html">
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
          <Tabs
            label="标志"
            value={opts.logo}
            onChange={(logo) => set({ logo })}
            options={[
              ["bolt", "闪电"],
              ["star", "星形"],
              ["ring", "圆环"],
              ["bolt8", "斜闪"],
            ]}
          />
          <Color label="线色" value={opts.color} onChange={(color) => set({ color })} />
          <Color label="光晕色" value={opts.glowColor} onChange={(glowColor) => set({ glowColor })} />
          <ControlRow label="浅色主题">
            <Switch checked={opts.theme === "light"} onChange={(light) => set({ theme: light ? "light" : "dark" })} label="浅色主题" />
          </ControlRow>
          <Slider label="大小" value={opts.scale} min={0.2} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(scale) => set({ scale })} />
          <Slider label="亮度" value={opts.intensity} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(intensity) => set({ intensity })} />
          <Slider label="光晕" value={opts.glow} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(glow) => set({ glow })} />
          <Slider label="线宽" value={opts.thickness} min={0.5} max={4} step={0.1} format={(v) => v.toFixed(1)} onChange={(thickness) => set({ thickness })} />
          <Slider label="波纹数" value={opts.strands} min={1} max={6} step={1} format={(v) => String(v)} onChange={(strands) => set({ strands })} />
          <Slider label="缓弯" value={opts.bend} min={0} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(bend) => set({ bend })} />
          <Slider label="锯齿" value={opts.crackle} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(crackle) => set({ crackle })} />
          <Slider label="电弧频率" value={opts.arcs} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(arcs) => set({ arcs })} />
          <Slider label="明灭" value={opts.flicker} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(flicker) => set({ flicker })} />
          <Slider label="内部辉光" value={opts.fill} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(fill) => set({ fill })} />
          <Slider label="速度" value={opts.speed} min={0} max={6} step={0.1} format={(v) => v.toFixed(1)} onChange={(speed) => set({ speed })} />
          <Slider label="指针强度" value={opts.cursorIntensity} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(cursorIntensity) => set({ cursorIntensity })} />
          <Slider label="指针半径" value={opts.cursorRadius} min={20} max={260} step={10} format={(v) => `${v}px`} onChange={(cursorRadius) => set({ cursorRadius })} />
          <ControlRow label="指针交互">
            <Switch checked={opts.interactive} onChange={(interactive) => set({ interactive })} label="指针交互" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the bolt logo mid-crackle on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 190, background: "#101014" }}>
        <ElectricLogo interactive={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
