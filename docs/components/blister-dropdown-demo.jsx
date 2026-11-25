import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { BlisterDropdown } from "../../src/components/blister-dropdown/BlisterDropdown.tsx";

/* Demo controls mirror the API surface: the two behaviour switches, a
   synced value selector, a counts override and the scene height. */
const VALUES = ["all", "open", "closed"];

const DEFAULTS = {
  autoClose: true,
  sound: true,
};

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
  const [value, setValue] = useState("all");
  const [customCounts, setCustomCounts] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => {
    setOpts(DEFAULTS);
    setValue("all");
    setCustomCounts(false);
    setReducedMotion(false);
  };

  return (
    <>
      <div className="demo-stage" style={{ background: "#ffffff", colorScheme: "light" }}>
        <DemoFit>

          <BlisterDropdown
            options={{
              ...opts,
              value,
              counts: customCounts ? { all: 12, open: 5, closed: 7 } : undefined,
              onValueChange: setValue,
              reducedMotion,
            }}
          />
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./blister-dropdown-preview.html">
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
          <ControlRow label="选择后自动收起">
            <Switch checked={opts.autoClose} onChange={(autoClose) => set({ autoClose })} label="选择后自动收起" />
          </ControlRow>
          <ControlRow label="合成音效">
            <Switch checked={opts.sound} onChange={(sound) => set({ sound })} label="合成音效" />
          </ControlRow>
          <Slider label="选中值" value={VALUES.indexOf(value)} min={0} max={2} step={1} format={(v) => VALUES[v]} onChange={(v) => setValue(VALUES[v])} />
          <ControlRow label="覆盖行计数">
            <Switch checked={customCounts} onChange={setCustomCounts} label="覆盖行计数" />
          </ControlRow>
          <ControlRow label="减少动态">
            <Switch checked={reducedMotion} onChange={setReducedMotion} label="减少动态" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the component at its natural 560px scene size. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <BlisterDropdown options={{ reducedMotion: true }} />
    </div>
  );
}


export { Demo, CardPreview };
