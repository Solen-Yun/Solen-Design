import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { BoundingBoxResize } from "../../src/components/bounding-box-resize/BoundingBoxResize.tsx";

/* The box and its handles carry the interaction; only the motion
   preference is exposed here. */
function ControlRow({ label, children }) {
  return (
    <div className="control">
      <span className="control-label">{label}</span>
      {children}
    </div>
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
  const [reducedMotion, setReducedMotion] = useState(false);
  const reset = () => setReducedMotion(false);

  return (
    <>
      <div className="demo-stage" style={{ background: "#f4f4f4", colorScheme: "light" }}>
        <DemoFit>

          <BoundingBoxResize options={{ reducedMotion }} />
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./bounding-box-resize-preview.html">
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
          <ControlRow label="减少动态">
            <Switch checked={reducedMotion} onChange={setReducedMotion} label="减少动态" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the box at its natural 1200×600 board. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <BoundingBoxResize options={{ reducedMotion: true }} />
    </div>
  );
}


export { Demo, CardPreview };
