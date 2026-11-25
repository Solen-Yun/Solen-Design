import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { IsoBlockChart } from "../../src/components/iso-block-chart/IsoBlockChart.tsx";

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

  return (
    <>
      <div className="demo-stage">
        <DemoFit>
          <IsoBlockChart options={{ reducedMotion }} />
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./iso-block-chart-preview.html">
          <span aria-hidden="true">⧉</span> 打开完整预览
        </a>
      </div>

      <div className="customize">
        <div className="customize-head">
          <p className="customize-title">自定义</p>
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

/* Gallery card — the component at its natural 340px scene size. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <IsoBlockChart options={{ reducedMotion: true }} />
    </div>
  );
}


export { Demo, CardPreview };
