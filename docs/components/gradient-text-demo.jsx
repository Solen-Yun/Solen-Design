import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as GradientText } from "../../src/components/gradient-text/GradientText.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Follow the pointer with followPointer on, and toggle the border pill to
   see the same gradient run through the ring. */

const DEFAULTS = {
  colors: ["#5227FF", "#FF9FFC", "#B497CF"],
  animationSpeed: 8,
  variant: "linear",
  angle: 90,
  scale: 3,
  yoyo: true,
  glow: 0,
  showBorder: false,
  borderWidth: 1.5,
  pauseOnHover: false,
  followPointer: false,
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
  const setColor = (index, color) =>
    set({ colors: opts.colors.map((c, i) => (i === index ? color : c)) });

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
              height: 260,
            }}
          >
            <GradientText
              colors={opts.colors}
              animationSpeed={opts.animationSpeed}
              variant={opts.variant}
              angle={opts.angle}
              scale={opts.scale}
              yoyo={opts.yoyo}
              glow={opts.glow}
              showBorder={opts.showBorder}
              borderWidth={opts.borderWidth}
              pauseOnHover={opts.pauseOnHover}
              followPointer={opts.followPointer}
              style={{ fontSize: 72, fontWeight: 800 }}
            >
              Gradient flow
            </GradientText>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./gradient-text-preview.html">
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
          <ControlRow label="渐变模式">
            <div className="view-tabs">
              {[["linear", "线性"], ["flow", "流彩"], ["conic", "锥形"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.variant === id ? "active" : ""} onClick={() => set({ variant: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          {opts.colors.map((color, index) => (
            <Color key={index} label={`颜色 ${index + 1}`} value={color} onChange={(c) => setColor(index, c)} />
          ))}
          <Slider label="一轮时长" value={opts.animationSpeed} min={2} max={20} step={0.5} format={(v) => `${v.toFixed(1)}s`} onChange={(animationSpeed) => set({ animationSpeed })} />
          <Slider label="角度" value={opts.angle} min={0} max={360} step={5} format={(v) => `${v}°`} onChange={(angle) => set({ angle })} />
          <Slider label="尺度" value={opts.scale} min={1} max={6} step={0.5} format={(v) => v.toFixed(1)} onChange={(scale) => set({ scale })} />
          <Slider label="柔光" value={opts.glow} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <Slider label="描边粗细" value={opts.borderWidth} min={0.5} max={6} step={0.5} format={(v) => `${v.toFixed(1)}px`} onChange={(borderWidth) => set({ borderWidth })} />
          <ControlRow label="往复摆动">
            <Switch checked={opts.yoyo} onChange={(yoyo) => set({ yoyo })} label="往复摆动" />
          </ControlRow>
          <ControlRow label="胶囊描边">
            <Switch checked={opts.showBorder} onChange={(showBorder) => set({ showBorder })} label="胶囊描边" />
          </ControlRow>
          <ControlRow label="悬停暂停">
            <Switch checked={opts.pauseOnHover} onChange={(pauseOnHover) => set({ pauseOnHover })} label="悬停暂停" />
          </ControlRow>
          <ControlRow label="指针跟随">
            <Switch checked={opts.followPointer} onChange={(followPointer) => set({ followPointer })} label="指针跟随" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the flow variant breathing on the dark stage. */
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
        }}
      >
        <GradientText variant="flow" glow={0.6} style={{ fontSize: 40, fontWeight: 800 }}>
          Gradient flow
        </GradientText>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
