import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as TearTicket } from "../../src/components/tear-ticket/TearTicket.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Grab the stub and pull slowly to watch fibres snap one by one; Reset
   restores the intact ticket. */

const DEFAULTS = {
  stubSize: 130,
  holes: 12,
  holeSize: 6,
  notch: 3,
  roughness: 0,
  tearAngle: 30,
  stretch: 30,
  resistance: 0.45,
  orientation: "horizontal",
  tilt: true,
  recenter: true,
  disabled: false,
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
  const [torn, setTorn] = useState(false);
  const [gen, setGen] = useState(0);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => {
    setOpts(DEFAULTS);
    setGen((g) => g + 1);
    setTorn(false);
  };

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ display: "grid", placeItems: "center", width: "100%", height: 300, color: "#f5f5f5", padding: "0 24px" }}>
            <TearTicket
              key={gen}
              torn={torn}
              onTear={() => setTorn(true)}
              stubSize={opts.stubSize}
              holes={opts.holes}
              holeSize={opts.holeSize}
              notch={opts.notch}
              roughness={opts.roughness}
              tearAngle={opts.tearAngle}
              stretch={opts.stretch}
              resistance={opts.resistance}
              orientation={opts.orientation}
              tilt={opts.tilt}
              recenter={opts.recenter}
              disabled={opts.disabled}
              ariaLabel="撕下副券"
              stub={
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                  <span
                    style={{
                      fontSize: 13,
                      letterSpacing: "0.35em",
                      opacity: 0.65,
                      writingMode: opts.orientation === "vertical" ? "horizontal-tb" : "vertical-rl",
                    }}
                  >
                    SOLEN · 副券
                  </span>
                </div>
              }
            >
              <div
                style={{
                  height: "100%",
                  boxSizing: "border-box",
                  padding: "24px 28px",
                  borderRadius: 12,
                  background:
                    "linear-gradient(135deg, #4338ca 0%, #7c3aed 45%, #db2777 100%)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  gap: 6,
                }}
              >
                <strong style={{ fontSize: 22, letterSpacing: "0.04em" }}>SOLEN · LIVE</strong>
                <span style={{ fontSize: 13, opacity: 0.8 }}>2026-11-21 19:30 · 东侧剧场</span>
                <span style={{ fontSize: 13, opacity: 0.8 }}>12 排 7 号 · 凭票入场</span>
              </div>
            </TearTicket>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./tear-ticket-preview.html">
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
          <Slider label="副券宽度" value={opts.stubSize} min={80} max={200} step={5} format={(v) => `${v}px`} onChange={(stubSize) => set({ stubSize })} />
          <Slider label="打孔数" value={opts.holes} min={4} max={24} step={1} format={(v) => String(v)} onChange={(holes) => set({ holes })} />
          <Slider label="孔径" value={opts.holeSize} min={3} max={12} step={1} format={(v) => `${v}px`} onChange={(holeSize) => set({ holeSize })} />
          <Slider label="毛边抖动" value={opts.roughness} min={0} max={6} step={0.5} format={(v) => `${v}px`} onChange={(roughness) => set({ roughness })} />
          <Slider label="翻折上限" value={opts.tearAngle} min={10} max={70} step={5} format={(v) => `${v}°`} onChange={(tearAngle) => set({ tearAngle })} />
          <Slider label="纤维拉伸" value={opts.stretch} min={8} max={70} step={2} format={(v) => `${v}px`} onChange={(stretch) => set({ stretch })} />
          <Slider label="阻尼" value={opts.resistance} min={0} max={0.95} step={0.05} format={(v) => v.toFixed(2)} onChange={(resistance) => set({ resistance })} />
          <ControlRow label="副券方向">
            <div className="view-tabs">
              {[["horizontal", "右侧"], ["vertical", "底部"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.orientation === id ? "active" : ""} onClick={() => set({ orientation: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="悬停倾斜">
            <Switch checked={opts.tilt} onChange={(tilt) => set({ tilt })} label="悬停倾斜" />
          </ControlRow>
          <ControlRow label="撕后补位">
            <Switch checked={opts.recenter} onChange={(recenter) => set({ recenter })} label="撕后补位" />
          </ControlRow>
          <ControlRow label="禁用">
            <Switch checked={opts.disabled} onChange={(disabled) => set({ disabled })} label="禁用" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — an intact ticket resting on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ display: "grid", placeItems: "center", width: "100%", height: 190, background: "#101014", color: "#f5f5f5", overflow: "hidden" }}>
        <TearTicket
          width={380}
          height={170}
          stubSize={110}
          holes={10}
          tilt={false}
          ariaLabel="撕下副券"
          stub={
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
              <span style={{ fontSize: 12, letterSpacing: "0.35em", opacity: 0.65, writingMode: "vertical-rl" }}>SOLEN · 副券</span>
            </div>
          }
        >
          <div
            style={{
              height: "100%",
              boxSizing: "border-box",
              padding: "20px 24px",
              borderRadius: 12,
              background: "linear-gradient(135deg, #4338ca 0%, #7c3aed 45%, #db2777 100%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              gap: 4,
            }}
          >
            <strong style={{ fontSize: 18, letterSpacing: "0.04em" }}>SOLEN · LIVE</strong>
            <span style={{ fontSize: 12, opacity: 0.8 }}>2026-11-21 19:30 · 东侧剧场</span>
          </div>
        </TearTicket>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
