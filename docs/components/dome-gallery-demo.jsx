import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as DomeGallery } from "../../src/components/dome-gallery/DomeGallery.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Drag the dome to spin it, flick for inertia, click a tile to enlarge. */


const IMAGES = [
  { src: "./assets/demo-photos/photo-01.jpg", alt: "海浪" },
  { src: "./assets/demo-photos/photo-02.jpg", alt: "星球" },
  { src: "./assets/demo-photos/photo-03.jpg", alt: "秋叶" },
  { src: "./assets/demo-photos/photo-04.jpg", alt: "植物" },
  { src: "./assets/demo-photos/photo-05.jpg", alt: "花朵" },
  { src: "./assets/demo-photos/photo-06.jpg", alt: "山峦" },
  { src: "./assets/demo-photos/photo-07.jpg", alt: "游鱼" },
];

const DEFAULTS = {
  fit: 0.5,
  segments: 35,
  maxVerticalRotationDeg: 5,
  dragSensitivity: 20,
  dragDampening: 2,
  enlargeTransitionMs: 300,
  grayscale: true,
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
      <div className="demo-stage" style={{ background: "#120f17", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ width: "100%", height: 480 }}>
            <DomeGallery
              images={IMAGES}
              fit={opts.fit}
              segments={opts.segments}
              maxVerticalRotationDeg={opts.maxVerticalRotationDeg}
              dragSensitivity={opts.dragSensitivity}
              dragDampening={opts.dragDampening}
              enlargeTransitionMs={opts.enlargeTransitionMs}
              grayscale={opts.grayscale}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./dome-gallery-preview.html">
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
          <Slider label="穹顶大小" value={opts.fit} min={0.3} max={0.8} step={0.05} format={(v) => v.toFixed(2)} onChange={(fit) => set({ fit })} />
          <Slider label="瓦片列数" value={opts.segments} min={15} max={45} step={2} format={(v) => String(v)} onChange={(segments) => set({ segments })} />
          <Slider label="俯仰上限" value={opts.maxVerticalRotationDeg} min={0} max={20} step={1} format={(v) => `${v}°`} onChange={(maxVerticalRotationDeg) => set({ maxVerticalRotationDeg })} />
          <Slider label="拖拽灵敏度" value={opts.dragSensitivity} min={5} max={40} step={1} format={(v) => String(v)} onChange={(dragSensitivity) => set({ dragSensitivity })} />
          <Slider label="惯性阻尼" value={opts.dragDampening} min={0} max={4} step={0.2} format={(v) => v.toFixed(1)} onChange={(dragDampening) => set({ dragDampening })} />
          <Slider label="放大时长" value={opts.enlargeTransitionMs} min={100} max={800} step={50} format={(v) => `${v}ms`} onChange={(enlargeTransitionMs) => set({ enlargeTransitionMs })} />
          <ControlRow label="灰度图片">
            <Switch checked={opts.grayscale} onChange={(grayscale) => set({ grayscale })} label="灰度图片" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the dome resting on its own dark backdrop. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 240, background: "#120f17" }}>
        <DomeGallery images={IMAGES} fit={0.55} grayscale={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
