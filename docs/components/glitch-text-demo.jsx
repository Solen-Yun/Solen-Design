import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as GlitchText } from "../../src/components/glitch-text/GlitchText.jsx";

/* The demo sits on a dark stage so the red/cyan ghosts read. Switch the
   four patterns and the trigger — hover glitches only under the pointer,
   click fires a one-burst-per-click rhythm. */

const DEFAULTS = {
  mode: "slices",
  trigger: "always",
  intensity: 0.5,
  speed: 0.5,
  offset: 10,
  skew: 0,
  flicker: false,
  enableShadows: true,
  color: "#f4f4f5",
  shadowA: "#ff0000",
  shadowB: "#00ffff",
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

function Tabs({ label, value, options, onChange }) {
  return (
    <ControlRow label={label}>
      <div className="view-tabs">
        {options.map(([id, name]) => (
          <button key={id} type="button" className={value === id ? "active" : ""} onClick={() => onChange(id)}>
            {name}
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
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: 220,
            }}
          >
            <GlitchText
              mode={opts.mode}
              trigger={opts.trigger}
              intensity={opts.intensity}
              speed={opts.speed}
              offset={opts.offset}
              skew={opts.skew}
              flicker={opts.flicker}
              enableShadows={opts.enableShadows}
              shadowColors={[opts.shadowA, opts.shadowB]}
              color={opts.color}
              fontSize="clamp(2.5rem, 8vw, 5rem)"
            >
              故障文字 GLITCH
            </GlitchText>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./glitch-text-preview.html">
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
            label="图案"
            value={opts.mode}
            options={[["slices", "切片"], ["rgb", "色偏"], ["scan", "扫描"], ["noise", "乱码"]]}
            onChange={(mode) => set({ mode })}
          />
          <Tabs
            label="触发"
            value={opts.trigger}
            options={[["always", "常驻"], ["hover", "悬停"], ["click", "点击"]]}
            onChange={(trigger) => set({ trigger })}
          />
          <Color label="文字颜色" value={opts.color} onChange={(color) => set({ color })} />
          <Color label="幽灵色 A" value={opts.shadowA} onChange={(shadowA) => set({ shadowA })} />
          <Color label="幽灵色 B" value={opts.shadowB} onChange={(shadowB) => set({ shadowB })} />
          <Slider label="强度" value={opts.intensity} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(intensity) => set({ intensity })} />
          <Slider label="速度" value={opts.speed} min={0.1} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(speed) => set({ speed })} />
          <Slider label="位移" value={opts.offset} min={0} max={30} step={1} format={(v) => `${v}px`} onChange={(offset) => set({ offset })} />
          <Slider label="倾斜" value={opts.skew} min={0} max={8} step={0.5} format={(v) => `${v}°`} onChange={(skew) => set({ skew })} />
          <ControlRow label="闪烁">
            <Switch checked={opts.flicker} onChange={(flicker) => set({ flicker })} label="闪烁" />
          </ControlRow>
          <ControlRow label="彩色阴影">
            <Switch checked={opts.enableShadows} onChange={(enableShadows) => set({ enableShadows })} label="彩色阴影" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — RGB split caught mid-tear on the dark stage. */
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
          background: "#101014",
          colorScheme: "dark",
        }}
      >
        <GlitchText mode="rgb" intensity={0.6} speed={0.6} offset={12} color="#f4f4f5" fontSize="3.4rem">
          GLITCH
        </GlitchText>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
