import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { AsciiSharks } from "../../src/components/ascii-sharks/AsciiSharks.tsx";

/* The demo plus a live customize panel — every control is a real option. */

/* The engine defaults: seed 7, auto fish count, speed 1. */
const DEFAULTS = {
  seed: 7,
  fishCount: 0,
  speed: 1,
  theme: "light",
  paused: false,
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

/* The engine cycles shark kinds; a count of 0 keeps the default four. */
const SHARK_KINDS = ["hammerhead", "classic", "zebra", "tiger", "greathammer", "mako", "thresher", "nurse"];

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const [sharkCount, setSharkCount] = useState(0);
  const [showComposer, setShowComposer] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => {
    setOpts(DEFAULTS);
    setSharkCount(0);
    setShowComposer(true);
    setReducedMotion(false);
  };

  return (
    <>
      <div className="demo-stage" style={{ background: "#0b0b0f", colorScheme: "dark" }}>
        <DemoFit>

          {/* The ocean fills the stage; the composer is centered, so the
              crop shows the input over the swimming characters. */}
          <AsciiSharks
            options={{
              ...opts,
              fishCount: opts.fishCount || undefined,
              sharks: sharkCount ? SHARK_KINDS.slice(0, sharkCount).map((kind) => ({ kind })) : undefined,
              showComposer,
              reducedMotion,
            }}
          />
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./ascii-sharks-preview.html">
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
          <Slider label="模拟种子" value={opts.seed} min={0} max={99} step={1} format={(v) => String(v)} onChange={(seed) => set({ seed })} />
          <Slider label="小鱼数量" value={opts.fishCount} min={0} max={340} step={5} format={(v) => (v ? String(v) : "自动")} onChange={(fishCount) => set({ fishCount })} />
          <Slider label="模拟速度" value={opts.speed} min={0.25} max={2} step={0.05} format={(v) => `${v.toFixed(2)}×`} onChange={(speed) => set({ speed })} />
          <ControlRow label="深色主题">
            <Switch checked={opts.theme === "dark"} onChange={(dark) => set({ theme: dark ? "dark" : "light" })} label="深色主题" />
          </ControlRow>
          <ControlRow label="暂停海洋">
            <Switch checked={opts.paused} onChange={(paused) => set({ paused })} label="暂停海洋" />
          </ControlRow>
          <Slider label="鲨鱼数量" value={sharkCount} min={0} max={8} step={1} format={(v) => (v ? `${v} 条` : "默认")} onChange={setSharkCount} />
          <ControlRow label="显示输入框">
            <Switch checked={showComposer} onChange={setShowComposer} label="显示输入框" />
          </ControlRow>
          <ControlRow label="减少动态">
            <Switch checked={reducedMotion} onChange={setReducedMotion} label="减少动态" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the composer is the identity of this piece; the crop
   centers on it with sharks and fish swimming behind. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <AsciiSharks options={{ reducedMotion: true }} />
    </div>
  );
}


export { Demo, CardPreview };
