import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as CurvedInput } from "../../src/components/curved-input/CurvedInput.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Type into the curve; the caret, text and button all follow the arc. */

const DEFAULTS = {
  theme: "dark",
  bend: 28,
  width: 450,
  height: 64,
  fontSize: 16,
  placeholder: "Enter your email",
  buttonText: "Get Started",
  showButton: true,
  showIcon: true,
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

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);

  return (
    <>
      <div className="demo-stage" style={{ background: opts.theme === "dark" ? "#141118" : "#eef0f4", colorScheme: opts.theme }}>
        <DemoFit>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 220 }}>
            <CurvedInput
              theme={opts.theme}
              bend={opts.bend}
              width={opts.width}
              height={opts.height}
              fontSize={opts.fontSize}
              placeholder={opts.placeholder}
              buttonText={opts.buttonText}
              showButton={opts.showButton}
              showIcon={opts.showIcon}
              onSubmit={(value) => console.log("submit", value)}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./curved-input-preview.html">
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
          <ControlRow label="主题">
            <div className="view-tabs">
              {[["dark", "深色"], ["light", "浅色"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.theme === id ? "active" : ""} onClick={() => set({ theme: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="弯曲矢高" value={opts.bend} min={-60} max={60} step={2} format={(v) => `${v}px`} onChange={(bend) => set({ bend })} />
          <Slider label="条宽" value={opts.width} min={320} max={640} step={10} format={(v) => `${v}px`} onChange={(width) => set({ width })} />
          <Slider label="厚度" value={opts.height} min={48} max={90} step={2} format={(v) => `${v}px`} onChange={(height) => set({ height })} />
          <Slider label="字号" value={opts.fontSize} min={12} max={22} step={1} format={(v) => `${v}px`} onChange={(fontSize) => set({ fontSize })} />
          <ControlRow label="提交按钮">
            <Switch checked={opts.showButton} onChange={(showButton) => set({ showButton })} label="提交按钮" />
          </ControlRow>
          <ControlRow label="图标块">
            <Switch checked={opts.showIcon} onChange={(showIcon) => set({ showIcon })} label="图标块" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the dark bar arching on a dark stage. */
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
          background: "#141118",
        }}
      >
        <CurvedInput theme="dark" bend={28} width={380} placeholder="Enter your email" buttonText="Get Started" />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
