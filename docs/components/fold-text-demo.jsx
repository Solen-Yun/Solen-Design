import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as FoldText } from "../../src/components/fold-text/FoldText.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Loop mode shows the fold-back; hoverRefold re-creases pieces under the
   pointer, which is the interaction worth feeling. */

const DEFAULTS = {
  text: "Design unfolds",
  splitBy: "char",
  hinge: "top",
  foldStyle: "paper",
  duration: 0.65,
  stagger: 0.045,
  foldAngle: 92,
  creaseShading: 0.55,
  perspective: 700,
  trigger: "mount",
  loopDelay: 1.4,
  hoverRefold: false,
  refoldRadius: 140,
  refoldAngle: 45,
  fontSize: 80,
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

function TextField({ label, value, onChange }) {
  return (
    <ControlRow label={label}>
      <input type="text" value={value} onChange={(event) => onChange(event.target.value)} aria-label={label} />
    </ControlRow>
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: 300,
              color: "#27272a",
            }}
          >
            <FoldText {...opts} />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./fold-text-preview.html">
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
          <TextField label="文字" value={opts.text} onChange={(text) => set({ text })} />
          <ControlRow label="折叠单位">
            <div className="view-tabs">
              {[["char", "字符"], ["word", "单词"], ["line", "整行"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.splitBy === id ? "active" : ""} onClick={() => set({ splitBy: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="铰链">
            <div className="view-tabs">
              {[["top", "上"], ["bottom", "下"], ["left", "左"], ["right", "右"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.hinge === id ? "active" : ""} onClick={() => set({ hinge: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="折法">
            <div className="view-tabs">
              {[["paper", "纸面"], ["blinds", "百叶"], ["flip", "翻面"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.foldStyle === id ? "active" : ""} onClick={() => set({ foldStyle: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="触发">
            <div className="view-tabs">
              {[["mount", "挂载"], ["hover", "悬停"], ["scroll", "滚动"], ["loop", "循环"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.trigger === id ? "active" : ""} onClick={() => set({ trigger: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="展开时长" value={opts.duration} min={0.2} max={2} step={0.05} format={(v) => `${v.toFixed(2)}s`} onChange={(duration) => set({ duration })} />
          <Slider label="错峰间隔" value={opts.stagger} min={0} max={0.2} step={0.005} format={(v) => `${v.toFixed(3)}s`} onChange={(stagger) => set({ stagger })} />
          <Slider label="折叠角" value={opts.foldAngle} min={0} max={180} step={2} format={(v) => `${v}°`} onChange={(foldAngle) => set({ foldAngle })} />
          <Slider label="折痕阴影" value={opts.creaseShading} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(creaseShading) => set({ creaseShading })} />
          <Slider label="透视距离" value={opts.perspective} min={200} max={1600} step={20} format={(v) => `${v}px`} onChange={(perspective) => set({ perspective })} />
          <Slider label="字号" value={opts.fontSize} min={30} max={140} step={2} format={(v) => `${v}px`} onChange={(fontSize) => set({ fontSize })} />
          <Slider label="循环停顿" value={opts.loopDelay} min={0.4} max={3} step={0.1} format={(v) => `${v.toFixed(1)}s`} onChange={(loopDelay) => set({ loopDelay })} />
          <ControlRow label="悬停重折">
            <Switch checked={opts.hoverRefold} onChange={(hoverRefold) => set({ hoverRefold })} label="悬停重折" />
          </ControlRow>
          <Slider label="重折半径" value={opts.refoldRadius} min={40} max={300} step={10} format={(v) => `${v}px`} onChange={(refoldRadius) => set({ refoldRadius })} />
          <Slider label="重折角度" value={opts.refoldAngle} min={0} max={120} step={5} format={(v) => `${v}°`} onChange={(refoldAngle) => set({ refoldAngle })} />
        </div>
      </div>
    </>
  );
}

/* Gallery card — a paper-fold headline resting flat at card scale. */
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
          color: "#f4f4f5",
        }}
      >
        <FoldText text="Design unfolds" hinge="top" foldStyle="paper" fontSize={44} color="#f4f4f5" />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
