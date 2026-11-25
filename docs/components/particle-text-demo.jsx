import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as ParticleText } from "../../src/components/particle-text/ParticleText.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Click to burst, drag the pointer through the glyphs, and switch the four
   intro choreographies; the dark stage keeps the glow readable. */

const DEFAULTS = {
  text: "Solen",
  particleSize: 2,
  density: 4,
  highlightColor: "#ff5a36",
  highlightMode: "motion",
  shape: "circle",
  intro: "gather",
  scatter: 180,
  gatherDuration: 1600,
  stagger: 420,
  clickBurst: true,
  burstStrength: 1,
  pointerRepel: 40,
  repelRadius: 120,
  idleDrift: 0.7,
  trigger: "mount",
  glow: true,
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

function TextField({ label, value, onChange }) {
  return (
    <ControlRow label={label}>
      <input type="text" value={value} onChange={(event) => onChange(event.target.value)} aria-label={label} />
    </ControlRow>
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
  const [picked, setPicked] = useState({});
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => {
    setOpts(DEFAULTS);
    setPicked({});
  };

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ width: "100%", height: 380, color: "#f4f4f5" }}>
            <ParticleText
              {...opts}
              color={picked.color ?? "#f4f4f5"}
              highlightColor={picked.highlightColor ?? opts.highlightColor}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./particle-text-preview.html">
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
          <TextField label="文字" value={opts.text} onChange={(text) => set({ text })} />
          <ControlRow label="入场方式">
            <div className="view-tabs">
              {[["gather", "汇聚"], ["rain", "雨点"], ["spiral", "螺旋"], ["scan", "扫描"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.intro === id ? "active" : ""} onClick={() => set({ intro: id, trigger: "mount" })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="粒子形状">
            <div className="view-tabs">
              {[["circle", "圆点"], ["square", "方块"], ["line", "线段"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.shape === id ? "active" : ""} onClick={() => set({ shape: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="发热模式">
            <div className="view-tabs">
              {[["motion", "运动"], ["gradient", "渐变"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.highlightMode === id ? "active" : ""} onClick={() => set({ highlightMode: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="重播方式">
            <div className="view-tabs">
              {[["mount", "无"], ["hover", "悬停"], ["click", "点击"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.trigger === id ? "active" : ""} onClick={() => set({ trigger: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="粒子尺寸" value={opts.particleSize} min={1} max={6} step={0.5} format={(v) => `${v.toFixed(1)}px`} onChange={(particleSize) => set({ particleSize })} />
          <Slider label="密度步长" value={opts.density} min={2} max={10} step={1} format={(v) => `${v}px`} onChange={(density) => set({ density })} />
          <Slider label="散布距离" value={opts.scatter} min={0} max={400} step={10} format={(v) => `${v}px`} onChange={(scatter) => set({ scatter })} />
          <Slider label="入场时长" value={opts.gatherDuration} min={400} max={4000} step={100} format={(v) => `${v}ms`} onChange={(gatherDuration) => set({ gatherDuration })} />
          <Slider label="延迟幅度" value={opts.stagger} min={0} max={1500} step={20} format={(v) => `${v}ms`} onChange={(stagger) => set({ stagger })} />
          <Slider label="爆炸力度" value={opts.burstStrength} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(burstStrength) => set({ burstStrength })} />
          <Slider label="指针推力" value={opts.pointerRepel} min={0} max={120} step={2} format={(v) => `${v}px`} onChange={(pointerRepel) => set({ pointerRepel })} />
          <Slider label="排斥半径" value={opts.repelRadius} min={40} max={300} step={10} format={(v) => `${v}px`} onChange={(repelRadius) => set({ repelRadius })} />
          <Slider label="空闲漂移" value={opts.idleDrift} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(idleDrift) => set({ idleDrift })} />
          <Color label="粒子颜色" value={picked.color ?? "#f4f4f5"} onChange={(color) => setPicked((prev) => ({ ...prev, color }))} />
          <Color label="高亮色" value={picked.highlightColor ?? opts.highlightColor} onChange={(highlightColor) => setPicked((prev) => ({ ...prev, highlightColor }))} />
          <ControlRow label="点击爆炸">
            <Switch checked={opts.clickBurst} onChange={(clickBurst) => set({ clickBurst })} label="点击爆炸" />
          </ControlRow>
          <ControlRow label="辉光">
            <Switch checked={opts.glow} onChange={(glow) => set({ glow })} label="辉光" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the assembled wordmark breathing on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ width: "100%", height: 240, color: "#f4f4f5", background: "#101014" }}>
        <ParticleText text="Solen" particleSize={2} density={5} intro="gather" idleDrift={0.5} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
