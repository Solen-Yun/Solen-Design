import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as StrokeText } from "../../src/components/stroke-text/StrokeText.jsx";

/* The demo stages the headline on a dark canvas so the purple outline reads.
   Trigger "scroll" plays once on mount here (the stage is already in view);
   switch to hover/loop to replay the choreography on demand. */

const TEXTS = ["Draw Attention", "描边自绘", "OUTLINE 01"];

const DEFAULTS = {
  text: TEXTS[0],
  strokeStyle: "solid",
  fillMode: "wipe",
  wipeFrom: "left",
  trigger: "mount",
  strokeWidth: 1.4,
  drawDuration: 1.6,
  fillDelay: 0.2,
  stagger: 0.05,
  fontSize: 128,
  strokeColor: "#A78BFA",
  reverse: false,
  marching: false,
  hoverRedraw: false,
  shadow: false,
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
          <div
            style={{
              width: "min(720px, 92vw)",
              margin: "0 auto",
              padding: "56px 0",
              color: "#f4f4f5",
            }}
          >
            <StrokeText
              key={`${opts.text}-${opts.fontSize}-${opts.strokeStyle}`}
              text={opts.text}
              strokeStyle={opts.strokeStyle}
              fillMode={opts.fillMode}
              wipeFrom={opts.wipeFrom}
              trigger={opts.trigger}
              strokeWidth={opts.strokeWidth}
              drawDuration={opts.drawDuration}
              fillDelay={opts.fillDelay}
              stagger={opts.stagger}
              fontSize={opts.fontSize}
              strokeColor={opts.strokeColor}
              reverse={opts.reverse}
              marching={opts.marching}
              hoverRedraw={opts.hoverRedraw}
              shadow={opts.shadow}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./stroke-text-preview.html">
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
          <ControlRow label="触发">
            <div className="view-tabs">
              {[["mount", "挂载"], ["scroll", "入视口"], ["hover", "悬停"], ["loop", "循环"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.trigger === id ? "active" : ""} onClick={() => set({ trigger: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="填充方式">
            <div className="view-tabs">
              {[["wipe", "擦入"], ["fade", "淡入"], ["none", "不填充"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.fillMode === id ? "active" : ""} onClick={() => set({ fillMode: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="擦入方向">
            <div className="view-tabs">
              {[["left", "左"], ["right", "右"], ["top", "上"], ["bottom", "下"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.wipeFrom === id ? "active" : ""} onClick={() => set({ wipeFrom: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="线型">
            <div className="view-tabs">
              {[["solid", "实线"], ["dashed", "虚线"], ["dotted", "点线"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.strokeStyle === id ? "active" : ""} onClick={() => set({ strokeStyle: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="描边粗细" value={opts.strokeWidth} min={0.5} max={6} step={0.1} format={(v) => v.toFixed(1)} onChange={(strokeWidth) => set({ strokeWidth })} />
          <Slider label="描边时长" value={opts.drawDuration} min={0.4} max={4} step={0.1} format={(v) => `${v.toFixed(1)}s`} onChange={(drawDuration) => set({ drawDuration })} />
          <Slider label="填充延迟" value={opts.fillDelay} min={0} max={2} step={0.05} format={(v) => `${v.toFixed(2)}s`} onChange={(fillDelay) => set({ fillDelay })} />
          <Slider label="逐字错峰" value={opts.stagger} min={0} max={0.3} step={0.01} format={(v) => `${v.toFixed(2)}s`} onChange={(stagger) => set({ stagger })} />
          <Slider label="字号" value={opts.fontSize} min={48} max={200} step={4} format={(v) => `${v}px`} onChange={(fontSize) => set({ fontSize })} />
          <Color label="描边颜色" value={opts.strokeColor} onChange={(strokeColor) => set({ strokeColor })} />
          <ControlRow label="反向错峰">
            <Switch checked={opts.reverse} onChange={(reverse) => set({ reverse })} label="反向错峰" />
          </ControlRow>
          <ControlRow label="蚂蚁线">
            <Switch checked={opts.marching} onChange={(marching) => set({ marching })} label="蚂蚁线" />
          </ControlRow>
          <ControlRow label="悬停重描">
            <Switch checked={opts.hoverRedraw} onChange={(hoverRedraw) => set({ hoverRedraw })} label="悬停重描" />
          </ControlRow>
          <ControlRow label="投影">
            <Switch checked={opts.shadow} onChange={(shadow) => set({ shadow })} label="投影" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the wipe mid-flood with the shadow settling on the dark stage. */
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
        <StrokeText text="Draw Attention" fontSize={72} strokeColor="#A78BFA" trigger="loop" shadow />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
