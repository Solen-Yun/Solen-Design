import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as Strands } from "../../src/components/strands/Strands.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Hover leans the orb toward the pointer; clicking punches a pulse;
   the listening switch drives a speech-like bulge. */

const PALETTES = {
  sunset: ["#d95b56", "#ba5046", "#ffa24c", "#ffe0b3", "#93f1ff", "#3569fa", "#193d9b"],
  glacier: ["#6fd6ff", "#4fb3e8", "#a8f0ff", "#eafcff", "#b5a6ff", "#5b6bf5", "#1d2a8f"],
  meadow: ["#ff8a5c", "#ffb35c", "#ffe28a", "#f6ffe0", "#7dffc4", "#2fbf7f", "#0d5c3a"],
};

const DEFAULTS = {
  palette: "sunset",
  colors: PALETTES.sunset,
  count: 3,
  speed: 1,
  amplitude: 1,
  waviness: 1,
  thickness: 1,
  glow: 1,
  taper: 1,
  spread: 1,
  hueShift: 0,
  intensity: 1,
  saturation: 1,
  opacity: 1,
  scale: 1,
  glass: true,
  refraction: 1,
  dispersion: 1,
  glassSize: 1,
  rim: 1,
  energy: 0.65,
  listening: false,
  interactive: true,
  clickPulse: true,
  intro: true,
  lightMode: false,
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

function Tabs({ options, value, onChange, label }) {
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
  const { palette, ...rest } = opts;

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 340 }}>
            <Strands {...rest} />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./strands-preview.html">
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
            label="调色板"
            value={palette}
            onChange={(id) => set({ palette: id, colors: PALETTES[id] })}
            options={[
              ["sunset", "暖橙"],
              ["glacier", "冰蓝"],
              ["meadow", "翠绿"],
            ]}
          />
          <Tabs
            label="脊线"
            value={String(opts.count)}
            onChange={(count) => set({ count: Number(count) })}
            options={[
              ["1", "1"],
              ["2", "2"],
              ["3", "3"],
            ]}
          />
          <Slider label="活跃度" value={opts.energy} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(energy) => set({ energy })} />
          <Slider label="速度" value={opts.speed} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(speed) => set({ speed })} />
          <Slider label="弯曲" value={opts.amplitude} min={0.2} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(amplitude) => set({ amplitude })} />
          <Slider label="扭转" value={opts.waviness} min={0.2} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(waviness) => set({ waviness })} />
          <Slider label="厚度" value={opts.thickness} min={0.3} max={2.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(thickness) => set({ thickness })} />
          <Slider label="辉光" value={opts.glow} min={0} max={2.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <Slider label="鼓包" value={opts.taper} min={0.3} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(taper) => set({ taper })} />
          <Slider label="色相旋转" value={opts.hueShift} min={0} max={1} step={0.02} format={(v) => v.toFixed(2)} onChange={(hueShift) => set({ hueShift })} />
          <Slider label="饱和" value={opts.saturation} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(saturation) => set({ saturation })} />
          <Slider label="亮度" value={opts.intensity} min={0} max={2.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(intensity) => set({ intensity })} />
          <Slider label="球体大小" value={opts.glassSize} min={0.5} max={1.6} step={0.05} format={(v) => v.toFixed(2)} onChange={(glassSize) => set({ glassSize })} />
          <Slider label="折射" value={opts.refraction} min={0} max={1.8} step={0.05} format={(v) => v.toFixed(2)} onChange={(refraction) => set({ refraction })} />
          <Slider label="色差" value={opts.dispersion} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(dispersion) => set({ dispersion })} />
          <ControlRow label="玻璃球">
            <Switch checked={opts.glass} onChange={(glass) => set({ glass })} label="玻璃球" />
          </ControlRow>
          <ControlRow label="聆听模式">
            <Switch checked={opts.listening} onChange={(listening) => set({ listening })} label="聆听模式" />
          </ControlRow>
          <ControlRow label="点击脉冲">
            <Switch checked={opts.clickPulse} onChange={(clickPulse) => set({ clickPulse })} label="点击脉冲" />
          </ControlRow>
          <ControlRow label="浅色模式">
            <Switch checked={opts.lightMode} onChange={(lightMode) => set({ lightMode })} label="浅色模式" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the orb resting on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 190, background: "#101014" }}>
        <Strands energy={0.4} interactive={false} intro={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
