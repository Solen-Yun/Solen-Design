import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as DecryptedText } from "../../src/components/decrypted-text/DecryptedText.jsx";

/* The demo sits on a dark stage. "hover" starts revealed — pointing at the
   line re-scrambles and re-resolves it; "view"/"click" start encrypted and
   the interaction decrypts. The heat radius shows the pointer-proximity mode. */

const PRESETS = [
  "ACCESS GRANTED",
  "数据解密完成 · SYSTEM ONLINE",
  "the message was never really hidden",
];

const DEFAULTS = {
  text: PRESETS[0],
  animateOn: "hover",
  effect: "scramble",
  revealDirection: "start",
  sequential: false,
  useOriginalCharsOnly: false,
  clickMode: "once",
  speed: 50,
  maxIterations: 10,
  hoverRadius: 0,
  scrambleColor: "#22d3ee",
  loop: false,
  loopDelay: 2000,
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

function Tabs({ label, options, value, onChange }) {
  return (
    <ControlRow label={label}>
      <div className="view-tabs">
        {options.map(([id, text]) => (
          <button key={id} type="button" className={value === id ? "active" : ""} onClick={() => onChange(id)}>
            {text}
          </button>
        ))}
      </div>
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
              width: "min(680px, 92vw)",
              margin: "0 auto",
              padding: "72px 0",
              color: "#e4e4e7",
              fontSize: 32,
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            <DecryptedText
              key={`${opts.text}-${opts.animateOn}-${opts.effect}`}
              text={opts.text}
              animateOn={opts.animateOn}
              effect={opts.effect}
              revealDirection={opts.revealDirection}
              sequential={opts.sequential}
              useOriginalCharsOnly={opts.useOriginalCharsOnly}
              clickMode={opts.clickMode}
              speed={opts.speed}
              maxIterations={opts.maxIterations}
              hoverRadius={opts.hoverRadius}
              scrambleColor={opts.scrambleColor}
              loop={opts.loop}
              loopDelay={opts.loopDelay}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./decrypted-text-preview.html">
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
              {PRESETS.map((label, i) => (
                <button key={label} type="button" className={opts.text === label ? "active" : ""} onClick={() => set({ text: PRESETS[i] })}>
                  {`文案 ${i + 1}`}
                </button>
              ))}
            </div>
          </ControlRow>
          <Tabs
            label="触发"
            options={[["hover", "悬停"], ["view", "入视口"], ["click", "点击"], ["inViewHover", "视口+悬停"]]}
            value={opts.animateOn}
            onChange={(animateOn) => set({ animateOn })}
          />
          <Tabs
            label="效果"
            options={[["scramble", "乱码"], ["fade", "渐显"], ["flip", "翻面"]]}
            value={opts.effect}
            onChange={(effect) => set({ effect })}
          />
          <Tabs
            label="方向"
            options={[["start", "起点"], ["end", "终点"], ["center", "中心"], ["random", "随机"]]}
            value={opts.revealDirection}
            onChange={(revealDirection) => set({ revealDirection })}
          />
          <Color label="加密着色" value={opts.scrambleColor} onChange={(scrambleColor) => set({ scrambleColor })} />
          <Slider label="节拍" value={opts.speed} min={16} max={200} step={2} format={(v) => `${v}ms`} onChange={(speed) => set({ speed })} />
          <Slider label="噪声拍数" value={opts.maxIterations} min={2} max={30} step={1} format={(v) => String(v)} onChange={(maxIterations) => set({ maxIterations })} />
          <Slider label="热区半径" value={opts.hoverRadius} min={0} max={200} step={5} format={(v) => `${v}px`} onChange={(hoverRadius) => set({ hoverRadius })} />
          <Slider label="循环间隔" value={opts.loopDelay} min={0} max={5000} step={100} format={(v) => `${v}ms`} onChange={(loopDelay) => set({ loopDelay })} />
          <ControlRow label="逐字揭示">
            <Switch checked={opts.sequential} onChange={(sequential) => set({ sequential })} label="逐字揭示" />
          </ControlRow>
          <ControlRow label="只用原文字符">
            <Switch checked={opts.useOriginalCharsOnly} onChange={(useOriginalCharsOnly) => set({ useOriginalCharsOnly })} label="只用原文字符" />
          </ControlRow>
          <ControlRow label="循环">
            <Switch checked={opts.loop} onChange={(loop) => set({ loop })} label="循环" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — cyan-tinted scramble mid-run on the dark stage. */
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
          colorScheme: "dark",
          color: "#e4e4e7",
        }}
      >
        <DecryptedText text="ACCESS GRANTED" animateOn="view" effect="scramble" speed={40} maxIterations={8} scrambleColor="#22d3ee" />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
