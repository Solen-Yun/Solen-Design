import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as CrystalizedBall } from "../../src/components/crystalized-ball/CrystalizedBall.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Hover heats the rim toward the pointer and stirs the dust; clicking
   kicks the cloud and fires two arcs from the click point. */

const PRESETS = {
  plasma: { color: "#F25BD0", strands: 6, crackle: 0.85, flares: 0.65, glow: 0.9, sparks: 0.6, particleCount: 15000, fill: 0.5, motion: "rise", particleShape: "square", depth: 0.6, sway: 0.5, twinkle: 0.5, haze: 0.7, dustSpeed: 1 },
  aurora: { color: "#5CFFC8", strands: 5, crackle: 0.6, flares: 0.5, glow: 0.8, sparks: 0.45, particleCount: 15000, fill: 0.5, motion: "rise", particleShape: "square", depth: 0.6, sway: 0.5, twinkle: 0.5, haze: 0.7, dustSpeed: 1 },
  nebula: { color: "#9478FF", strands: 6, crackle: 1, flares: 0.5, glow: 0.9, sparks: 0.6, particleCount: 18000, fill: 0.45, motion: "rise", particleShape: "square", depth: 0.5, sway: 0.4, twinkle: 0.6, haze: 0.8, dustSpeed: 1.2 },
  ember: { color: "#FF8A2A", strands: 5, crackle: 0.9, flares: 0.8, glow: 1, sparks: 0.8, particleCount: 12000, fill: 0.35, motion: "rise", particleShape: "round", depth: 0.7, sway: 0.3, twinkle: 0.7, haze: 0.9, dustSpeed: 1.6 },
  frost: { color: "#BFE6FF", strands: 3, crackle: 0.3, flares: 0.3, glow: 0.6, sparks: 0.2, particleCount: 16000, fill: 0.6, motion: "fall", particleShape: "round", depth: 0.8, sway: 0.4, twinkle: 0.4, haze: 0.5, dustSpeed: 0.7 },
  solar: { color: "#FFD36E", strands: 6, crackle: 0.7, flares: 1, glow: 1.1, sparks: 0.5, particleCount: 15000, fill: 0.55, motion: "orbit", particleShape: "square", depth: 0.6, sway: 0.7, twinkle: 0.5, haze: 0.8, dustSpeed: 1 },
  eclipse: { color: "#FFFFFF", strands: 4, crackle: 0.5, flares: 0.4, glow: 0.7, sparks: 0.35, particleCount: 14000, fill: 0.5, motion: "drift", particleShape: "square", depth: 0.7, sway: 0.5, twinkle: 0.5, haze: 0.5, dustSpeed: 0.8 },
  abyss: { color: "#3F7BFF", strands: 5, crackle: 0.55, flares: 0.6, glow: 0.9, sparks: 0.4, particleCount: 20000, fill: 0.8, motion: "orbit", particleShape: "round", depth: 0.8, sway: 0.8, twinkle: 0.5, haze: 0.6, dustSpeed: 0.9 },
};

const DEFAULTS = {
  preset: "plasma",
  theme: "dark",
  size: 0.7,
  speed: 1,
  interactive: true,
  hoverStrength: 0.7,
  intro: true,
  paused: false,
  ...PRESETS.plasma,
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
  const pickPreset = (preset) => setOpts({ ...DEFAULTS, preset, ...PRESETS[preset] });
  const reset = () => setOpts(DEFAULTS);

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 340 }}>
            <CrystalizedBall
              preset={opts.preset}
              color={opts.color}
              theme={opts.theme}
              size={opts.size}
              strands={opts.strands}
              crackle={opts.crackle}
              flares={opts.flares}
              glow={opts.glow}
              sparks={opts.sparks}
              particleCount={opts.particleCount}
              fill={opts.fill}
              motion={opts.motion}
              particleShape={opts.particleShape}
              depth={opts.depth}
              sway={opts.sway}
              twinkle={opts.twinkle}
              haze={opts.haze}
              speed={opts.speed}
              dustSpeed={opts.dustSpeed}
              interactive={opts.interactive}
              hoverStrength={opts.hoverStrength}
              intro={opts.intro}
              paused={opts.paused}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./crystalized-ball-preview.html">
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
            label="预设"
            value={opts.preset}
            onChange={pickPreset}
            options={[
              ["plasma", "等离子"],
              ["aurora", "极光"],
              ["nebula", "星云"],
              ["ember", "余烬"],
              ["frost", "霜尘"],
              ["solar", "日冕"],
              ["eclipse", "蚀白"],
              ["abyss", "深渊"],
            ]}
          />
          <Color label="主色" value={opts.color} onChange={(color) => set({ color })} />
          <ControlRow label="浅色主题">
            <Switch checked={opts.theme === "light"} onChange={(light) => set({ theme: light ? "light" : "dark" })} label="浅色主题" />
          </ControlRow>
          <Slider label="球体大小" value={opts.size} min={0.1} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(size) => set({ size })} />
          <Slider label="波纹条数" value={opts.strands} min={1} max={8} step={1} format={(v) => String(v)} onChange={(strands) => set({ strands })} />
          <Slider label="粗糙度" value={opts.crackle} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(crackle) => set({ crackle })} />
          <Slider label="火舌" value={opts.flares} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(flares) => set({ flares })} />
          <Slider label="亮度" value={opts.glow} min={0} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(glow) => set({ glow })} />
          <Slider label="闪电频率" value={opts.sparks} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(sparks) => set({ sparks })} />
          <Slider label="粒子数" value={opts.particleCount} min={0} max={40000} step={1000} format={(v) => String(v)} onChange={(particleCount) => set({ particleCount })} />
          <Tabs
            label="尘埃运动"
            value={opts.motion}
            onChange={(motion) => set({ motion })}
            options={[
              ["rise", "上升"],
              ["fall", "下落"],
              ["drift", "漂移"],
              ["orbit", "环绕"],
            ]}
          />
          <Tabs
            label="粒子形状"
            value={opts.particleShape}
            onChange={(particleShape) => set({ particleShape })}
            options={[
              ["square", "方形"],
              ["round", "圆形"],
            ]}
          />
          <Slider label="景深" value={opts.depth} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(depth) => set({ depth })} />
          <Slider label="翻滚" value={opts.sway} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(sway) => set({ sway })} />
          <Slider label="闪烁" value={opts.twinkle} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(twinkle) => set({ twinkle })} />
          <Slider label="雾团" value={opts.haze} min={0} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(haze) => set({ haze })} />
          <Slider label="尘埃速度" value={opts.dustSpeed} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(dustSpeed) => set({ dustSpeed })} />
          <Slider label="指针强度" value={opts.hoverStrength} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(hoverStrength) => set({ hoverStrength })} />
          <ControlRow label="指针交互">
            <Switch checked={opts.interactive} onChange={(interactive) => set({ interactive })} label="指针交互" />
          </ControlRow>
          <ControlRow label="暂停">
            <Switch checked={opts.paused} onChange={(paused) => set({ paused })} label="暂停" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the plasma ball centred on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 190, background: "#101014" }}>
        <CrystalizedBall preset="plasma" size={0.62} interactive={false} intro={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
