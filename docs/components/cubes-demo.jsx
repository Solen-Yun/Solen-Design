import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { Cubes } from "../../src/components/cubes/Cubes.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Sweep the cursor fast to comb a spin through the grid, click for a ripple. */

const DEFAULTS = {
  gridSize: 10,
  gap: 0.18,
  faceColor: "#120F17",
  edgeColor: "#ffffff",
  edgeWidth: 1,
  edgeStyle: "solid",
  faceOpacity: 1,
  shading: 0.6,
  maxAngle: 45,
  radius: 3,
  speed: 1,
  bounce: 0.4,
  brush: 1,
  perspective: 0,
  autoAnimate: true,
  rippleOnClick: true,
  rippleColor: "#ffffff",
  rippleSpeed: 1,
  intro: true,
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
          <div style={{ position: "relative", width: "100%", height: 340 }}>
            <Cubes
              gridSize={opts.gridSize}
              gap={opts.gap}
              faceColor={opts.faceColor}
              edgeColor={opts.edgeColor}
              edgeWidth={opts.edgeWidth}
              edgeStyle={opts.edgeStyle}
              faceOpacity={opts.faceOpacity}
              shading={opts.shading}
              maxAngle={opts.maxAngle}
              radius={opts.radius}
              speed={opts.speed}
              bounce={opts.bounce}
              brush={opts.brush}
              perspective={opts.perspective}
              autoAnimate={opts.autoAnimate}
              rippleOnClick={opts.rippleOnClick}
              rippleColor={opts.rippleColor}
              rippleSpeed={opts.rippleSpeed}
              intro={opts.intro}
              paused={opts.paused}
            />
            <p
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                paddingBottom: 14,
                margin: 0,
                pointerEvents: "none",
                color: "#52525b",
                fontSize: 13,
                letterSpacing: 2,
              }}
            >
              方块注视指针，快速扫过成波，点击扩散涟漪
            </p>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./cubes-preview.html">
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
          <Slider label="网格边长" value={opts.gridSize} min={1} max={40} step={1} format={(v) => String(v)} onChange={(gridSize) => set({ gridSize })} />
          <Slider label="间距" value={opts.gap} min={0} max={0.9} step={0.02} format={(v) => v.toFixed(2)} onChange={(gap) => set({ gap })} />
          <Color label="面颜色" value={opts.faceColor} onChange={(faceColor) => set({ faceColor })} />
          <Color label="棱线颜色" value={opts.edgeColor} onChange={(edgeColor) => set({ edgeColor })} />
          <Color label="涟漪颜色" value={opts.rippleColor} onChange={(rippleColor) => set({ rippleColor })} />
          <ControlRow label="棱线样式">
            <div className="view-tabs">
              {[["solid", "实线"], ["dashed", "虚线"], ["dotted", "点线"], ["none", "无线"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.edgeStyle === id ? "active" : ""} onClick={() => set({ edgeStyle: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="棱线宽度" value={opts.edgeWidth} min={0} max={4} step={0.25} format={(v) => `${v}px`} onChange={(edgeWidth) => set({ edgeWidth })} />
          <Slider label="面透明度" value={opts.faceOpacity} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(faceOpacity) => set({ faceOpacity })} />
          <Slider label="侧面明暗" value={opts.shading} min={0} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(shading) => set({ shading })} />
          <Slider label="最大转角" value={opts.maxAngle} min={0} max={90} step={5} format={(v) => `${v}°`} onChange={(maxAngle) => set({ maxAngle })} />
          <Slider label="影响半径" value={opts.radius} min={0.5} max={12} step={0.5} format={(v) => `${v}格`} onChange={(radius) => set({ radius })} />
          <Slider label="弹簧速度" value={opts.speed} min={0.05} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(speed) => set({ speed })} />
          <Slider label="过冲" value={opts.bounce} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(bounce) => set({ bounce })} />
          <Slider label="扫动力度" value={opts.brush} min={0} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(brush) => set({ brush })} />
          <Slider label="透视" value={opts.perspective} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(perspective) => set({ perspective })} />
          <Slider label="涟漪速度" value={opts.rippleSpeed} min={0.05} max={3} step={0.05} format={(v) => v.toFixed(2)} onChange={(rippleSpeed) => set({ rippleSpeed })} />
          <ControlRow label="幽灵光标">
            <Switch checked={opts.autoAnimate} onChange={(autoAnimate) => set({ autoAnimate })} label="幽灵光标" />
          </ControlRow>
          <ControlRow label="点击涟漪">
            <Switch checked={opts.rippleOnClick} onChange={(rippleOnClick) => set({ rippleOnClick })} label="点击涟漪" />
          </ControlRow>
          <ControlRow label="开场生长">
            <Switch checked={opts.intro} onChange={(intro) => set({ intro })} label="开场生长" />
          </ControlRow>
          <ControlRow label="暂停">
            <Switch checked={opts.paused} onChange={(paused) => set({ paused })} label="暂停" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — a small grid mid-turn toward an invisible cursor. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 170, background: "#101014" }}>
        <Cubes gridSize={8} maxAngle={50} radius={2.5} intro={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
