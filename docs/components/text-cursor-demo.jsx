import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as TextCursor } from "../../src/components/text-cursor/TextCursor.jsx";

/* The demo hands the trail a full box to play in — sweep the pointer (or
   finger) across the stage. Ribbon bends the word along the path; stop
   moving and the eraser eats the trail from the tail. */

const TEXTS = ["Hello", "HELLO", "🌊"];

const DEFAULTS = {
  text: TEXTS[0],
  mode: "stamp",
  spacing: 88,
  maxPoints: 7,
  followMouseDirection: true,
  randomFloat: true,
  exitDuration: 0.5,
  removalInterval: 30,
  shrink: 0.5,
  fade: 0.6,
  smoothing: 0.3,
  popIn: true,
  keepUpright: true,
  hideCursor: false,
  fontSize: 28,
  fontWeight: 600,
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
          <div
            style={{
              width: "min(680px, 92vw)",
              height: 260,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#e4e4e7",
              border: "1px dashed #3f3f46",
              borderRadius: 12,
            }}
          >
            <TextCursor
              text={opts.text}
              mode={opts.mode}
              spacing={opts.spacing}
              maxPoints={opts.maxPoints}
              followMouseDirection={opts.followMouseDirection}
              randomFloat={opts.randomFloat}
              exitDuration={opts.exitDuration}
              removalInterval={opts.removalInterval}
              shrink={opts.shrink}
              fade={opts.fade}
              smoothing={opts.smoothing}
              popIn={opts.popIn}
              keepUpright={opts.keepUpright}
              hideCursor={opts.hideCursor}
              fontSize={opts.fontSize}
              fontWeight={opts.fontWeight}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./text-cursor-preview.html">
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
          <ControlRow label="文字">
            <div className="view-tabs">
              {TEXTS.map((label) => (
                <button key={label} type="button" className={opts.text === label ? "active" : ""} onClick={() => set({ text: label })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="模式">
            <div className="view-tabs">
              {[["stamp", "盖章"], ["chain", "链条"], ["ribbon", "丝带"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.mode === id ? "active" : ""} onClick={() => set({ mode: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="间距" value={opts.spacing} min={20} max={200} step={2} format={(v) => `${v}px`} onChange={(spacing) => set({ spacing })} />
          <Slider label="存活数" value={opts.maxPoints} min={1} max={20} step={1} format={(v) => String(v)} onChange={(maxPoints) => set({ maxPoints })} />
          <Slider label="消散时长" value={opts.exitDuration} min={0.1} max={1.5} step={0.05} format={(v) => `${v.toFixed(2)}s`} onChange={(exitDuration) => set({ exitDuration })} />
          <Slider label="橡皮擦速度" value={opts.removalInterval} min={5} max={120} step={5} format={(v) => `${v}ms`} onChange={(removalInterval) => set({ removalInterval })} />
          <Slider label="尾端收缩" value={opts.shrink} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(shrink) => set({ shrink })} />
          <Slider label="尾端淡出" value={opts.fade} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(fade) => set({ fade })} />
          <Slider label="跟随迟滞" value={opts.smoothing} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(smoothing) => set({ smoothing })} />
          <Slider label="字号" value={opts.fontSize} min={14} max={64} step={2} format={(v) => `${v}px`} onChange={(fontSize) => set({ fontSize })} />
          <Slider label="字重" value={opts.fontWeight} min={100} max={900} step={100} format={(v) => String(v)} onChange={(fontWeight) => set({ fontWeight })} />
          <ControlRow label="随向旋转">
            <Switch checked={opts.followMouseDirection} onChange={(followMouseDirection) => set({ followMouseDirection })} label="随向旋转" />
          </ControlRow>
          <ControlRow label="漂浮">
            <Switch checked={opts.randomFloat} onChange={(randomFloat) => set({ randomFloat })} label="漂浮" />
          </ControlRow>
          <ControlRow label="弹入">
            <Switch checked={opts.popIn} onChange={(popIn) => set({ popIn })} label="弹入" />
          </ControlRow>
          <ControlRow label="保持直立">
            <Switch checked={opts.keepUpright} onChange={(keepUpright) => set({ keepUpright })} label="保持直立" />
          </ControlRow>
          <ControlRow label="隐藏光标">
            <Switch checked={opts.hideCursor} onChange={(hideCursor) => set({ hideCursor })} label="隐藏光标" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the ribbon mid-bend on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div
        style={{
          width: "100%",
          height: 170,
          position: "relative",
          background: "#101014",
          color: "#e4e4e7",
        }}
      >
        <TextCursor text="HELLO" mode="ribbon" spacing={18} fontSize={26} fade={0.5} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
