import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as MetaBalls } from "../../src/components/meta-balls/MetaBalls.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Move the pointer through the crowd, then click: the burst scatters
   nearby balls and the cursor blob pulses. */

const DEFAULTS = {
  color: "#ffffff",
  cursorBallColor: "#8ee6f2",
  speed: 0.3,
  hoverSmoothness: 0.1,
  animationSize: 30,
  ballCount: 15,
  clumpFactor: 1,
  cursorBallSize: 3,
  gooeyness: 0.5,
  stickiness: 0.5,
  stretch: 0.5,
  wobble: 0.5,
  variant: "solid",
  motion: "orbit",
  lineWidth: 1.5,
  rings: 4,
  enableTransparency: false,
  enableMouseInteraction: true,
  clickBurst: true,
  intro: true,
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
          <div style={{ position: "relative", width: "100%", height: 340 }}>
            <MetaBalls
              color={opts.color}
              cursorBallColor={opts.cursorBallColor}
              speed={opts.speed}
              animationSize={opts.animationSize}
              ballCount={opts.ballCount}
              clumpFactor={opts.clumpFactor}
              cursorBallSize={opts.cursorBallSize}
              gooeyness={opts.gooeyness}
              stickiness={opts.stickiness}
              stretch={opts.stretch}
              wobble={opts.wobble}
              variant={opts.variant}
              motion={opts.motion}
              lineWidth={opts.lineWidth}
              rings={opts.rings}
              enableTransparency={opts.enableTransparency}
              enableMouseInteraction={opts.enableMouseInteraction}
              clickBurst={opts.clickBurst}
              intro={opts.intro}
              paused={opts.paused}
            />
            <p
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                paddingBottom: 14,
                margin: 0,
                pointerEvents: "none",
                color: "#52525b",
                fontSize: 13,
                letterSpacing: 2,
              }}
            >
              移动光标穿过液团，点击迸散
            </p>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./meta-balls-preview.html">
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
          <Color label="球群色" value={opts.color} onChange={(color) => set({ color })} />
          <Color label="光标球色" value={opts.cursorBallColor} onChange={(cursorBallColor) => set({ cursorBallColor })} />
          <ControlRow label="渲染">
            <div className="view-tabs">
              {[["solid", "实心"], ["outline", "描线"], ["contour", "圈层"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.variant === id ? "active" : ""} onClick={() => set({ variant: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="编排">
            <div className="view-tabs">
              {[["orbit", "环绕"], ["lava", "熔岩"], ["drift", "漂移"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.motion === id ? "active" : ""} onClick={() => set({ motion: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="球数" value={opts.ballCount} min={0} max={50} step={1} format={(v) => String(v)} onChange={(ballCount) => set({ ballCount })} />
          <Slider label="游走速度" value={opts.speed} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(speed) => set({ speed })} />
          <Slider label="舞台尺寸" value={opts.animationSize} min={14} max={60} step={1} format={(v) => String(v)} onChange={(animationSize) => set({ animationSize })} />
          <Slider label="聚拢" value={opts.clumpFactor} min={0.2} max={1.25} step={0.05} format={(v) => v.toFixed(2)} onChange={(clumpFactor) => set({ clumpFactor })} />
          <Slider label="光标球大小" value={opts.cursorBallSize} min={1} max={8} step={0.5} format={(v) => String(v)} onChange={(cursorBallSize) => set({ cursorBallSize })} />
          <Slider label="跟随灵敏度" value={opts.hoverSmoothness} min={0.02} max={1} step={0.02} format={(v) => v.toFixed(2)} onChange={(hoverSmoothness) => set({ hoverSmoothness })} />
          <Slider label="融合" value={opts.gooeyness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(gooeyness) => set({ gooeyness })} />
          <Slider label="吸附力" value={opts.stickiness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(stickiness) => set({ stickiness })} />
          <Slider label="拉伸" value={opts.stretch} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(stretch) => set({ stretch })} />
          <Slider label="抖动" value={opts.wobble} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(wobble) => set({ wobble })} />
          <Slider label="线宽" value={opts.lineWidth} min={0.25} max={4} step={0.25} format={(v) => `${v}px`} onChange={(lineWidth) => set({ lineWidth })} />
          <Slider label="圈层数" value={opts.rings} min={0} max={12} step={1} format={(v) => String(v)} onChange={(rings) => set({ rings })} />
          <ControlRow label="光标交互">
            <Switch checked={opts.enableMouseInteraction} onChange={(enableMouseInteraction) => set({ enableMouseInteraction })} label="光标交互" />
          </ControlRow>
          <ControlRow label="点击迸散">
            <Switch checked={opts.clickBurst} onChange={(clickBurst) => set({ clickBurst })} label="点击迸散" />
          </ControlRow>
          <ControlRow label="透明背景">
            <Switch checked={opts.enableTransparency} onChange={(enableTransparency) => set({ enableTransparency })} label="透明背景" />
          </ControlRow>
          <ControlRow label="开场飞入">
            <Switch checked={opts.intro} onChange={(intro) => set({ intro })} label="开场飞入" />
          </ControlRow>
          <ControlRow label="暂停">
            <Switch checked={opts.paused} onChange={(paused) => set({ paused })} label="暂停" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — a cyan crowd orbiting on a small dark stage; the intro
   flock-in keeps the card alive before the cursor arrives. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 170, background: "#101014" }}>
        <MetaBalls color="#8ee6f2" cursorBallColor="#c084fc" speed={0.35} ballCount={12} cursorBallSize={2.5} clumpFactor={0.9} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
