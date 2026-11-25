import { useState } from "react";
import { DemoFit } from "../demo-fit";
import StarBorder from "../../src/components/star-border/StarBorder.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Hover the pill to see the lap, click it for twin pulses; reveal mode
   materializes the star right under the cursor. */

const DEFAULTS = {
  theme: "dark",
  color: "#ffffff",
  direction: "clockwise",
  hover: "lap",
  duration: 4,
  thickness: 1,
  radius: 12,
  trailLength: 0.3,
  stars: 1,
  glow: 0.6,
  sparkle: false,
  clickPulse: true,
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
  const dark = opts.theme === "dark";

  return (
    <>
      <div className="demo-stage" style={{ background: dark ? "#101014" : "#f4f4f5", colorScheme: opts.theme }}>
        <DemoFit>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28, width: "100%", height: 320, color: dark ? "#e4e4e7" : "#3f3f46" }}>
            <StarBorder
              theme={opts.theme}
              color={opts.color}
              direction={opts.direction}
              hover={opts.hover}
              duration={opts.duration}
              thickness={opts.thickness}
              radius={opts.radius}
              trailLength={opts.trailLength}
              stars={opts.stars}
              glow={opts.glow}
              sparkle={opts.sparkle}
              clickPulse={opts.clickPulse}
              onClick={() => {}}
            >
              开始探索
            </StarBorder>
            <StarBorder
              as="div"
              theme={opts.theme}
              color={opts.color}
              direction={opts.direction}
              hover={opts.hover}
              duration={opts.duration}
              thickness={opts.thickness}
              radius={20}
              trailLength={opts.trailLength}
              stars={Math.min(6, opts.stars + 2)}
              glow={opts.glow}
              sparkle={true}
              clickPulse={false}
              style={{ padding: "20px 26px", maxWidth: 320, fontSize: 13, lineHeight: 1.7 }}
            >
              星头沿卡片轮廓巡航，同款参数多两颗星、常开星光，用来对比尺寸与圆角的表现。
            </StarBorder>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./star-border-preview.html">
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
          <ControlRow label="深色主题">
            <Switch checked={opts.theme === "dark"} onChange={(darkTheme) => set({ theme: darkTheme ? "dark" : "light" })} label="深色主题" />
          </ControlRow>
          <Color label="星头颜色" value={opts.color} onChange={(color) => set({ color })} />
          <ControlRow label="方向">
            <div className="view-tabs">
              {[["clockwise", "顺时针"], ["counterclockwise", "逆时针"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.direction === id ? "active" : ""} onClick={() => set({ direction: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="悬停行为">
            <div className="view-tabs">
              {[["lap", "加圈"], ["brighten", "增亮"], ["reveal", "显现"], ["none", "无"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.hover === id ? "active" : ""} onClick={() => set({ hover: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="一圈时长" value={opts.duration} min={0.5} max={10} step={0.1} format={(v) => `${v.toFixed(1)}s`} onChange={(duration) => set({ duration })} />
          <Slider label="线宽" value={opts.thickness} min={0.5} max={4} step={0.5} format={(v) => `${v}px`} onChange={(thickness) => set({ thickness })} />
          <Slider label="圆角" value={opts.radius} min={0} max={40} step={2} format={(v) => `${v}px`} onChange={(radius) => set({ radius })} />
          <Slider label="拖尾长度" value={opts.trailLength} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(trailLength) => set({ trailLength })} />
          <Slider label="星头数" value={opts.stars} min={1} max={6} step={1} format={(v) => String(v)} onChange={(stars) => set({ stars })} />
          <Slider label="光晕" value={opts.glow} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(glow) => set({ glow })} />
          <ControlRow label="星光星尘">
            <Switch checked={opts.sparkle} onChange={(sparkle) => set({ sparkle })} label="星光星尘" />
          </ControlRow>
          <ControlRow label="点击脉冲">
            <Switch checked={opts.clickPulse} onChange={(clickPulse) => set({ clickPulse })} label="点击脉冲" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the twinkling pill resting on a dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 170, background: "#101014" }}>
        <StarBorder theme="dark" color="#ffffff" duration={4} glow={0.7} sparkle={true} radius={999} onClick={() => {}}>
          流星描边
        </StarBorder>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
