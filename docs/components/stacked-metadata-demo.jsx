import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { StackedMetadata } from "../../src/components/stacked-metadata/StackedMetadata.tsx";

/* The demo plus a live customize panel — every control is a real option. */

/* The option defaults mirror the engine defaults. */
const DEFAULTS = {
  heading: "In Progress",
  theme: "dark",
  expanded: -1,
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

function TextField({ label, value, onChange }) {
  return (
    <ControlRow label={label}>
      <input
        type="text"
        className="control-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={label}
      />
    </ControlRow>
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

/* A second row set for the items option, matching the engine's row schema. */
const SAMPLE_ITEMS = [
  { title: "Onboarding Revamp", priority: "High", date: "May 9", assignee: "Iris" },
  { title: "Billing Migration", priority: "Medium", date: "May 21", assignee: "Rae", team: true },
  { title: "Search Relevance Tuning", priority: "Medium", date: "Jun 3", assignee: "Noah" },
  { title: "Mobile Crash Triage", priority: "High", date: "Jun 17", assignee: "Ada", team: true },
];

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const [sampleItems, setSampleItems] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => {
    setOpts(DEFAULTS);
    setSampleItems(false);
    setReducedMotion(false);
  };

  return (
    <>
      <div className="demo-stage" style={{ background: "#0b0b0f", colorScheme: "dark" }}>
        <DemoFit>

          <StackedMetadata options={{ ...opts, items: sampleItems ? SAMPLE_ITEMS : undefined, reducedMotion }} />
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./stacked-metadata-preview.html">
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
          <TextField label="小节标题" value={opts.heading} onChange={(heading) => set({ heading })} />
          <ControlRow label="浅色主题">
            <Switch checked={opts.theme === "light"} onChange={(light) => set({ theme: light ? "light" : "dark" })} label="浅色主题" />
          </ControlRow>
          <Slider label="固定展开行" value={opts.expanded} min={-1} max={2} step={1} format={(v) => (v < 0 ? "收起" : `第 ${v + 1} 行`)} onChange={(expanded) => set({ expanded })} />
          <ControlRow label="使用示例数据">
            <Switch checked={sampleItems} onChange={setSampleItems} label="使用示例数据" />
          </ControlRow>
          <ControlRow label="减少动态">
            <Switch checked={reducedMotion} onChange={setReducedMotion} label="减少动态" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — hover and press still work inside the card. The scene
   centers its content in a 600px canvas by default, so the card crop
   (aspect-ratio 720/540, top-aligned) would show only the empty top;
   a small height keeps the heading and rows inside the crop. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <StackedMetadata options={{ reducedMotion: true, height: 280 }} />
    </div>
  );
}


export { Demo, CardPreview };
