import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as FuseButton } from "../../src/components/fuse-button/FuseButton.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Hover the armed button to pause the fuse; Escape undoes from the keyboard. */

const DEFAULTS = {
  size: "md",
  fuse: "outline",
  commitOn: "press",
  settle: "reset",
  pauseOnHover: true,
  disabled: false,
  undoWindow: 4000,
  fuseThickness: 1.5,
  crossfadeMs: 200,
  radius: 22,
  color: "#f5f5f5",
  background: "#27272a",
  fuseColor: "#f5a524",
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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 180 }}>
            <FuseButton
              size={opts.size}
              fuse={opts.fuse}
              commitOn={opts.commitOn}
              settle={opts.settle}
              pauseOnHover={opts.pauseOnHover}
              disabled={opts.disabled}
              undoWindow={opts.undoWindow}
              fuseThickness={opts.fuseThickness}
              crossfadeMs={opts.crossfadeMs}
              radius={opts.radius}
              color={opts.color}
              background={opts.background}
              fuseColor={opts.fuseColor}
              onCommit={(reason) => console.log("commit:", reason)}
              onUndo={() => console.log("undo")}
              onFuseEnd={() => console.log("fuse end")}
              onPhaseChange={(phase) => console.log("phase:", phase)}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./fuse-button-preview.html">
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
          <ControlRow label="尺寸">
            <div className="view-tabs">
              {[["sm", "小"], ["md", "中"], ["lg", "大"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.size === id ? "active" : ""} onClick={() => set({ size: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="引信样式">
            <div className="view-tabs">
              {[["outline", "外圈"], ["top", "顶边"], ["bottom", "底边"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.fuse === id ? "active" : ""} onClick={() => set({ fuse: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="提交时机">
            <div className="view-tabs">
              {[["press", "按下"], ["fuseEnd", "烧尽"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.commitOn === id ? "active" : ""} onClick={() => set({ commitOn: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="烧尽后">
            <div className="view-tabs">
              {[["reset", "回待机"], ["stay", "停在完成"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.settle === id ? "active" : ""} onClick={() => set({ settle: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="撤销窗口" value={opts.undoWindow} min={1500} max={10000} step={250} format={(v) => `${v}ms`} onChange={(undoWindow) => set({ undoWindow })} />
          <Slider label="引信粗细" value={opts.fuseThickness} min={1} max={4} step={0.5} format={(v) => `${v}px`} onChange={(fuseThickness) => set({ fuseThickness })} />
          <Slider label="切换时长" value={opts.crossfadeMs} min={60} max={400} step={10} format={(v) => `${v}ms`} onChange={(crossfadeMs) => set({ crossfadeMs })} />
          <Slider label="圆角" value={opts.radius} min={8} max={26} step={1} format={(v) => `${v}px`} onChange={(radius) => set({ radius })} />
          <Color label="墨色" value={opts.color} onChange={(color) => set({ color })} />
          <Color label="底色" value={opts.background} onChange={(background) => set({ background })} />
          <Color label="引信色" value={opts.fuseColor} onChange={(fuseColor) => set({ fuseColor })} />
          <ControlRow label="悬停暂停">
            <Switch checked={opts.pauseOnHover} onChange={(pauseOnHover) => set({ pauseOnHover })} label="悬停暂停" />
          </ControlRow>
          <ControlRow label="禁用">
            <Switch checked={opts.disabled} onChange={(disabled) => set({ disabled })} label="禁用" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the armed button mid-fuse on a dark stage. */
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
        <FuseButton undoWindow={6000} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
