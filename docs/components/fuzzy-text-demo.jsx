import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as FuzzyText } from "../../src/components/fuzzy-text/FuzzyText.jsx";

/* The demo lives on a dark stage so the RGB channel split reads clearly —
   light ink composites additively. Hover the glyphs for the stronger
   tremor, click for the shockwave (trigger click), or switch trigger to
   always and poke the glitch rhythm. */

const DEFAULTS = {
  color: "#f4f4f5",
  trigger: "hover",
  baseIntensity: 0.18,
  hoverIntensity: 0.5,
  fuzzRange: 30,
  sliceSize: 1,
  colorSplit: 0,
  transitionDuration: 0,
  glitchMode: false,
  clickEffect: false,
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: 240,
              color: opts.color,
            }}
          >
            <FuzzyText
              trigger={opts.trigger}
              color={opts.color}
              baseIntensity={opts.baseIntensity}
              hoverIntensity={opts.hoverIntensity}
              fuzzRange={opts.fuzzRange}
              sliceSize={opts.sliceSize}
              colorSplit={opts.colorSplit}
              transitionDuration={opts.transitionDuration}
              glitchMode={opts.glitchMode}
              clickEffect={opts.clickEffect}
            >
              毛刺震动
            </FuzzyText>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./fuzzy-text-preview.html">
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
          <Color label="文字颜色" value={opts.color} onChange={(color) => set({ color })} />
          <ControlRow label="触发方式">
            <div className="view-tabs">
              {[["hover", "悬停"], ["click", "点击"], ["always", "常驻"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.trigger === id ? "active" : ""} onClick={() => set({ trigger: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="静止抖动" value={opts.baseIntensity} min={0} max={1} step={0.02} format={(v) => v.toFixed(2)} onChange={(baseIntensity) => set({ baseIntensity })} />
          <Slider label="悬停抖动" value={opts.hoverIntensity} min={0} max={1} step={0.02} format={(v) => v.toFixed(2)} onChange={(hoverIntensity) => set({ hoverIntensity })} />
          <Slider label="位移幅度" value={opts.fuzzRange} min={0} max={60} step={2} format={(v) => `${v}px`} onChange={(fuzzRange) => set({ fuzzRange })} />
          <Slider label="切片厚度" value={opts.sliceSize} min={1} max={6} step={1} format={(v) => `${v}px`} onChange={(sliceSize) => set({ sliceSize })} />
          <Slider label="通道色散" value={opts.colorSplit} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(colorSplit) => set({ colorSplit })} />
          <Slider label="强度过渡" value={opts.transitionDuration} min={0} max={1} step={0.05} format={(v) => `${v.toFixed(2)}s`} onChange={(transitionDuration) => set({ transitionDuration })} />
          <ControlRow label="故障脉冲">
            <Switch checked={opts.glitchMode} onChange={(glitchMode) => set({ glitchMode })} label="故障脉冲" />
          </ControlRow>
          <ControlRow label="点击闪动">
            <Switch checked={opts.clickEffect} onChange={(clickEffect) => set({ clickEffect })} label="点击闪动" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the glitch pulse mid-convulsion with a channel split. */
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
        <FuzzyText color="#f4f4f5" glitchMode glitchInterval={900} glitchDuration={900} colorSplit={1.6} baseIntensity={0.18} hoverIntensity={0.5}>
          FUZZY
        </FuzzyText>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
