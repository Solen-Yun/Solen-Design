import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as CometDial } from "../../src/components/comet-dial/CometDial.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Flick hard to stretch the comet; momentum decides how far it glides. */

const DEFAULTS = {
  accent: "#f5f5f5",
  size: 250,
  sweep: 320,
  thickness: 5,
  speed: 25,
  tapBounce: 0.2,
  flickBounce: 0.1,
  momentum: 1,
  cometReach: 180,
  cometWidth: 12,
  disabled: false,
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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 300 }}>
            <CometDial
              defaultValue={62}
              accent={opts.accent}
              size={opts.size}
              sweep={opts.sweep}
              thickness={opts.thickness}
              speed={opts.speed}
              tapBounce={opts.tapBounce}
              flickBounce={opts.flickBounce}
              momentum={opts.momentum}
              cometReach={opts.cometReach}
              cometWidth={opts.cometWidth}
              disabled={opts.disabled}
              onChange={(value) => console.log(value)}
              onChangeEnd={(value, detail) => console.log(value, detail)}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./comet-dial-preview.html">
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
          <Color label="强调色" value={opts.accent} onChange={(accent) => set({ accent })} />
          <Slider label="直径" value={opts.size} min={180} max={340} step={10} format={(v) => `${v}px`} onChange={(size) => set({ size })} />
          <Slider label="弧角" value={opts.sweep} min={180} max={359} step={1} format={(v) => `${v}°`} onChange={(sweep) => set({ sweep })} />
          <Slider label="描边" value={opts.thickness} min={3} max={10} step={1} format={(v) => String(v)} onChange={(thickness) => set({ thickness })} />
          <Slider label="弹簧刚度" value={opts.speed} min={0} max={100} step={1} format={(v) => String(v)} onChange={(speed) => set({ speed })} />
          <Slider label="动量" value={opts.momentum} min={0} max={3} step={0.1} format={(v) => `×${v.toFixed(1)}`} onChange={(momentum) => set({ momentum })} />
          <Slider label="彗尾张角" value={opts.cometReach} min={0} max={360} step={10} format={(v) => `${v}°`} onChange={(cometReach) => set({ cometReach })} />
          <Slider label="彗尾宽度" value={opts.cometWidth} min={0} max={26} step={1} format={(v) => String(v)} onChange={(cometWidth) => set({ cometWidth })} />
          <Slider label="轻点回弹" value={opts.tapBounce} min={0} max={0.8} step={0.05} format={(v) => v.toFixed(2)} onChange={(tapBounce) => set({ tapBounce })} />
          <Slider label="甩动回弹" value={opts.flickBounce} min={0} max={0.8} step={0.05} format={(v) => v.toFixed(2)} onChange={(flickBounce) => set({ flickBounce })} />
          <ControlRow label="禁用">
            <Switch checked={opts.disabled} onChange={(disabled) => set({ disabled })} label="禁用" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the dial mid-value on a dark stage. */
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
        <CometDial defaultValue={62} size={190} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
