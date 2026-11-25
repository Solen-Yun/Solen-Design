import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as ScrubField } from "../../src/components/scrub-field/ScrubField.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Drag horizontally to scrub; Shift speeds up, Alt fine-tunes; a click
   without movement lets you type. */

const DEFAULTS = {
  size: "md",
  accent: "#f5f5f5",
  chipColor: "#27272a",
  min: 0,
  max: 100,
  step: 1,
  sensitivity: 2,
  rubberReach: 8,
  showDelta: true,
  showDirty: false,
  showFill: true,
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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 180, color: "#f5f5f5" }}>
            <ScrubField
              label="Radius"
              suffix="px"
              defaultValue={24}
              min={opts.min}
              max={opts.max}
              step={opts.step}
              size={opts.size}
              sensitivity={opts.sensitivity}
              rubberReach={opts.rubberReach}
              showDelta={opts.showDelta}
              showDirty={opts.showDirty}
              showFill={opts.showFill}
              accent={opts.accent}
              chipColor={opts.chipColor}
              onChange={(value) => console.log(value)}
              onCommit={(value) => console.log("commit", value)}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./scrub-field-preview.html">
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
          <ControlRow label="尺寸">
            <div className="view-tabs">
              {[["sm", "小"], ["md", "中"], ["lg", "大"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.size === id ? "active" : ""} onClick={() => set({ size: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Color label="强调色" value={opts.accent} onChange={(accent) => set({ accent })} />
          <Color label="芯片底色" value={opts.chipColor} onChange={(chipColor) => set({ chipColor })} />
          <Slider label="灵敏度" value={opts.sensitivity} min={1} max={6} step={1} format={(v) => `${v}px/步`} onChange={(sensitivity) => set({ sensitivity })} />
          <Slider label="橡皮筋行程" value={opts.rubberReach} min={0} max={30} step={1} format={(v) => `${v}%`} onChange={(rubberReach) => set({ rubberReach })} />
          <Slider label="步长" value={opts.step} min={0.1} max={5} step={0.1} format={(v) => v.toFixed(1)} onChange={(step) => set({ step })} />
          <ControlRow label="增量气泡">
            <Switch checked={opts.showDelta} onChange={(showDelta) => set({ showDelta })} label="增量气泡" />
          </ControlRow>
          <ControlRow label="量程填充">
            <Switch checked={opts.showFill} onChange={(showFill) => set({ showFill })} label="量程填充" />
          </ControlRow>
          <ControlRow label="脏值描边">
            <Switch checked={opts.showDirty} onChange={(showDirty) => set({ showDirty })} label="脏值描边" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the chip mid-scrub on a dark stage. */
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
          color: "#f5f5f5",
        }}
      >
        <ScrubField label="Radius" suffix="px" defaultValue={24} size="md" />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
