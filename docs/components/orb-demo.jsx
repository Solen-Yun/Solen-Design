import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as Orb } from "../../src/components/orb/Orb.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Bring the pointer close to wake the orb, click inside it for the echo
   pulse, and use the tilt sliders for the pseudo-3D lean. */

const DEFAULTS = {
  color1: "#9c43fe",
  color2: "#4cc2e9",
  color3: "#101499",
  hue: 0,
  size: 1,
  glow: 1,
  bleed: 1,
  wobble: 1,
  highlight: 1,
  trail: 1,
  hoverIntensity: 1,
  tiltX: 0,
  tiltY: 0,
  rotateOnHover: true,
  followCursor: true,
  clickPulse: true,
  forceHoverState: false,
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
          <div style={{ position: "relative", width: "100%", maxWidth: 640, height: 340 }}>
            <Orb
              colors={[opts.color1, opts.color2, opts.color3]}
              hue={opts.hue}
              size={opts.size}
              glow={opts.glow}
              bleed={opts.bleed}
              wobble={opts.wobble}
              highlight={opts.highlight}
              trail={opts.trail}
              hoverIntensity={opts.hoverIntensity}
              tiltX={opts.tiltX}
              tiltY={opts.tiltY}
              rotateOnHover={opts.rotateOnHover}
              followCursor={opts.followCursor}
              clickPulse={opts.clickPulse}
              forceHoverState={opts.forceHoverState}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./orb-preview.html">
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
          <Color label="环光色" value={opts.color1} onChange={(color1) => set({ color1 })} />
          <Color label="涡流色" value={opts.color2} onChange={(color2) => set({ color2 })} />
          <Color label="深部色" value={opts.color3} onChange={(color3) => set({ color3 })} />
          <Slider label="色相" value={opts.hue} min={0} max={360} step={1} format={(v) => `${v}°`} onChange={(hue) => set({ hue })} />
          <Slider label="尺寸" value={opts.size} min={0.1} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(size) => set({ size })} />
          <Slider label="光晕" value={opts.glow} min={0.1} max={5} step={0.1} format={(v) => v.toFixed(1)} onChange={(glow) => set({ glow })} />
          <Slider label="晕开" value={opts.bleed} min={0} max={4} step={0.1} format={(v) => v.toFixed(1)} onChange={(bleed) => set({ bleed })} />
          <Slider label="起伏" value={opts.wobble} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(wobble) => set({ wobble })} />
          <Slider label="亮光" value={opts.highlight} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(highlight) => set({ highlight })} />
          <Slider label="彗尾" value={opts.trail} min={0} max={4} step={0.1} format={(v) => v.toFixed(1)} onChange={(trail) => set({ trail })} />
          <Slider label="悬停强度" value={opts.hoverIntensity} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(hoverIntensity) => set({ hoverIntensity })} />
          <Slider label="倾角 X" value={opts.tiltX} min={-70} max={70} step={1} format={(v) => `${v}°`} onChange={(tiltX) => set({ tiltX })} />
          <Slider label="倾角 Y" value={opts.tiltY} min={-70} max={70} step={1} format={(v) => `${v}°`} onChange={(tiltY) => set({ tiltY })} />
          <ControlRow label="悬停旋转">
            <Switch checked={opts.rotateOnHover} onChange={(rotateOnHover) => set({ rotateOnHover })} label="悬停旋转" />
          </ControlRow>
          <ControlRow label="追随指针">
            <Switch checked={opts.followCursor} onChange={(followCursor) => set({ followCursor })} label="追随指针" />
          </ControlRow>
          <ControlRow label="点击脉冲">
            <Switch checked={opts.clickPulse} onChange={(clickPulse) => set({ clickPulse })} label="点击脉冲" />
          </ControlRow>
          <ControlRow label="常亮唤醒">
            <Switch checked={opts.forceHoverState} onChange={(forceHoverState) => set({ forceHoverState })} label="常亮唤醒" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the default orb resting on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 170, background: "#101014" }}>
        <Orb forceHoverState={true} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
