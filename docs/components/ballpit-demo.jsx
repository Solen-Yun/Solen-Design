import { useState } from "react";
import { DemoFit } from "../demo-fit";
import Ballpit from "../../src/components/ballpit/Ballpit.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Drag shoves balls, press-and-drag grabs one, a quick click bursts. */

const DEFAULTS = {
  count: 200,
  material: "satin",
  minSize: 0.5,
  maxSize: 1,
  gravity: 0.5,
  bounce: 0.85,
  depth: 2,
  cursorSize: 1,
  lightIntensity: 1,
  shadows: 0.6,
  colors: ["#ffd93d", "#ff6b6b", "#4d96ff", "#6bd98b"],
  followCursor: true,
  grab: true,
};

const MATERIALS = [
  ["satin", "缎面"],
  ["matte", "哑光"],
  ["gloss", "亮面"],
  ["frosted", "磨砂"],
  ["metal", "金属"],
];

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
          <div style={{ width: "100%", height: 340, position: "relative" }}>
            <Ballpit
              count={opts.count}
              colors={opts.colors}
              material={opts.material}
              minSize={opts.minSize}
              maxSize={opts.maxSize}
              gravity={opts.gravity}
              bounce={opts.bounce}
              depth={opts.depth}
              cursorSize={opts.cursorSize}
              lightIntensity={opts.lightIntensity}
              shadows={opts.shadows}
              followCursor={opts.followCursor}
              grab={opts.grab}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./ballpit-preview.html">
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
          <Slider label="球数" value={opts.count} min={20} max={1500} step={20} format={(v) => String(v)} onChange={(count) => set({ count })} />
          <Tabs label="材质" value={opts.material} options={MATERIALS} onChange={(material) => set({ material })} />
          <Slider label="最小半径" value={opts.minSize} min={0.1} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(minSize) => set({ minSize })} />
          <Slider label="最大半径" value={opts.maxSize} min={0.3} max={1.6} step={0.05} format={(v) => v.toFixed(2)} onChange={(maxSize) => set({ maxSize })} />
          <Slider label="重力" value={opts.gravity} min={0} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(gravity) => set({ gravity })} />
          <Slider label="弹性" value={opts.bounce} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(bounce) => set({ bounce })} />
          <Slider label="深度" value={opts.depth} min={0} max={5} step={0.5} format={(v) => String(v)} onChange={(depth) => set({ depth })} />
          <Slider label="光标球" value={opts.cursorSize} min={0} max={2.5} step={0.1} format={(v) => (v ? v.toFixed(1) : "隐藏")} onChange={(cursorSize) => set({ cursorSize })} />
          <Slider label="光功率" value={opts.lightIntensity} min={0} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(lightIntensity) => set({ lightIntensity })} />
          <Slider label="接触阴影" value={opts.shadows} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(shadows) => set({ shadows })} />
          <ControlRow label="光标推球">
            <Switch checked={opts.followCursor} onChange={(followCursor) => set({ followCursor })} label="光标推球" />
          </ControlRow>
          <ControlRow label="抓取投掷">
            <Switch checked={opts.grab} onChange={(grab) => set({ grab })} label="抓取投掷" />
          </ControlRow>
          <ControlRow label="四色球">
            <Switch
              checked={opts.colors.length > 1}
              onChange={(multi) => set({ colors: multi ? DEFAULTS.colors : ["#ffffff"] })}
              label="四色球"
            />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — a small candy pit resting in the card. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 220, position: "relative", background: "#101014" }}>
        <Ballpit
          count={120}
          colors={["#ffd93d", "#ff6b6b", "#4d96ff", "#6bd98b"]}
          gravity={0.5}
        />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
