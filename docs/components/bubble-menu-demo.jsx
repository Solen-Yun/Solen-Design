import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as BubbleMenu } from "../../src/components/bubble-menu/BubbleMenu.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The overlay is absolutely positioned, so it fills the relative stage. */

const ITEMS = [
  { label: "home", href: "#", ariaLabel: "Home", rotation: -8, hoverStyles: { bgColor: "#3b82f6", textColor: "#ffffff" } },
  { label: "about", href: "#", ariaLabel: "About", rotation: 8, hoverStyles: { bgColor: "#10b981", textColor: "#ffffff" } },
  { label: "projects", href: "#", ariaLabel: "Documentation", rotation: 8, hoverStyles: { bgColor: "#f59e0b", textColor: "#ffffff" } },
  { label: "blog", href: "#", ariaLabel: "Blog", rotation: -8, hoverStyles: { bgColor: "#ef4444", textColor: "#ffffff" } },
  { label: "contact", href: "#", ariaLabel: "Contact", rotation: 8, hoverStyles: { bgColor: "#8b5cf6", textColor: "#ffffff" } },
];

const DEFAULTS = {
  menuBg: "#ffffff",
  menuContentColor: "#111111",
  animationDuration: 0.5,
  staggerDelay: 0.12,
};

function Slider({ label, value, min, max, step, format, onChange }) {
  return (
    <div className="control">
      <span className="control-label">{label}</span>
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
    </div>
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
      <div className="demo-stage" style={{ background: "#eef0f4", colorScheme: "light" }}>
        <DemoFit>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 320,
              overflow: "hidden",
              background:
                "linear-gradient(135deg, #dfe4ec 0%, #eef0f4 45%, #e3e0ee 100%)",
              borderRadius: 16,
            }}
          >
            <BubbleMenu
              logo={
                <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: "-0.02em", color: "#111" }}>
                  ◐ solen
                </span>
              }
              items={ITEMS}
              menuBg={opts.menuBg}
              menuContentColor={opts.menuContentColor}
              animationDuration={opts.animationDuration}
              staggerDelay={opts.staggerDelay}
              onMenuClick={(open) => console.log(open)}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./bubble-menu-preview.html">
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
          <Color label="气泡底色" value={opts.menuBg} onChange={(menuBg) => set({ menuBg })} />
          <Color label="文字颜色" value={opts.menuContentColor} onChange={(menuContentColor) => set({ menuContentColor })} />
          <Slider label="弹入时长" value={opts.animationDuration} min={0.2} max={1.2} step={0.05} format={(v) => `${v.toFixed(2)}s`} onChange={(animationDuration) => set({ animationDuration })} />
          <Slider label="错峰间隔" value={opts.staggerDelay} min={0} max={0.3} step={0.01} format={(v) => `${v.toFixed(2)}s`} onChange={(staggerDelay) => set({ staggerDelay })} />
        </div>
      </div>
    </>
  );
}

/* Gallery card — the closed bar resting on a soft stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 170,
          overflow: "hidden",
          background: "linear-gradient(135deg, #dfe4ec 0%, #eef0f4 45%, #e3e0ee 100%)",
        }}
      >
        <BubbleMenu
          logo={
            <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em", color: "#111" }}>
              ◐ solen
            </span>
          }
          items={ITEMS}
        />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
