import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as FloatingLines } from "../../src/components/floating-lines/FloatingLines.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The magnetic bend and a stroked click swirl are the fastest way to
   feel the ribbons. */

const DEFAULTS = {
  colorA: "#e945f5",
  colorB: "#ffffff",
  lineCount: 10,
  lineDistance: 6,
  animationSpeed: 1,
  amplitude: 1,
  lineWidth: 1,
  lineStyle: "solid",
  glow: 1,
  brightness: 1,
  depthOfField: 0.5,
  bendStrength: -0.5,
  bendRadius: 5,
  interactive: true,
  parallax: true,
  clickSwirl: true,
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
      <div className="demo-stage" style={{ background: "#101014" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 260 }}>
            <FloatingLines
              linesGradient={[opts.colorA, opts.colorB]}
              lineCount={opts.lineCount}
              lineDistance={opts.lineDistance}
              animationSpeed={opts.animationSpeed}
              amplitude={opts.amplitude}
              lineWidth={opts.lineWidth}
              lineStyle={opts.lineStyle}
              glow={opts.glow}
              brightness={opts.brightness}
              depthOfField={opts.depthOfField}
              bendStrength={opts.bendStrength}
              bendRadius={opts.bendRadius}
              interactive={opts.interactive}
              parallax={opts.parallax}
              clickSwirl={opts.clickSwirl}
              lightMode={opts.lightMode}
              backgroundColor={opts.lightMode ? "#ffffff" : undefined}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./floating-lines-preview.html">
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
          <Color label="渐变起点" value={opts.colorA} onChange={(colorA) => set({ colorA })} />
          <Color label="渐变终点" value={opts.colorB} onChange={(colorB) => set({ colorB })} />
          <Slider label="每组线数" value={opts.lineCount} min={0} max={24} step={1} format={(v) => `${v} 条`} onChange={(lineCount) => set({ lineCount })} />
          <Slider label="线间距" value={opts.lineDistance} min={1} max={20} step={0.5} format={(v) => v.toFixed(1)} onChange={(lineDistance) => set({ lineDistance })} />
          <Slider label="流速" value={opts.animationSpeed} min={0} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(animationSpeed) => set({ animationSpeed })} />
          <Slider label="摆幅" value={opts.amplitude} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(amplitude) => set({ amplitude })} />
          <Slider label="线宽" value={opts.lineWidth} min={0.2} max={4} step={0.1} format={(v) => v.toFixed(1)} onChange={(lineWidth) => set({ lineWidth })} />
          <ControlRow label="线型">
            <div className="view-tabs">
              {[["solid", "实线"], ["dashed", "虚线"], ["dotted", "点线"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.lineStyle === id ? "active" : ""} onClick={() => set({ lineStyle: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="辉光" value={opts.glow} min={0} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <Slider label="曝光" value={opts.brightness} min={0} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(brightness) => set({ brightness })} />
          <Slider label="景深" value={opts.depthOfField} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(depthOfField) => set({ depthOfField })} />
          <Slider label="磁吸强度" value={opts.bendStrength} min={-2.5} max={1} step={0.1} format={(v) => v.toFixed(1)} onChange={(bendStrength) => set({ bendStrength })} />
          <Slider label="磁吸半径" value={opts.bendRadius} min={0.5} max={12} step={0.5} format={(v) => v.toFixed(1)} onChange={(bendRadius) => set({ bendRadius })} />
          <ControlRow label="光标交互">
            <Switch checked={opts.interactive} onChange={(interactive) => set({ interactive })} label="光标交互" />
          </ControlRow>
          <ControlRow label="视差">
            <Switch checked={opts.parallax} onChange={(parallax) => set({ parallax })} label="视差" />
          </ControlRow>
          <ControlRow label="点击拧转">
            <Switch checked={opts.clickSwirl} onChange={(clickSwirl) => set({ clickSwirl })} label="点击拧转" />
          </ControlRow>
          <ControlRow label="浅色模式">
            <Switch checked={opts.lightMode} onChange={(lightMode) => set({ lightMode })} label="浅色模式" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 220, background: "#101014" }}>
        <FloatingLines interactive={false} clickSwirl={false} intro={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
