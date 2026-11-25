import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as TextPressure } from "../../src/components/text-pressure/TextPressure.jsx";

/* The demo hands the headline a full-width box; the font size derives from
   the box width. Move the pointer across the letters, click for ripples,
   then switch idle to wave/pulse and move away to watch it breathe. */

const TEXTS = ["Compressa", "VARIABLE", "指压变形"];

const DEFAULTS = {
  text: TEXTS[0],
  width: true,
  weight: true,
  italic: true,
  alpha: false,
  flex: true,
  stroke: false,
  scale: false,
  idle: "none",
  idleSpeed: 1,
  clickRipple: true,
  radius: 0.5,
  smoothing: 0.5,
  strokeWidth: 3,
  strokeColor: "#FF0000",
  minFontSize: 24,
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
              width: "min(680px, 92vw)",
              height: 220,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              color: "#f4f4f5",
            }}
          >
            <TextPressure
              text={opts.text}
              width={opts.width}
              weight={opts.weight}
              italic={opts.italic}
              alpha={opts.alpha}
              flex={opts.flex}
              stroke={opts.stroke}
              scale={opts.scale}
              idle={opts.idle}
              idleSpeed={opts.idleSpeed}
              clickRipple={opts.clickRipple}
              radius={opts.radius}
              smoothing={opts.smoothing}
              strokeWidth={opts.strokeWidth}
              strokeColor={opts.strokeColor}
              minFontSize={opts.minFontSize}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./text-pressure-preview.html">
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
          <ControlRow label="待机动画">
            <div className="view-tabs">
              {[["none", "无"], ["wave", "波浪"], ["pulse", "脉搏"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.idle === id ? "active" : ""} onClick={() => set({ idle: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="宽度轴">
            <Switch checked={opts.width} onChange={(width) => set({ width })} label="宽度轴" />
          </ControlRow>
          <ControlRow label="字重轴">
            <Switch checked={opts.weight} onChange={(weight) => set({ weight })} label="字重轴" />
          </ControlRow>
          <ControlRow label="斜体轴">
            <Switch checked={opts.italic} onChange={(italic) => set({ italic })} label="斜体轴" />
          </ControlRow>
          <ControlRow label="透明度">
            <Switch checked={opts.alpha} onChange={(alpha) => set({ alpha })} label="透明度" />
          </ControlRow>
          <ControlRow label="撑满整行">
            <Switch checked={opts.flex} onChange={(flex) => set({ flex })} label="撑满整行" />
          </ControlRow>
          <ControlRow label="描边投影">
            <Switch checked={opts.stroke} onChange={(stroke) => set({ stroke })} label="描边投影" />
          </ControlRow>
          <ControlRow label="纵向拉伸">
            <Switch checked={opts.scale} onChange={(scale) => set({ scale })} label="纵向拉伸" />
          </ControlRow>
          <ControlRow label="点击涟漪">
            <Switch checked={opts.clickRipple} onChange={(clickRipple) => set({ clickRipple })} label="点击涟漪" />
          </ControlRow>
          <Slider label="作用半径" value={opts.radius} min={0.1} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(radius) => set({ radius })} />
          <Slider label="跟随迟滞" value={opts.smoothing} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(smoothing) => set({ smoothing })} />
          <Slider label="待机速度" value={opts.idleSpeed} min={0.2} max={3} step={0.1} format={(v) => `×${v.toFixed(1)}`} onChange={(idleSpeed) => set({ idleSpeed })} />
          <Slider label="描边宽度" value={opts.strokeWidth} min={1} max={8} step={0.5} format={(v) => `${v}px`} onChange={(strokeWidth) => set({ strokeWidth })} />
          <Slider label="字号下限" value={opts.minFontSize} min={16} max={64} step={2} format={(v) => `${v}px`} onChange={(minFontSize) => set({ minFontSize })} />
          <Color label="描边颜色" value={opts.strokeColor} onChange={(strokeColor) => set({ strokeColor })} />
        </div>
      </div>
    </>
  );
}

/* Gallery card — the stroke echo on, letters mid-press on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div
        style={{
          width: "100%",
          height: 170,
          display: "flex",
          alignItems: "center",
          background: "#101014",
          color: "#f4f4f5",
        }}
      >
        <TextPressure text="Compressa" idle="pulse" idleSpeed={1.2} stroke strokeColor="#FF0000" strokeWidth={2} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
