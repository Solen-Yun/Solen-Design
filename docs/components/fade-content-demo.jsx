import { useState } from "react";
import { DemoFit } from "../demo-fit";
import FadeContent from "../../src/components/fade-content/FadeContent.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The wrapper runs on mount here; replay remounts it to re-watch the reveal. */

const TILES = [
  { label: "曙光", background: "linear-gradient(160deg, #fbbf24, #f97316 55%, #be185d)" },
  { label: "深海", background: "linear-gradient(160deg, #38bdf8, #1d4ed8 60%, #172554)" },
  { label: "苔原", background: "linear-gradient(160deg, #a3e635, #15803d 60%, #052e16)" },
];

const DEFAULTS = {
  effect: "fade",
  blur: 0,
  duration: 1,
  initialOpacity: 0,
  stagger: 0,
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

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const [run, setRun] = useState(0);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);

  return (
    <>
      <div className="demo-stage" style={{ background: "#ffffff", colorScheme: "light" }}>
        <DemoFit>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 240 }}>
            <FadeContent key={run} trigger="mount" ease="power2.out" {...opts}>
              {TILES.map((tile) => (
                <div
                  key={tile.label}
                  style={{
                    width: 108,
                    height: 140,
                    borderRadius: 14,
                    background: tile.background,
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    paddingBottom: 12,
                    fontSize: 13,
                    letterSpacing: "0.08em",
                    textShadow: "0 1px 4px rgba(0,0,0,0.25)",
                  }}
                >
                  {tile.label}
                </div>
              ))}
            </FadeContent>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./fade-content-preview.html">
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
          <ControlRow label="重播">
            <div className="view-tabs">
              <button type="button" onClick={() => setRun((r) => r + 1)}>重播揭示</button>
            </div>
          </ControlRow>
          <ControlRow label="揭示方式">
            <div className="view-tabs">
              {[["fade", "淡入"], ["focus", "对焦"], ["develop", "显影"], ["dissolve", "溶解"], ["mist", "雾化"], ["pixel", "像素"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.effect === id ? "active" : ""} onClick={() => set({ effect: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="额外模糊" value={opts.blur} min={0} max={24} step={1} format={(v) => (v ? `${v}px` : "关")} onChange={(blur) => set({ blur })} />
          <Slider label="时长" value={opts.duration} min={0.2} max={2.5} step={0.05} format={(v) => `${v.toFixed(2)}s`} onChange={(duration) => set({ duration })} />
          <Slider label="起始透明度" value={opts.initialOpacity} min={0} max={0.8} step={0.05} format={(v) => v.toFixed(2)} onChange={(initialOpacity) => set({ initialOpacity })} />
          <Slider label="子项间隔" value={opts.stagger} min={0} max={0.3} step={0.01} format={(v) => `${v.toFixed(2)}s`} onChange={(stagger) => set({ stagger })} />
        </div>
      </div>
    </>
  );
}

/* Gallery card — the tiles caught mid-develop on mount. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 170, background: "#ffffff" }}>
        <FadeContent trigger="mount" effect="develop" duration={1.2} stagger={0.14}>
          {TILES.map((tile) => (
            <div
              key={tile.label}
              style={{
                width: 52,
                height: 68,
                borderRadius: 10,
                background: tile.background,
              }}
            />
          ))}
        </FadeContent>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
