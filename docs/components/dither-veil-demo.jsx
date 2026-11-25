import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as DitherVeil } from "../../src/components/dither-veil/DitherVeil.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The photo is an inline SVG scene, so the veil works with zero network.
   Sweep the pointer to burn through; click for shockwaves. */

const PHOTO = `./assets/demo-photos/photo-01.jpg`;

const DEFAULTS = {
  fit: "contain",
  pattern: "floyd",
  pixelSize: 2,
  levels: 2,
  palette: "duotone",
  inkColor: "#120f17",
  paperColor: "#f4f1ea",
  contrast: 1.15,
  brightness: 0,
  revealRadius: 200,
  softness: 0.6,
  linger: 1,
  rimColor: "#a78bfa",
  rim: 0,
  reverse: false,
  wander: false,
  clickBurst: true,
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

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 340 }}>
            <DitherVeil src={PHOTO} {...opts} />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./dither-veil-preview.html">
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
            label="网点"
            value={opts.pattern}
            onChange={(pattern) => set({ pattern })}
            options={[
              ["floyd", "误差扩散"],
              ["atkinson", "Atkinson"],
              ["bayer", "矩阵"],
              ["noise", "蓝噪声"],
              ["lines", "雕版线"],
            ]}
          />
          <Tabs
            label="调色"
            value={opts.palette}
            onChange={(palette) => set({ palette })}
            options={[
              ["duotone", "双色调"],
              ["rgb", "彩色"],
            ]}
          />
          <Tabs
            label="填充"
            value={opts.fit}
            onChange={(fit) => set({ fit })}
            options={[
              ["contain", "包含"],
              ["cover", "裁满"],
            ]}
          />
          <Slider label="格子大小" value={opts.pixelSize} min={1} max={12} step={1} format={(v) => `${v}px`} onChange={(pixelSize) => set({ pixelSize })} />
          <Slider label="量化级数" value={opts.levels} min={2} max={6} step={1} format={(v) => String(v)} onChange={(levels) => set({ levels })} />
          <Color label="油墨" value={opts.inkColor} onChange={(inkColor) => set({ inkColor })} />
          <Color label="纸面" value={opts.paperColor} onChange={(paperColor) => set({ paperColor })} />
          <Slider label="对比" value={opts.contrast} min={0.5} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(contrast) => set({ contrast })} />
          <Slider label="烧穿半径" value={opts.revealRadius} min={40} max={420} step={10} format={(v) => `${v}px`} onChange={(revealRadius) => set({ revealRadius })} />
          <Slider label="软边" value={opts.softness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(softness) => set({ softness })} />
          <Slider label="织回时长" value={opts.linger} min={0} max={4} step={0.1} format={(v) => `${v.toFixed(1)}s`} onChange={(linger) => set({ linger })} />
          <Slider label="边界网点" value={opts.rim} min={0} max={0.95} step={0.05} format={(v) => v.toFixed(2)} onChange={(rim) => set({ rim })} />
          <Color label="网点颜色" value={opts.rimColor} onChange={(rimColor) => set({ rimColor })} />
          <ControlRow label="反转显影">
            <Switch checked={opts.reverse} onChange={(reverse) => set({ reverse })} label="反转显影" />
          </ControlRow>
          <ControlRow label="自动游走">
            <Switch checked={opts.wander} onChange={(wander) => set({ wander })} label="自动游走" />
          </ControlRow>
          <ControlRow label="点击冲击波">
            <Switch checked={opts.clickBurst} onChange={(clickBurst) => set({ clickBurst })} label="点击冲击波" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the dithered print mid-reveal on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 190, background: "#101014" }}>
        <DitherVeil src={PHOTO} pixelSize={3} wander />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
