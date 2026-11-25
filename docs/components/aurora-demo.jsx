import { useState } from "react";
import { DemoFit } from "../demo-fit";
import Aurora from "../../src/components/aurora/Aurora.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The canvas is transparent, so the stage colour shows straight through. */

const DEFAULTS = {
  colorStops: ["#5227FF", "#7cff67", "#5227FF"],
  amplitude: 1,
  blend: 0.5,
  speed: 1,
  height: 0.45,
  glow: 0.6,
  brightness: 1,
  layers: 1,
  direction: "top",
  mouseInteraction: true,
  lightMode: false,
  paused: false,
};

const PRESETS = [
  ["默认", ["#5227FF", "#7cff67", "#5227FF"]],
  ["绿松", ["#0ff2b2", "#1f7aff", "#0ff2b2"]],
  ["橙粉", ["#ff5c7a", "#ffb35c", "#ff5c7a"]],
];

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
      <div className="demo-stage" style={{ background: opts.lightMode ? "#eef0ee" : "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ width: "100%", height: 320, position: "relative" }}>
            <Aurora
              colorStops={opts.colorStops}
              amplitude={opts.amplitude}
              blend={opts.blend}
              speed={opts.speed}
              height={opts.height}
              glow={opts.glow}
              brightness={opts.brightness}
              layers={opts.layers}
              direction={opts.direction}
              mouseInteraction={opts.mouseInteraction}
              lightMode={opts.lightMode}
              paused={opts.paused}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./aurora-preview.html">
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
          <ControlRow label="色板">
            <div className="view-tabs">
              {PRESETS.map(([name, stops]) => (
                <button key={name} type="button" className={opts.colorStops.join() === stops.join() ? "active" : ""} onClick={() => set({ colorStops: stops })}>
                  {name}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="波浪幅度" value={opts.amplitude} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(amplitude) => set({ amplitude })} />
          <Slider label="边缘柔和" value={opts.blend} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(blend) => set({ blend })} />
          <Slider label="速度" value={opts.speed} min={0} max={2} step={0.05} format={(v) => `${v.toFixed(2)}×`} onChange={(speed) => set({ speed })} />
          <Slider label="垂下深度" value={opts.height} min={0.1} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(height) => set({ height })} />
          <Slider label="密度" value={opts.glow} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <Slider label="亮度" value={opts.brightness} min={0.2} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(brightness) => set({ brightness })} />
          <Slider label="层数" value={opts.layers} min={1} max={3} step={1} format={(v) => String(v)} onChange={(layers) => set({ layers })} />
          <Tabs label="方向" value={opts.direction} options={[["top", "顶缘"], ["bottom", "底缘"]]} onChange={(direction) => set({ direction })} />
          <ControlRow label="光标隆起">
            <Switch checked={opts.mouseInteraction} onChange={(mouseInteraction) => set({ mouseInteraction })} label="光标隆起" />
          </ControlRow>
          <ControlRow label="亮色模式">
            <Switch checked={opts.lightMode} onChange={(lightMode) => set({ lightMode })} label="亮色模式" />
          </ControlRow>
          <ControlRow label="暂停">
            <Switch checked={opts.paused} onChange={(paused) => set({ paused })} label="暂停" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the curtain hanging from the top of the card. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 200, position: "relative", background: "#101014" }}>
        <Aurora layers={2} paused={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
