import { useState } from "react";
import { DemoFit } from "../demo-fit";
import ScrollExpand from "../../src/components/scroll-expand/ScrollExpand.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Scroll inside the frame: it grows to full bleed, holds, then the
   overlay copy rises in. */

const SCENE = `./assets/demo-photos/photo-01.jpg`;

const DEFAULTS = {
  startWidth: 42,
  startHeight: 58,
  startRadius: 24,
  endRadius: 0,
  mediaZoom: 1.35,
  scrollDistance: 1.2,
  holdDistance: 0.35,
  smoothing: 0.1,
  overlayScrim: 0.45,
  enabled: true,
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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 380, color: "#e4e4e7" }}>
            <ScrollExpand
              src={SCENE}
              alt="暮色山景插画"
              title="山与雾"
              scrollHint="向下滚动展开"
              style={{ width: 440, height: 340, borderRadius: 18 }}
              {...opts}
            >
              <strong style={{ fontSize: 24, letterSpacing: "-0.02em" }}>全幅之后</strong>
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", marginTop: 8 }}>覆盖层内容在全幅时浮现</span>
            </ScrollExpand>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./scroll-expand-preview.html">
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
          <Slider label="起始宽" value={opts.startWidth} min={10} max={90} step={2} format={(v) => `${v}%`} onChange={(startWidth) => set({ startWidth })} />
          <Slider label="起始高" value={opts.startHeight} min={20} max={90} step={2} format={(v) => `${v}%`} onChange={(startHeight) => set({ startHeight })} />
          <Slider label="起始圆角" value={opts.startRadius} min={0} max={48} step={2} format={(v) => `${v}px`} onChange={(startRadius) => set({ startRadius })} />
          <Slider label="结束圆角" value={opts.endRadius} min={0} max={48} step={2} format={(v) => `${v}px`} onChange={(endRadius) => set({ endRadius })} />
          <Slider label="媒体缩放" value={opts.mediaZoom} min={1} max={2} step={0.05} format={(v) => `×${v.toFixed(2)}`} onChange={(mediaZoom) => set({ mediaZoom })} />
          <Slider label="展开段" value={opts.scrollDistance} min={0.4} max={2.5} step={0.1} format={(v) => `${v.toFixed(1)} 屏`} onChange={(scrollDistance) => set({ scrollDistance })} />
          <Slider label="保持段" value={opts.holdDistance} min={0} max={1.5} step={0.05} format={(v) => `${v.toFixed(2)} 屏`} onChange={(holdDistance) => set({ holdDistance })} />
          <Slider label="平滑" value={opts.smoothing} min={0} max={0.4} step={0.02} format={(v) => v.toFixed(2)} onChange={(smoothing) => set({ smoothing })} />
          <Slider label="蒙层浓度" value={opts.overlayScrim} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(overlayScrim) => set({ overlayScrim })} />
          <ControlRow label="启用滚动展开">
            <Switch checked={opts.enabled} onChange={(enabled) => set({ enabled })} label="启用滚动展开" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the disabled pose: progress pinned at full bleed with
   the overlay copy shown. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 170, background: "#101014" }}>
        <ScrollExpand
          src={SCENE}
          alt="暮色山景插画"
          enabled={false}
          scrollDistance={0.001}
          holdDistance={0}
          overlayScrim={0.5}
          style={{ width: 260, height: 140, borderRadius: 14 }}
        >
          <strong style={{ fontSize: 17, letterSpacing: "-0.02em", color: "#fff7ed" }}>山与雾</strong>
          <span style={{ fontSize: 12, color: "rgba(255,247,237,0.75)", marginTop: 6 }}>滚动展开成通栏</span>
        </ScrollExpand>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
