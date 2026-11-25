import { useState } from "react";
import { DemoFit } from "../demo-fit";
import SplashCursor from "../../src/components/splash-cursor/SplashCursor.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The fluid is contained to the stage; swirl the pointer and click. */

const DEFAULTS = {
  colors: ["#4f8cff", "#2dd4bf", "#ffd166"],
  rainbow: true,
  colorSpeed: 1,
  intensity: 1,
  size: 1,
  force: 1,
  swirl: 3,
  trail: 1,
  momentum: 1,
  shading: 1,
  glow: 0,
  quality: "high",
  clickSplash: true,
  theme: "dark",
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
  const dark = opts.theme === "dark";

  return (
    <>
      <div className="demo-stage" style={{ background: dark ? "#101014" : "#ececf1", colorScheme: opts.theme }}>
        <DemoFit>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: 340,
              background: dark ? "#0c0c10" : "#f5f5f7",
              borderRadius: 16,
              color: dark ? "#52525b" : "#a1a1aa",
              fontSize: 13,
              letterSpacing: "0.08em",
              overflow: "hidden",
            }}
          >
            在面板里划动搅出漩涡 · 点击砸出泼溅
            <SplashCursor
              contained
              colors={opts.colors}
              rainbow={opts.rainbow}
              colorSpeed={opts.colorSpeed}
              intensity={opts.intensity}
              size={opts.size}
              force={opts.force}
              swirl={opts.swirl}
              trail={opts.trail}
              momentum={opts.momentum}
              shading={opts.shading}
              glow={opts.glow}
              quality={opts.quality}
              clickSplash={opts.clickSplash}
              theme={opts.theme}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./splash-cursor-preview.html">
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
          <ControlRow label="彩虹墨色">
            <Switch checked={opts.rainbow} onChange={(rainbow) => set({ rainbow })} label="彩虹墨色" />
          </ControlRow>
          <Color label="墨色一" value={opts.colors[0]} onChange={(color) => set({ colors: [color, opts.colors[1], opts.colors[2]] })} />
          <Color label="墨色二" value={opts.colors[1]} onChange={(color) => set({ colors: [opts.colors[0], color, opts.colors[2]] })} />
          <Color label="墨色三" value={opts.colors[2]} onChange={(color) => set({ colors: [opts.colors[0], opts.colors[1], color] })} />
          <Slider label="变色速度" value={opts.colorSpeed} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(colorSpeed) => set({ colorSpeed })} />
          <Slider label="注墨量" value={opts.intensity} min={0.2} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(intensity) => set({ intensity })} />
          <Slider label="半径" value={opts.size} min={0.4} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(size) => set({ size })} />
          <Slider label="推力" value={opts.force} min={0.2} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(force) => set({ force })} />
          <Slider label="漩涡" value={opts.swirl} min={0} max={8} step={0.5} format={(v) => v.toFixed(1)} onChange={(swirl) => set({ swirl })} />
          <Slider label="墨迹存留" value={opts.trail} min={0.3} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(trail) => set({ trail })} />
          <Slider label="流速存留" value={opts.momentum} min={0.2} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(momentum) => set({ momentum })} />
          <Slider label="明暗" value={opts.shading} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(shading) => set({ shading })} />
          <Slider label="泛光" value={opts.glow} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <ControlRow label="画质">
            <div className="view-tabs">
              {[["low", "低"], ["medium", "中"], ["high", "高"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.quality === id ? "active" : ""} onClick={() => set({ quality: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="点击泼溅">
            <Switch checked={opts.clickSplash} onChange={(clickSplash) => set({ clickSplash })} label="点击泼溅" />
          </ControlRow>
          <ControlRow label="亮色主题">
            <Switch checked={opts.theme === "light"} onChange={(light) => set({ theme: light ? "light" : "dark" })} label="亮色主题" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the intro sweep paints a stroke through the panel. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: 170,
          background: "#0c0c10",
          color: "#52525b",
          fontSize: 12,
          letterSpacing: "0.08em",
          overflow: "hidden",
        }}
      >
        流体泼墨 · 自动演示
        <SplashCursor contained intro={true} quality="medium" trail={1.2} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
