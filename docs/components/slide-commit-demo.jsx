import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as SlideCommit } from "../../src/components/slide-commit/SlideCommit.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Drag to the end to confirm; switch the confirm mode to feel the
   pending spinner or the error shake. */

const DEFAULTS = {
  mode: "sync",
  trackColor: "#262626",
  handleColor: "#f5f5f5",
  successColor: "#22c55e",
  width: 280,
  height: 56,
  radius: 28,
  speed: 50,
  returnBounce: 0.38,
  holdMs: 1500,
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
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 200, color: "#f5f5f5" }}>
            <SlideCommit
              label="滑动以支付"
              doneLabel="已支付"
              errorLabel="支付失败"
              trackColor={opts.trackColor}
              handleColor={opts.handleColor}
              successColor={opts.successColor}
              width={opts.width}
              height={opts.height}
              radius={opts.radius}
              speed={opts.speed}
              returnBounce={opts.returnBounce}
              holdMs={opts.holdMs}
              onConfirm={() => {
                if (opts.mode === "error") throw new Error("declined");
                if (opts.mode === "async") return new Promise((resolve) => setTimeout(resolve, 1200));
              }}
              onDone={() => console.log("done")}
              onError={(reason) => console.log(reason)}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./slide-commit-preview.html">
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
          <ControlRow label="确认行为">
            <div className="view-tabs">
              {[["sync", "立即"], ["async", "请求中"], ["error", "失败"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.mode === id ? "active" : ""} onClick={() => set({ mode: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Color label="轨道色" value={opts.trackColor} onChange={(trackColor) => set({ trackColor })} />
          <Color label="把手色" value={opts.handleColor} onChange={(handleColor) => set({ handleColor })} />
          <Color label="成功色" value={opts.successColor} onChange={(successColor) => set({ successColor })} />
          <Slider label="宽度" value={opts.width} min={220} max={360} step={10} format={(v) => `${v}px`} onChange={(width) => set({ width })} />
          <Slider label="高度" value={opts.height} min={44} max={72} step={4} format={(v) => `${v}px`} onChange={(height) => set({ height })} />
          <Slider label="圆角" value={opts.radius} min={4} max={36} step={2} format={(v) => `${v}px`} onChange={(radius) => set({ radius })} />
          <Slider label="弹簧速度" value={opts.speed} min={0} max={100} step={10} format={(v) => String(v)} onChange={(speed) => set({ speed })} />
          <Slider label="回弹" value={opts.returnBounce} min={0} max={0.5} step={0.02} format={(v) => v.toFixed(2)} onChange={(returnBounce) => set({ returnBounce })} />
          <Slider label="停留时长" value={opts.holdMs} min={600} max={3000} step={100} format={(v) => `${v}ms`} onChange={(holdMs) => set({ holdMs })} />
        </div>
      </div>
    </>
  );
}

/* Gallery card — the idle handle resting on a dark stage. */
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
        }}
      >
        <SlideCommit label="Slide to pay" doneLabel="Paid" width={260} height={52} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
