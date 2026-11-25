import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as SlingButton } from "../../src/components/sling-button/SlingButton.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Pull past the arm ring and release to fire; over-pulling boosts the burst. */

const DEFAULTS = {
  size: 72,
  strokeWidth: 3,
  armAt: 48,
  maxPull: 160,
  launchSpeed: 2600,
  recoil: 0.2,
  flight: 120,
  particles: 14,
  spread: 60,
  padColor: "#f5f5f5",
  accentColor: "#f5f5f5",
  wellColor: "#27272a",
  bandColor: "#52525b",
  axis: "any",
  tapSends: true,
  disabled: false,
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
  const [logs, setLogs] = useState(0);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => {
    setOpts(DEFAULTS);
    setLogs(0);
  };

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark", color: "#f5f5f5" }}>
        <DemoFit>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 280, color: "#f5f5f5" }}>
            <SlingButton
              size={opts.size}
              strokeWidth={opts.strokeWidth}
              armAt={opts.armAt}
              maxPull={opts.maxPull}
              launchSpeed={opts.launchSpeed}
              recoil={opts.recoil}
              flight={opts.flight}
              particles={opts.particles}
              spread={opts.spread}
              padColor={opts.padColor}
              accentColor={opts.accentColor}
              wellColor={opts.wellColor}
              bandColor={opts.bandColor}
              axis={opts.axis}
              tapSends={opts.tapSends}
              disabled={opts.disabled}
              onSend={() => setLogs((n) => n + 1)}
            />
            <output style={{ marginLeft: 32, fontSize: 14, opacity: 0.6 }} aria-live="polite">
              已发送 ×{logs}
            </output>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./sling-button-preview.html">
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
          <Slider label="按钮直径" value={opts.size} min={44} max={96} step={2} format={(v) => `${v}px`} onChange={(size) => set({ size })} />
          <Slider label="蓄力距离" value={opts.armAt} min={24} max={120} step={2} format={(v) => `${v}px`} onChange={(armAt) => set({ armAt })} />
          <Slider label="回弹上限" value={opts.maxPull} min={80} max={260} step={10} format={(v) => `${v}px`} onChange={(maxPull) => set({ maxPull })} />
          <Slider label="回弹初速" value={opts.launchSpeed} min={800} max={5000} step={100} format={(v) => String(v)} onChange={(launchSpeed) => set({ launchSpeed })} />
          <Slider label="回跳量" value={opts.recoil} min={0} max={0.8} step={0.05} format={(v) => v.toFixed(2)} onChange={(recoil) => set({ recoil })} />
          <Slider label="粒子数" value={opts.particles} min={0} max={30} step={1} format={(v) => String(v)} onChange={(particles) => set({ particles })} />
          <Slider label="飞行距离" value={opts.flight} min={40} max={260} step={10} format={(v) => `${v}px`} onChange={(flight) => set({ flight })} />
          <Slider label="散开角" value={opts.spread} min={0} max={120} step={5} format={(v) => `${v}°`} onChange={(spread) => set({ spread })} />
          <Color label="垫面色" value={opts.padColor} onChange={(padColor) => set({ padColor })} />
          <Color label="强调色" value={opts.accentColor} onChange={(accentColor) => set({ accentColor })} />
          <ControlRow label="轴锁定">
            <div className="view-tabs">
              {[["any", "自由"], ["horizontal", "横向"], ["vertical", "纵向"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.axis === id ? "active" : ""} onClick={() => set({ axis: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="轻点发送">
            <Switch checked={opts.tapSends} onChange={(tapSends) => set({ tapSends })} label="轻点发送" />
          </ControlRow>
          <ControlRow label="禁用">
            <Switch checked={opts.disabled} onChange={(disabled) => set({ disabled })} label="禁用" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the sling resting on the dark stage. */
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
          color: "#f5f5f5",
        }}
      >
        <SlingButton size={64} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
