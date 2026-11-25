import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { FoldedEmojiScroll } from "../../src/components/folded-emoji-scroll/FoldedEmojiScroll.tsx";

/* The 1280×960 stage letterboxes itself, so there is no height control.
   foldSize morphs the cylinder fold; query seeds the search field. */
const DEFAULTS = {
  foldSize: 42,
  query: "",
  reducedMotion: false,
};

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
      <input type="text" value={value} onChange={(event) => onChange(event.target.value)} aria-label={label} />
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

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);

  return (
    <>
      <div className="demo-stage" style={{ background: "#0b0b0f", colorScheme: "dark" }}>
        <DemoFit>

          <FoldedEmojiScroll
            options={{
              foldSize: opts.foldSize,
              query: opts.query,
              reducedMotion: opts.reducedMotion,
            }}
          />
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./folded-emoji-scroll-preview.html">
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
          <TextField label="搜索" value={opts.query} onChange={(query) => set({ query })} />
          <Slider label="折边宽度" value={opts.foldSize} min={0} max={72} step={2} format={(v) => `${v}px`} onChange={(foldSize) => set({ foldSize })} />
          <ControlRow label="减少动态">
            <Switch checked={opts.reducedMotion} onChange={(reducedMotion) => set({ reducedMotion })} label="减少动态" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the full picker, scaled into the card frame. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <FoldedEmojiScroll options={{ reducedMotion: true }} />
    </div>
  );
}


export { Demo, CardPreview };
