import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as PromptBar } from "../../src/components/prompt-bar/PromptBar.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Type "@" and "/" in the field to open the two menus; drag the effort
   slider to Max to see the sparks. */

const DEFAULTS = {
  busy: false,
  width: 400,
  radius: 16,
  maxRows: 5,
  morphDuration: 240,
  squash: 0.12,
  tilt: 8,
  sparkColor: "#b39dff",
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
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", width: "100%", height: 320, padding: 40, color: "#f5f5f5" }}>
            <PromptBar
              busy={opts.busy}
              width={opts.width}
              radius={opts.radius}
              maxRows={opts.maxRows}
              morphDuration={opts.morphDuration}
              squash={opts.squash}
              tilt={opts.tilt}
              sparkColor={opts.sparkColor}
              defaultEffort="Max"
              onSend={(text, meta) => console.log(text, meta)}
              onStop={() => console.log("stop")}
              onAttach={() => "Q3-report.pdf"}
              onDictate={() => Promise.resolve("这是听写到的文本")}
              onEffortChange={(level) => console.log(level)}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./prompt-bar-preview.html">
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
          <ControlRow label="生成中">
            <Switch checked={opts.busy} onChange={(busy) => set({ busy })} label="生成中" />
          </ControlRow>
          <Color label="火花色" value={opts.sparkColor} onChange={(sparkColor) => set({ sparkColor })} />
          <Slider label="宽度" value={opts.width} min={320} max={520} step={20} format={(v) => `${v}px`} onChange={(width) => set({ width })} />
          <Slider label="圆角" value={opts.radius} min={8} max={24} step={2} format={(v) => `${v}px`} onChange={(radius) => set({ radius })} />
          <Slider label="最大行数" value={opts.maxRows} min={2} max={8} step={1} format={(v) => String(v)} onChange={(maxRows) => set({ maxRows })} />
          <Slider label="形变时长" value={opts.morphDuration} min={120} max={500} step={20} format={(v) => `${v}ms`} onChange={(morphDuration) => set({ morphDuration })} />
          <Slider label="果冻挤压" value={opts.squash} min={0} max={0.3} step={0.02} format={(v) => v.toFixed(2)} onChange={(squash) => set({ squash })} />
          <Slider label="形变倾斜" value={opts.tilt} min={0} max={20} step={1} format={(v) => `${v}°`} onChange={(tilt) => set({ tilt })} />
        </div>
      </div>
    </>
  );
}

/* Gallery card — the composer resting on a dark stage at max effort. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          width: "100%",
          height: 170,
          padding: 20,
          background: "#101014",
          color: "#f5f5f5",
        }}
      >
        <PromptBar width={360} defaultEffort="Max" />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
