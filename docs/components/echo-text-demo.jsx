import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as EchoText } from "../../src/components/echo-text/EchoText.jsx";

/* The demo sits on a dark stage so the tinted ghosts read clearly. Move
   the pointer to drag the trail, click for a burst, switch trail to auto
   and leave it alone, or to scroll and smear the word while scrolling. */

const DEFAULTS = {
  echoes: 12,
  lag: 0.24,
  offset: 36,
  direction: "right",
  fade: 0.72,
  blur: 3,
  tint: "#7dd3fc",
  echoStyle: "solid",
  mode: "both",
  trail: "pointer",
  clickBurst: true,
  duration: 900,
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
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: 240,
              color: "#f4f4f5",
            }}
          >
            <EchoText
              text="残影回声"
              echoes={opts.echoes}
              lag={opts.lag}
              offset={opts.offset}
              direction={opts.direction}
              fade={opts.fade}
              blur={opts.blur}
              tint={opts.tint}
              echoStyle={opts.echoStyle}
              mode={opts.mode}
              trail={opts.trail}
              clickBurst={opts.clickBurst}
              duration={opts.duration}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./echo-text-preview.html">
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
          <Color label="残影色" value={opts.tint} onChange={(tint) => set({ tint })} />
          <Tabs
            label="方向"
            value={opts.direction}
            options={[["right", "右"], ["left", "左"], ["up", "上"], ["down", "下"], ["diagonal", "斜角"]]}
            onChange={(direction) => set({ direction })}
          />
          <Tabs
            label="拖尾驱动"
            value={opts.trail}
            options={[["pointer", "指针"], ["auto", "漂移"], ["scroll", "滚动"]]}
            onChange={(trail) => set({ trail })}
          />
          <Tabs
            label="阶段"
            value={opts.mode}
            options={[["entrance", "只入场"], ["pointer", "只跟随"], ["both", "两者"]]}
            onChange={(mode) => set({ mode })}
          />
          <Tabs
            label="残影样式"
            value={opts.echoStyle}
            options={[["solid", "实心"], ["outline", "描边"]]}
            onChange={(echoStyle) => set({ echoStyle })}
          />
          <Slider label="残影层数" value={opts.echoes} min={0} max={24} step={1} format={(v) => String(v)} onChange={(echoes) => set({ echoes })} />
          <Slider label="拖后程度" value={opts.lag} min={0.02} max={0.5} step={0.02} format={(v) => v.toFixed(2)} onChange={(lag) => set({ lag })} />
          <Slider label="拖尾距离" value={opts.offset} min={0} max={120} step={2} format={(v) => `${v}px`} onChange={(offset) => set({ offset })} />
          <Slider label="透明衰减" value={opts.fade} min={0.1} max={0.95} step={0.05} format={(v) => v.toFixed(2)} onChange={(fade) => set({ fade })} />
          <Slider label="模糊" value={opts.blur} min={0} max={16} step={1} format={(v) => `${v}px`} onChange={(blur) => set({ blur })} />
          <Slider label="入场时长" value={opts.duration} min={200} max={2000} step={50} format={(v) => `${v}ms`} onChange={(duration) => set({ duration })} />
          <ControlRow label="点击爆裂">
            <Switch checked={opts.clickBurst} onChange={(clickBurst) => set({ clickBurst })} label="点击爆裂" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — a diagonal outline smear frozen mid-entrance. */
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
          color: "#f4f4f5",
        }}
      >
        <EchoText text="回声" echoes={10} offset={26} direction="diagonal" echoStyle="outline" tint="#f0abfc" mode="entrance" duration={1600} fontSize="4rem" />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
