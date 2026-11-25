import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as ScrambledText } from "../../src/components/scrambled-text/ScrambledText.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Sweep the pointer through the block, click for the shockwave, then switch
   to the physical modes to feel lift / blur / magnify. */

const DEFAULTS = {
  text: "The signal decodes as you sweep across it. Click anywhere to send a wave.",
  effect: "scramble",
  radius: 100,
  duration: 1.2,
  speed: 0.5,
  scrambleChars: ".:",
  strength: 1,
  trail: 0.6,
  clickBurst: true,
  intro: true,
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

function TextField({ label, value, onChange }) {
  return (
    <ControlRow label={label}>
      <input type="text" value={value} onChange={(event) => onChange(event.target.value)} aria-label={label} />
    </ControlRow>
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
  const [picked, setPicked] = useState({});
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => {
    setOpts(DEFAULTS);
    setPicked({});
  };

  return (
    <>
      <div className="demo-stage" style={{ background: "#ffffff", colorScheme: "light" }}>
        <DemoFit>
          <div style={{ width: "100%", height: 360, display: "flex", alignItems: "center" }}>
            <ScrambledText
              effect={opts.effect}
              radius={opts.radius}
              duration={opts.duration}
              speed={opts.speed}
              scrambleChars={opts.scrambleChars}
              strength={opts.strength}
              trail={opts.trail}
              clickBurst={opts.clickBurst}
              intro={opts.intro}
              scrambleColor={picked.scrambleColor ?? ""}
              color={picked.color ?? "#171717"}
              style={{ margin: "0 48px" }}
            >
              {opts.text}
            </ScrambledText>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./scrambled-text-preview.html">
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
          <TextField label="文字" value={opts.text} onChange={(text) => set({ text })} />
          <ControlRow label="扰动模式">
            <div className="view-tabs">
              {[["scramble", "乱码"], ["lift", "升起"], ["blur", "模糊"], ["magnify", "放大"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.effect === id ? "active" : ""} onClick={() => set({ effect: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <TextField label="字符池" value={opts.scrambleChars} onChange={(scrambleChars) => set({ scrambleChars })} />
          <Slider label="影响半径" value={opts.radius} min={40} max={260} step={5} format={(v) => `${v}px`} onChange={(radius) => set({ radius })} />
          <Slider label="乱码时长" value={opts.duration} min={0.3} max={2.5} step={0.1} format={(v) => `${v.toFixed(1)}s`} onChange={(duration) => set({ duration })} />
          <Slider label="轮换速度" value={opts.speed} min={0.1} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(speed) => set({ speed })} />
          <Slider label="扰动幅度" value={opts.strength} min={0} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(strength) => set({ strength })} />
          <Slider label="拖尾残留" value={opts.trail} min={0.1} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(trail) => set({ trail })} />
          <Color label="乱码颜色" value={picked.scrambleColor ?? "#ff5a36"} onChange={(scrambleColor) => setPicked((prev) => ({ ...prev, scrambleColor }))} />
          <Color label="文字颜色" value={picked.color ?? "#171717"} onChange={(color) => setPicked((prev) => ({ ...prev, color }))} />
          <ControlRow label="点击冲击波">
            <Switch checked={opts.clickBurst} onChange={(clickBurst) => set({ clickBurst })} label="点击冲击波" />
          </ControlRow>
          <ControlRow label="入场解码">
            <Switch checked={opts.intro} onChange={(intro) => set({ intro })} label="入场解码" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the decode resting on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 180, background: "#101014" }}>
        <ScrambledText intro={false} color="#f4f4f5" scrambleColor="#ff5a36" style={{ margin: "0 32px", fontSize: 20 }}>
          The signal decodes as you sweep across it. Click to send a wave.
        </ScrambledText>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
