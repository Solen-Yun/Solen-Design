import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as MicroSlats } from "../../src/components/micro-slats/MicroSlats.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Drag across the wall to bend slats and leave a glowing trail, click
   for a three-jet splash, and switch presets for totally different seas. */

const DEFAULTS = {
  preset: "swell",
  color: "#A855F7",
  glintColor: "#ffffff",
  slatWidth: 10,
  slatHeight: 25,
  gap: 3,
  roundness: 0.75,
  cursorStrength: 1,
  cursorSize: 40,
  swirl: 0,
  trail: 1.4,
  lean: 0,
  interactive: true,
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

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", maxWidth: 760, height: 340 }}>
            <MicroSlats
              preset={opts.preset}
              color={opts.color}
              glintColor={opts.glintColor}
              slatWidth={opts.slatWidth}
              slatHeight={opts.slatHeight}
              gap={opts.gap}
              roundness={opts.roundness}
              cursorStrength={opts.cursorStrength}
              cursorSize={opts.cursorSize}
              swirl={opts.swirl}
              trail={opts.trail}
              lean={opts.lean}
              interactive={opts.interactive}
              paused={opts.paused}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./micro-slats-preview.html">
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
          <Color label="板条色" value={opts.color} onChange={(color) => set({ color })} />
          <Color label="高光色" value={opts.glintColor} onChange={(glintColor) => set({ glintColor })} />
          <Slider label="板条宽" value={opts.slatWidth} min={2} max={30} step={1} format={(v) => `${v}px`} onChange={(slatWidth) => set({ slatWidth })} />
          <Slider label="板条高" value={opts.slatHeight} min={6} max={80} step={2} format={(v) => `${v}px`} onChange={(slatHeight) => set({ slatHeight })} />
          <Slider label="间距" value={opts.gap} min={0} max={20} step={1} format={(v) => `${v}px`} onChange={(gap) => set({ gap })} />
          <Slider label="圆角" value={opts.roundness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(roundness) => set({ roundness })} />
          <Slider label="墨迹亮度" value={opts.cursorStrength} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(cursorStrength) => set({ cursorStrength })} />
          <Slider label="笔刷半径" value={opts.cursorSize} min={8} max={200} step={4} format={(v) => `${v}px`} onChange={(cursorSize) => set({ cursorSize })} />
          <Slider label="涡度" value={opts.swirl} min={0} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(swirl) => set({ swirl })} />
          <Slider label="尾迹残留" value={opts.trail} min={0.2} max={5} step={0.1} format={(v) => v.toFixed(1)} onChange={(trail) => set({ trail })} />
          <Slider label="倾斜" value={opts.lean} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(lean) => set({ lean })} />
          <ControlRow label="预设浪型">
            <div className="view-tabs">
              {[["swell", "涌浪"], ["tide", "潮汐"], ["storm", "风暴"], ["signal", "平墙"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.preset === id ? "active" : ""} onClick={() => set({ preset: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="指针交互">
            <Switch checked={opts.interactive} onChange={(interactive) => set({ interactive })} label="指针交互" />
          </ControlRow>
          <ControlRow label="定格">
            <Switch checked={opts.paused} onChange={(paused) => set({ paused })} label="定格" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the default swell sea on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 170, background: "#101014" }}>
        <MicroSlats slatHeight={20} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
