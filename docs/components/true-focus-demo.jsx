import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as TrueFocus } from "../../src/components/true-focus/TrueFocus.jsx";

/* The demo cycles the sentence on the light stage. Switch to manual mode
   and hover words directly, or change focusStyle to compare the four
   viewfinder shapes while the loop keeps running. */

const SENTENCES = ["True Focus", "保持 专注", "Focus follows the words"];

const DEFAULTS = {
  sentence: SENTENCES[0],
  focusStyle: "brackets",
  order: "sequential",
  easing: "smooth",
  manualMode: false,
  blurAmount: 5,
  focusScale: 1,
  animationDuration: 0.5,
  pauseBetweenAnimations: 1,
  cornerSize: 16,
  borderWidth: 3,
  unfocusedOpacity: 1,
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
      <div className="demo-stage" style={{ background: "#ffffff", colorScheme: "light" }}>
        <DemoFit>
          <div
            style={{
              width: "min(680px, 92vw)",
              margin: "0 auto",
              padding: "40px 0",
              display: "flex",
              justifyContent: "center",
              color: "#18181b",
            }}
          >
            <TrueFocus
              key={opts.sentence}
              sentence={opts.sentence}
              focusStyle={opts.focusStyle}
              order={opts.order}
              easing={opts.easing}
              manualMode={opts.manualMode}
              blurAmount={opts.blurAmount}
              focusScale={opts.focusScale}
              animationDuration={opts.animationDuration}
              pauseBetweenAnimations={opts.pauseBetweenAnimations}
              cornerSize={opts.cornerSize}
              borderWidth={opts.borderWidth}
              unfocusedOpacity={opts.unfocusedOpacity}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./true-focus-preview.html">
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
          <ControlRow label="句子">
            <div className="view-tabs">
              {SENTENCES.map((label) => (
                <button key={label} type="button" className={opts.sentence === label ? "active" : ""} onClick={() => set({ sentence: label })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="取景框">
            <div className="view-tabs">
              {[["brackets", "括号"], ["box", "整框"], ["underline", "下划线"], ["highlight", "高亮"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.focusStyle === id ? "active" : ""} onClick={() => set({ focusStyle: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="顺序">
            <div className="view-tabs">
              {[["sequential", "顺序"], ["random", "随机"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.order === id ? "active" : ""} onClick={() => set({ order: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="手感">
            <div className="view-tabs">
              {[["smooth", "平滑"], ["spring", "弹簧"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.easing === id ? "active" : ""} onClick={() => set({ easing: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="失焦模糊" value={opts.blurAmount} min={0} max={12} step={1} format={(v) => `${v}px`} onChange={(blurAmount) => set({ blurAmount })} />
          <Slider label="对焦放大" value={opts.focusScale} min={1} max={1.8} step={0.05} format={(v) => `×${v.toFixed(2)}`} onChange={(focusScale) => set({ focusScale })} />
          <Slider label="过渡时长" value={opts.animationDuration} min={0.1} max={1.5} step={0.05} format={(v) => `${v.toFixed(2)}s`} onChange={(animationDuration) => set({ animationDuration })} />
          <Slider label="停留时间" value={opts.pauseBetweenAnimations} min={0.2} max={3} step={0.1} format={(v) => `${v.toFixed(1)}s`} onChange={(pauseBetweenAnimations) => set({ pauseBetweenAnimations })} />
          <Slider label="角块尺寸" value={opts.cornerSize} min={8} max={32} step={1} format={(v) => `${v}px`} onChange={(cornerSize) => set({ cornerSize })} />
          <Slider label="线宽" value={opts.borderWidth} min={1} max={8} step={1} format={(v) => `${v}px`} onChange={(borderWidth) => set({ borderWidth })} />
          <Slider label="失焦透明度" value={opts.unfocusedOpacity} min={0.1} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(unfocusedOpacity) => set({ unfocusedOpacity })} />
          <ControlRow label="手动对焦">
            <Switch checked={opts.manualMode} onChange={(manualMode) => set({ manualMode })} label="手动对焦" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the brackets mid-travel on the light stage. */
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
          background: "#ffffff",
          colorScheme: "light",
          color: "#18181b",
        }}
      >
        <TrueFocus sentence="True Focus" blurAmount={6} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
