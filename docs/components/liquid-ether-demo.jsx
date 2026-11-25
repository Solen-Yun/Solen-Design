import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as LiquidEther } from "../../src/components/liquid-ether/LiquidEther.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Flick the pointer fast for white-hot cores, click for a gust, then
   leave it alone for a second and the auto demo takes over. */

const DEFAULTS = {
  color1: "#5227FF",
  color2: "#FF9FFC",
  color3: "#B497CF",
  intensity: 1,
  mouseForce: 20,
  cursorSize: 100,
  persistence: 0.75,
  viscosity: 0,
  resolution: 0.5,
  autoSpeed: 0.5,
  bounceEdges: false,
  clickBurst: true,
  autoDemo: true,
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
      <div
        className="demo-stage"
        style={{ background: opts.lightMode ? "#f4f4f5" : "#101014", colorScheme: opts.lightMode ? "light" : "dark" }}
      >
        <DemoFit>
          <div style={{ position: "relative", width: "100%", maxWidth: 760, height: 320 }}>
            <LiquidEther
              colors={[opts.color1, opts.color2, opts.color3]}
              intensity={opts.intensity}
              mouseForce={opts.mouseForce}
              cursorSize={opts.cursorSize}
              persistence={opts.persistence}
              viscosity={opts.viscosity}
              resolution={opts.resolution}
              bounceEdges={opts.bounceEdges}
              clickBurst={opts.clickBurst}
              autoDemo={opts.autoDemo}
              autoSpeed={opts.autoSpeed}
              lightMode={opts.lightMode}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./liquid-ether-preview.html">
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
          <Color label="色 1" value={opts.color1} onChange={(color1) => set({ color1 })} />
          <Color label="色 2" value={opts.color2} onChange={(color2) => set({ color2 })} />
          <Color label="色 3" value={opts.color3} onChange={(color3) => set({ color3 })} />
          <Slider label="流速感" value={opts.intensity} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(intensity) => set({ intensity })} />
          <Slider label="指针力度" value={opts.mouseForce} min={0} max={60} step={1} format={(v) => String(v)} onChange={(mouseForce) => set({ mouseForce })} />
          <Slider label="笔刷半径" value={opts.cursorSize} min={10} max={300} step={5} format={(v) => `${v}px`} onChange={(cursorSize) => set({ cursorSize })} />
          <Slider label="残留时长" value={opts.persistence} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(persistence) => set({ persistence })} />
          <Slider label="黏度" value={opts.viscosity} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(viscosity) => set({ viscosity })} />
          <Slider label="网格精度" value={opts.resolution} min={0.05} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(resolution) => set({ resolution })} />
          <Slider label="自动速度" value={opts.autoSpeed} min={0} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(autoSpeed) => set({ autoSpeed })} />
          <ControlRow label="明场墨水">
            <Switch checked={opts.lightMode} onChange={(lightMode) => set({ lightMode })} label="明场墨水" />
          </ControlRow>
          <ControlRow label="边缘反弹">
            <Switch checked={opts.bounceEdges} onChange={(bounceEdges) => set({ bounceEdges })} label="边缘反弹" />
          </ControlRow>
          <ControlRow label="点击急流">
            <Switch checked={opts.clickBurst} onChange={(clickBurst) => set({ clickBurst })} label="点击急流" />
          </ControlRow>
          <ControlRow label="自动演舞">
            <Switch checked={opts.autoDemo} onChange={(autoDemo) => set({ autoDemo })} label="自动演舞" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the default palette stirring on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 170, background: "#101014" }}>
        <LiquidEther />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
