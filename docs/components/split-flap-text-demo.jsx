import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as SplitFlapText } from "../../src/components/split-flap-text/SplitFlapText.jsx";

/* The demo keeps the departure board on a dark stage. Timing props feed the
   engine live; switching the phrase set restarts the cycle from phrase 0,
   which is the quickest way to watch the cascade order change. */

const WORD_SETS = [
  ["LAUNCH READY", "SYNC ONLINE", "SIGNAL LIVE"],
  ["GATE A12", "BOARDING", "FINAL CALL", "DEPARTED"],
  ["SOL 03:47", "WIND 12KT", "QNH 1013", "RWY 27L"],
];

const DEFAULTS = {
  words: WORD_SETS[0],
  charset: "alphanumeric",
  order: "left",
  align: "left",
  tileStyle: "board",
  flipDuration: 0.12,
  stagger: 0.06,
  cycleDelay: 2400,
  flipsPerChar: 8,
  fontSize: 52,
  gap: 6,
  padTo: 12,
  depth: 0.5,
  glare: 0,
  tileColor: "#111827",
  textColor: "#f8fafc",
  loop: true,
  intro: true,
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: 220,
              color: "#e4e4e7",
            }}
          >
            <SplitFlapText
              words={opts.words}
              charset={opts.charset}
              order={opts.order}
              align={opts.align}
              tileStyle={opts.tileStyle}
              flipDuration={opts.flipDuration}
              stagger={opts.stagger}
              cycleDelay={opts.cycleDelay}
              flipsPerChar={opts.flipsPerChar}
              fontSize={opts.fontSize}
              gap={opts.gap}
              padTo={opts.padTo}
              depth={opts.depth}
              glare={opts.glare}
              tileColor={opts.tileColor}
              textColor={opts.textColor}
              loop={opts.loop}
              intro={opts.intro}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./split-flap-text-preview.html">
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
          <ControlRow label="文案">
            <div className="view-tabs">
              {WORD_SETS.map((label, i) => (
                <button key={i} type="button" className={opts.words === WORD_SETS[i] ? "active" : ""} onClick={() => set({ words: WORD_SETS[i] })}>
                  {`航班 ${i + 1}`}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="字符池">
            <div className="view-tabs">
              {[["alphanumeric", "字母+数字"], ["alpha", "字母"], ["numeric", "数字"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.charset === id ? "active" : ""} onClick={() => set({ charset: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="级联方向">
            <div className="view-tabs">
              {[["left", "左→右"], ["right", "右→左"], ["center", "中间"], ["random", "乱序"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.order === id ? "active" : ""} onClick={() => set({ order: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="对齐">
            <div className="view-tabs">
              {[["left", "左"], ["right", "右"], ["center", "中"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.align === id ? "active" : ""} onClick={() => set({ align: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="风格">
            <div className="view-tabs">
              {[["board", "机箱"], ["minimal", "扁平"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.tileStyle === id ? "active" : ""} onClick={() => set({ tileStyle: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="翻牌时长" value={opts.flipDuration} min={0.04} max={0.5} step={0.02} format={(v) => `${v.toFixed(2)}s`} onChange={(flipDuration) => set({ flipDuration })} />
          <Slider label="级联延迟" value={opts.stagger} min={0} max={0.2} step={0.01} format={(v) => `${v.toFixed(2)}s`} onChange={(stagger) => set({ stagger })} />
          <Slider label="停留时间" value={opts.cycleDelay} min={800} max={6000} step={100} format={(v) => `${v}ms`} onChange={(cycleDelay) => set({ cycleDelay })} />
          <Slider label="翻面次数" value={opts.flipsPerChar} min={0} max={20} step={1} format={(v) => String(v)} onChange={(flipsPerChar) => set({ flipsPerChar })} />
          <Slider label="字号" value={opts.fontSize} min={28} max={96} step={2} format={(v) => `${v}px`} onChange={(fontSize) => set({ fontSize })} />
          <Slider label="牌间距" value={opts.gap} min={0} max={16} step={1} format={(v) => `${v}px`} onChange={(gap) => set({ gap })} />
          <Slider label="牌板张数" value={opts.padTo} min={6} max={24} step={1} format={(v) => String(v)} onChange={(padTo) => set({ padTo })} />
          <Slider label="材质厚度" value={opts.depth} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(depth) => set({ depth })} />
          <Slider label="镜面高光" value={opts.glare} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(glare) => set({ glare })} />
          <Color label="牌身颜色" value={opts.tileColor} onChange={(tileColor) => set({ tileColor })} />
          <Color label="字符颜色" value={opts.textColor} onChange={(textColor) => set({ textColor })} />
          <ControlRow label="循环">
            <Switch checked={opts.loop} onChange={(loop) => set({ loop })} label="循环" />
          </ControlRow>
          <ControlRow label="空白开场">
            <Switch checked={opts.intro} onChange={(intro) => set({ intro })} label="空白开场" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the classic dark cabinet mid-cycle on the dark stage. */
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
        <SplitFlapText words={WORD_SETS[1]} order="left" fontSize={40} padTo={11} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
