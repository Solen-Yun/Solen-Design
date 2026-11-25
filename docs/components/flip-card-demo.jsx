import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as FlipCard } from "../../src/components/flip-card/FlipCard.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Drag the card and let go fast: the fling throws it to the other face. */

const DEFAULTS = {
  flipped: false,
  axis: "y",
  flipOnClick: true,
  draggable: true,
  tilt: true,
  glare: true,
  tiltMax: 12,
  stiffness: 170,
  damping: 20,
  radius: 22,
  glareOpacity: 0.22,
  hoverScale: 1.03,
  background: "#27272a",
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

function Face({ emoji, title, lines }) {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        padding: 24,
        boxSizing: "border-box",
        textAlign: "center",
      }}
    >
      <span style={{ fontSize: 44, lineHeight: 1 }} aria-hidden="true">
        {emoji}
      </span>
      <span style={{ fontSize: 17, fontWeight: 600 }}>{title}</span>
      <span style={{ fontSize: 13, opacity: 0.62, lineHeight: 1.5 }}>{lines}</span>
    </div>
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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 360 }}>
            <FlipCard
              front={<Face emoji="🌙" title="夜面" lines="单击或回车翻面，也可以按住拖转后快甩出去。" />}
              back={<Face emoji="☀️" title="昼面" lines="再翻一次就回去了；拖到一半松手会弹回最近的面。" />}
              flipped={opts.flipped}
              onFlipChange={(flipped) => set({ flipped })}
              axis={opts.axis}
              flipOnClick={opts.flipOnClick}
              draggable={opts.draggable}
              tilt={opts.tilt}
              glare={opts.glare}
              tiltMax={opts.tiltMax}
              stiffness={opts.stiffness}
              damping={opts.damping}
              radius={opts.radius}
              glareOpacity={opts.glareOpacity}
              hoverScale={opts.hoverScale}
              background={opts.background}
              width={260}
              height={330}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./flip-card-preview.html">
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
          <ControlRow label="翻转轴">
            <div className="view-tabs">
              {[["y", "水平"], ["x", "垂直"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.axis === id ? "active" : ""} onClick={() => set({ axis: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="最大倾斜" value={opts.tiltMax} min={0} max={20} step={1} format={(v) => `${v}°`} onChange={(tiltMax) => set({ tiltMax })} />
          <Slider label="弹簧刚度" value={opts.stiffness} min={60} max={400} step={10} format={(v) => String(v)} onChange={(stiffness) => set({ stiffness })} />
          <Slider label="弹簧阻尼" value={opts.damping} min={8} max={40} step={1} format={(v) => String(v)} onChange={(damping) => set({ damping })} />
          <Slider label="圆角" value={opts.radius} min={6} max={40} step={2} format={(v) => `${v}px`} onChange={(radius) => set({ radius })} />
          <Slider label="眩光强度" value={opts.glareOpacity} min={0} max={0.5} step={0.02} format={(v) => v.toFixed(2)} onChange={(glareOpacity) => set({ glareOpacity })} />
          <Slider label="抬起缩放" value={opts.hoverScale} min={1} max={1.12} step={0.01} format={(v) => `×${v.toFixed(2)}`} onChange={(hoverScale) => set({ hoverScale })} />
          <Color label="面底色" value={opts.background} onChange={(background) => set({ background })} />
          <ControlRow label="显示背面">
            <Switch checked={opts.flipped} onChange={(flipped) => set({ flipped })} label="显示背面" />
          </ControlRow>
          <ControlRow label="单击翻卡">
            <Switch checked={opts.flipOnClick} onChange={(flipOnClick) => set({ flipOnClick })} label="单击翻卡" />
          </ControlRow>
          <ControlRow label="可拖拽">
            <Switch checked={opts.draggable} onChange={(draggable) => set({ draggable })} label="可拖拽" />
          </ControlRow>
          <ControlRow label="悬停倾斜">
            <Switch checked={opts.tilt} onChange={(tilt) => set({ tilt })} label="悬停倾斜" />
          </ControlRow>
          <ControlRow label="眩光">
            <Switch checked={opts.glare} onChange={(glare) => set({ glare })} label="眩光" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the card resting front-up on a dark stage. */
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
        }}
      >
        <div style={{ scale: 0.5, height: 330 }}>
          <FlipCard
            width={260}
            height={330}
            front={<Face emoji="🌙" title="夜面" lines="单击或拖拽翻面。" />}
            back={<Face emoji="☀️" title="昼面" lines="再翻一次就回去了。" />}
          />
        </div>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
