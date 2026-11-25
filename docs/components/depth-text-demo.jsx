import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as DepthText } from "../../src/components/depth-text/DepthText.jsx";

/* The demo mounts the slab on a dark stage — the face inherits the stage's
   light ink. Moving the pointer turns the block; hover/press sinks the
   extrusion when hoverPush is on. */

const DEFAULTS = {
  text: "Elevate",
  layers: 34,
  depth: 2.4,
  tilt: 7.5,
  smoothing: 0.14,
  perspective: 900,
  orbitSpeed: 0.35,
  hoverPush: 0,
  depthColor: "#7c3aed",
  gradientDepth: false,
  pointerTracking: true,
  autoOrbit: true,
  float: false,
  shadow: true,
  outline: false,
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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 300, color: "#fafafa" }}>
            <DepthText
              key={String(opts.intro)}
              text={opts.text}
              layers={opts.layers}
              depth={opts.depth}
              tilt={opts.tilt}
              smoothing={opts.smoothing}
              perspective={opts.perspective}
              orbitSpeed={opts.orbitSpeed}
              hoverPush={opts.hoverPush}
              depthColor={opts.depthColor}
              gradientDepth={opts.gradientDepth}
              pointerTracking={opts.pointerTracking}
              autoOrbit={opts.autoOrbit}
              float={opts.float}
              shadow={opts.shadow}
              outline={opts.outline}
              intro={opts.intro}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./depth-text-preview.html">
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
          <Color label="深度颜色" value={opts.depthColor} onChange={(depthColor) => set({ depthColor })} />
          <Slider label="层数" value={opts.layers} min={2} max={64} step={1} format={(v) => String(v)} onChange={(layers) => set({ layers })} />
          <Slider label="层深" value={opts.depth} min={0} max={12} step={0.1} format={(v) => `${v.toFixed(1)}px`} onChange={(depth) => set({ depth })} />
          <Slider label="倾角" value={opts.tilt} min={0} max={12} step={0.5} format={(v) => `${v.toFixed(1)}°`} onChange={(tilt) => set({ tilt })} />
          <Slider label="追随" value={opts.smoothing} min={0.02} max={0.35} step={0.01} format={(v) => v.toFixed(2)} onChange={(smoothing) => set({ smoothing })} />
          <Slider label="透视" value={opts.perspective} min={300} max={2000} step={20} format={(v) => `${v}px`} onChange={(perspective) => set({ perspective })} />
          <Slider label="漂移转速" value={opts.orbitSpeed} min={0} max={2} step={0.05} format={(v) => `${v.toFixed(2)} 圈/s`} onChange={(orbitSpeed) => set({ orbitSpeed })} />
          <Slider label="悬停压入" value={opts.hoverPush} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(hoverPush) => set({ hoverPush })} />
          <ControlRow label="渐变消隐">
            <Switch checked={opts.gradientDepth} onChange={(gradientDepth) => set({ gradientDepth })} label="渐变消隐" />
          </ControlRow>
          <ControlRow label="指针转向">
            <Switch checked={opts.pointerTracking} onChange={(pointerTracking) => set({ pointerTracking })} label="指针转向" />
          </ControlRow>
          <ControlRow label="自动漂移">
            <Switch checked={opts.autoOrbit} onChange={(autoOrbit) => set({ autoOrbit })} label="自动漂移" />
          </ControlRow>
          <ControlRow label="漂浮">
            <Switch checked={opts.float} onChange={(float) => set({ float })} label="漂浮" />
          </ControlRow>
          <ControlRow label="阴影">
            <Switch checked={opts.shadow} onChange={(shadow) => set({ shadow })} label="阴影" />
          </ControlRow>
          <ControlRow label="描边">
            <Switch checked={opts.outline} onChange={(outline) => set({ outline })} label="描边" />
          </ControlRow>
          <ControlRow label="入场生长">
            <Switch checked={opts.intro} onChange={(intro) => set({ intro })} label="入场生长" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the default purple extrusion, intro off so the card stays
   settled. */
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
          color: "#fafafa",
        }}
      >
        <DepthText text="Elevate" intro={false} fontSize="clamp(2rem, 6vw, 3.4rem)" />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
