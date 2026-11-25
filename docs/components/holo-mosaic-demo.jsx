import { useState } from "react";
import { DemoFit } from "../demo-fit";
import HoloMosaic from "../../src/components/holo-mosaic/HoloMosaic.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The spectrum sweeps on its own; the cursor bends it, clicks flip tiles. */

const DEFAULTS = {
  color: "#120f17",
  metalColor: "#e8ebf1",
  spectrum: "full",
  tileSize: 1,
  gap: 0.08,
  roundness: 0.15,
  bevel: 0.35,
  rotation: 0,
  scatter: 0.3,
  tilt: 0.35,
  swirl: 1,
  ripple: 0.6,
  bands: 1.3,
  softness: 0.5,
  intensity: 1.25,
  saturation: 0.1,
  glitter: 0.85,
  sheen: 0.8,
  grain: 0.08,
  speed: 0.5,
  variation: 0,
  filter: "none",
  filterSize: 1,
  mouseInteraction: true,
  flipOnClick: true,
  lightMode: false,
  paused: false,
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
      <div className="demo-stage" style={{ background: opts.lightMode ? "#f4f4f5" : "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 340 }}>
            <HoloMosaic {...opts} />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./holo-mosaic-preview.html">
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
          <Color label="基色" value={opts.color} onChange={(color) => set({ color })} />
          <Tabs
            label="光谱"
            value={opts.spectrum}
            options={[["full", "全谱"], ["warm", "暖"], ["cool", "冷"], ["pearl", "珍珠"]]}
            onChange={(spectrum) => set({ spectrum })}
          />
          <Tabs label="滤镜" value={opts.filter} options={[["none", "无"], ["dither", "抖动"], ["ascii", "字符"]]} onChange={(filter) => set({ filter })} />
          <Slider label="砖尺寸" value={opts.tileSize} min={0.4} max={3} step={0.1} format={(v) => `${v.toFixed(1)}×`} onChange={(tileSize) => set({ tileSize })} />
          <Slider label="缝隙" value={opts.gap} min={0} max={0.6} step={0.02} format={(v) => v.toFixed(2)} onChange={(gap) => set({ gap })} />
          <Slider label="圆角" value={opts.roundness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(roundness) => set({ roundness })} />
          <Slider label="倒角" value={opts.bevel} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(bevel) => set({ bevel })} />
          <Slider label="旋转" value={opts.rotation} min={-45} max={45} step={1} format={(v) => `${v}°`} onChange={(rotation) => set({ rotation })} />
          <Slider label="彩虹带" value={opts.bands} min={0.3} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(bands) => set({ bands })} />
          <Slider label="涡流" value={opts.swirl} min={0} max={5} step={0.1} format={(v) => v.toFixed(1)} onChange={(swirl) => set({ swirl })} />
          <Slider label="波纹" value={opts.ripple} min={0} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(ripple) => set({ ripple })} />
          <Slider label="散射" value={opts.scatter} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(scatter) => set({ scatter })} />
          <Slider label="闪粉" value={opts.glitter} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(glitter) => set({ glitter })} />
          <Slider label="光池" value={opts.sheen} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(sheen) => set({ sheen })} />
          <Slider label="速度" value={opts.speed} min={0} max={2} step={0.05} format={(v) => `${v.toFixed(2)}×`} onChange={(speed) => set({ speed })} />
          <Slider label="种子" value={opts.variation} min={0} max={99} step={1} format={(v) => String(v)} onChange={(variation) => set({ variation })} />
          <ControlRow label="白纸墨印">
            <Switch checked={opts.lightMode} onChange={(lightMode) => set({ lightMode })} label="白纸墨印" />
          </ControlRow>
          <ControlRow label="点击翻转">
            <Switch checked={opts.flipOnClick} onChange={(flipOnClick) => set({ flipOnClick })} label="点击翻转" />
          </ControlRow>
          <ControlRow label="指针交互">
            <Switch checked={opts.mouseInteraction} onChange={(mouseInteraction) => set({ mouseInteraction })} label="指针交互" />
          </ControlRow>
          <ControlRow label="暂停">
            <Switch checked={opts.paused} onChange={(paused) => set({ paused })} label="暂停" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the full-spectrum wall mid-sweep with glitter on. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 170, background: "#101014" }}>
        <HoloMosaic intro={false} speed={0.4} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
