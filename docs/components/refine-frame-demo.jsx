import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as RefineFrame } from "../../src/components/refine-frame/RefineFrame.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Step the status through the stages and watch the mosaic resolve. */

const IMG = "./assets/wallpaper-04.jpg";

const DEFAULTS = {
  status: "generating",
  sweep: true,
  showStatus: true,
  stageDuration: 400,
  width: 320,
  radius: 16,
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
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 320, color: "#f5f5f5" }}>
            <RefineFrame
              status={opts.status}
              sweep={opts.sweep}
              showStatus={opts.showStatus}
              stageDuration={opts.stageDuration}
              width={opts.width}
              radius={opts.radius}
              onRetry={() => console.log("retry")}
            >
              <img src={IMG} alt="生成中的城市夜景" />
            </RefineFrame>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./refine-frame-preview.html">
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
          <ControlRow label="阶段">
            <div className="view-tabs">
              {[["queued", "排队"], ["generating", "生成"], ["refining", "精修"], ["complete", "完成"], ["error", "失败"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.status === id ? "active" : undefined} onClick={() => set({ status: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="框宽" value={opts.width} min={240} max={420} step={20} format={(v) => `${v}px`} onChange={(width) => set({ width })} />
          <Slider label="圆角" value={opts.radius} min={0} max={28} step={2} format={(v) => `${v}px`} onChange={(radius) => set({ radius })} />
          <Slider label="阶段时长" value={opts.stageDuration} min={150} max={1000} step={50} format={(v) => `${v}ms`} onChange={(stageDuration) => set({ stageDuration })} />
          <ControlRow label="扫光">
            <Switch checked={opts.sweep} onChange={(sweep) => set({ sweep })} label="扫光" />
          </ControlRow>
          <ControlRow label="状态胶囊">
            <Switch checked={opts.showStatus} onChange={(showStatus) => set({ showStatus })} label="状态胶囊" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the frame mid-resolution on a dark stage. */
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
          background: "#101014",
          color: "#f5f5f5",
        }}
      >
        <RefineFrame status="refining" width={280} aspectRatio="16 / 10" sweep showStatus={false}>
          <img src={IMG} alt="生成中的城市夜景" />
        </RefineFrame>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
