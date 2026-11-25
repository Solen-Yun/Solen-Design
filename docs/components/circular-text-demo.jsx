import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as CircularText } from "../../src/components/circular-text/CircularText.jsx";

/* The demo centers one ring on a light stage. Hover reacts by default
   (speedUp); enabling drag lets you grab the ring and fling it, which is
   the signature move. */

const PRESETS = ["Solen Design • Solen Design • ", "探索 · 体验 · 创作 · 分享 · ", "SCROLL ↓ EXPLORE ↓ "];

const DEFAULTS = {
  text: PRESETS[0],
  spinDuration: 20,
  onHover: "speedUp",
  direction: "clockwise",
  size: 220,
  fontSize: 22,
  fontWeight: 900,
  letterSpacing: 0,
  fill: true,
  repeat: 1,
  ring: false,
  tilt: 0,
  hoverTilt: 0,
  draggable: false,
  color: "#18181b",
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
      <div className="demo-stage" style={{ background: "#ffffff", colorScheme: "light" }}>
        <DemoFit>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 300 }}>
            <CircularText
              text={opts.text}
              spinDuration={opts.spinDuration}
              onHover={opts.onHover}
              direction={opts.direction}
              size={opts.size}
              fontSize={opts.fontSize}
              fontWeight={opts.fontWeight}
              letterSpacing={opts.letterSpacing}
              fill={opts.fill}
              repeat={opts.repeat}
              ring={opts.ring}
              tilt={opts.tilt}
              hoverTilt={opts.hoverTilt}
              draggable={opts.draggable}
              color={opts.color}
            >
              <span style={{ fontSize: Math.round(opts.size * 0.16) }} aria-hidden="true">✦</span>
            </CircularText>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./circular-text-preview.html">
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
          <Color label="文字颜色" value={opts.color} onChange={(color) => set({ color })} />
          <Tabs
            label="悬停反应"
            options={[["slowDown", "减速"], ["speedUp", "加速"], ["pause", "暂停"], ["goBonkers", "疯狂"]]}
            value={opts.onHover}
            onChange={(onHover) => set({ onHover })}
          />
          <Tabs label="方向" options={[["clockwise", "顺时针"], ["counterclockwise", "逆时针"]]} value={opts.direction} onChange={(direction) => set({ direction })} />
          <Slider label="一圈时长" value={opts.spinDuration} min={1} max={60} step={1} format={(v) => `${v}s`} onChange={(spinDuration) => set({ spinDuration })} />
          <Slider label="直径" value={opts.size} min={140} max={320} step={2} format={(v) => `${v}px`} onChange={(size) => set({ size })} />
          <Slider label="字号" value={opts.fontSize} min={12} max={40} step={1} format={(v) => `${v}px`} onChange={(fontSize) => set({ fontSize })} />
          <Slider label="字重" value={opts.fontWeight} min={100} max={900} step={100} format={(v) => String(v)} onChange={(fontWeight) => set({ fontWeight })} />
          <Slider label="字距" value={opts.letterSpacing} min={-2} max={10} step={0.5} format={(v) => String(v)} onChange={(letterSpacing) => set({ letterSpacing })} />
          <Slider label="重复份数" value={opts.repeat} min={1} max={4} step={1} format={(v) => `${v} 份`} onChange={(repeat) => set({ repeat })} />
          <Slider label="静态倾角" value={opts.tilt} min={0} max={75} step={1} format={(v) => `${v}°`} onChange={(tilt) => set({ tilt })} />
          <Slider label="指针倾斜" value={opts.hoverTilt} min={0} max={20} step={1} format={(v) => `${v}°`} onChange={(hoverTilt) => set({ hoverTilt })} />
          <ControlRow label="均分布满">
            <Switch checked={opts.fill} onChange={(fill) => set({ fill })} label="均分布满" />
          </ControlRow>
          <ControlRow label="圆环描边">
            <Switch checked={opts.ring} onChange={(ring) => set({ ring })} label="圆环描边" />
          </ControlRow>
          <ControlRow label="可拖拽">
            <Switch checked={opts.draggable} onChange={(draggable) => set({ draggable })} label="可拖拽" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the ring mid-spin with the outline on. */
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
        }}
      >
        <CircularText text="Solen Design • Solen Design • " size={150} fontSize={17} spinDuration={14} ring={true} color="#18181b" />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
