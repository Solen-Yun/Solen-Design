import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as RotatingText } from "../../src/components/rotating-text/RotatingText.jsx";

/* The demo rotates a phrase list with live knobs for the five presets,
   the stagger ripple and the highlight marker — switch the marker on and
   watch its width spring between phrases of different lengths. */

const TEXTS = ["设计更快的界面", "Solen Design", "每个字都会翻转", "动效即语言"];

const DEFAULTS = {
  effect: "slide",
  direction: "up",
  highlight: false,
  highlightColor: "#a855f7",
  rotationInterval: 2000,
  staggerDuration: 0,
  staggerFrom: "first",
  pauseOnHover: false,
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

function Tabs({ label, value, options, onChange }) {
  return (
    <ControlRow label={label}>
      <div className="view-tabs">
        {options.map(([id, name]) => (
          <button key={id} type="button" className={value === id ? "active" : ""} onClick={() => onChange(id)}>
            {name}
          </button>
        ))}
      </div>
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
              height: 200,
              fontSize: 40,
              fontWeight: 800,
              color: "#18181b",
            }}
          >
            <RotatingText
              texts={TEXTS}
              effect={opts.effect}
              direction={opts.direction}
              highlight={opts.highlight}
              highlightColor={opts.highlightColor}
              rotationInterval={opts.rotationInterval}
              staggerDuration={opts.staggerDuration}
              staggerFrom={opts.staggerFrom}
              pauseOnHover={opts.pauseOnHover}
              onNext={(index) => console.log(index, TEXTS[index])}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./rotating-text-preview.html">
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
          <Tabs
            label="预设"
            value={opts.effect}
            options={[["slide", "滑入"], ["flip", "翻转"], ["blur", "模糊"], ["scale", "缩放"], ["drop", "坠落"]]}
            onChange={(effect) => set({ effect })}
          />
          <Tabs
            label="方向"
            value={opts.direction}
            options={[["up", "向上"], ["down", "向下"]]}
            onChange={(direction) => set({ direction })}
          />
          <Tabs
            label="错峰起点"
            value={opts.staggerFrom}
            options={[["first", "首端"], ["last", "尾端"], ["center", "中心"], ["random", "随机"]]}
            onChange={(staggerFrom) => set({ staggerFrom })}
          />
          <Slider label="错峰间隔" value={opts.staggerDuration} min={0} max={0.15} step={0.01} format={(v) => `${v.toFixed(2)}s`} onChange={(staggerDuration) => set({ staggerDuration })} />
          <Slider label="停留时长" value={opts.rotationInterval} min={800} max={4000} step={100} format={(v) => `${v}ms`} onChange={(rotationInterval) => set({ rotationInterval })} />
          <Color label="记号笔色" value={opts.highlightColor} onChange={(highlightColor) => set({ highlightColor })} />
          <ControlRow label="记号笔样式">
            <Switch checked={opts.highlight} onChange={(highlight) => set({ highlight })} label="记号笔样式" />
          </ControlRow>
          <ControlRow label="悬停暂停">
            <Switch checked={opts.pauseOnHover} onChange={(pauseOnHover) => set({ pauseOnHover })} label="悬停暂停" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the flip preset inside a violet highlight marker on the
   dark stage, so the marker and the 3D cards both read at card size. */
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
          fontSize: 30,
          fontWeight: 800,
        }}
      >
        <RotatingText
          texts={["更快", "更轻", "更准"]}
          effect="flip"
          highlight
          highlightColor="#a855f7"
          rotationInterval={1800}
        />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
