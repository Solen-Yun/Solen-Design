import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as ShapeBlur } from "../../src/components/shape-blur/ShapeBlur.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Move the pointer to steer the defocus lens; leave it idle to watch
   the lens wander on its own. */

const LOGO = "./assets/demo-photos/photo-01.jpg";

const DEFAULTS = {
  shape: "rect",
  src: undefined,
  sides: 6,
  size: 0.8,
  roundness: 0.2,
  thickness: 2,
  fill: false,
  echoes: 1,
  spacing: 12,
  color: "#ffffff",
  blur: 16,
  lensSize: 0.3,
  lensSoftness: 0.7,
  focus: false,
  chroma: 0.3,
  rotation: 0,
  spin: 0,
  idle: true,
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

function Tabs({ options, value, onChange, label }) {
  return (
    <ControlRow label={label}>
      <div className="view-tabs">
        {options.map(([id, text]) => (
          <button key={id} type="button" className={value === id ? "active" : undefined} onClick={() => onChange(id)}>
            {text}
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
  const { shape, ...rest } = opts;

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 340 }}>
            <ShapeBlur {...rest} shape={shape} src={opts.src || undefined}>
              <span
                style={{
                  position: "absolute",
                  bottom: 14,
                  fontSize: 12,
                  letterSpacing: "0.2em",
                  color: "rgba(255,255,255,0.55)",
                  pointerEvents: "none",
                }}
              >
                SHAPE BLUR
              </span>
            </ShapeBlur>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./shape-blur-preview.html">
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
          <Tabs
            label="形状"
            value={opts.src ? "logo" : shape}
            onChange={(id) => (id === "logo" ? set({ src: LOGO }) : set({ shape: id, src: undefined}))}
            options={[
              ["rect", "矩形"],
              ["circle", "圆形"],
              ["polygon", "多边形"],
              ["star", "星形"],
              ["logo", "标志轮廓"],
            ]}
          />
          <Color label="描边颜色" value={opts.color} onChange={(color) => set({ color })} />
          <Slider label="角数" value={opts.sides} min={3} max={12} step={1} format={(v) => String(v)} onChange={(sides) => set({ sides })} />
          <Slider label="大小" value={opts.size} min={0.1} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(size) => set({ size })} />
          <Slider label="圆角" value={opts.roundness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(roundness) => set({ roundness })} />
          <Slider label="线宽" value={opts.thickness} min={0.5} max={20} step={0.5} format={(v) => `${v}px`} onChange={(thickness) => set({ thickness })} />
          <Slider label="回声数" value={opts.echoes} min={1} max={8} step={1} format={(v) => String(v)} onChange={(echoes) => set({ echoes })} />
          <Slider label="回声间距" value={opts.spacing} min={2} max={40} step={1} format={(v) => `${v}px`} onChange={(spacing) => set({ spacing })} />
          <Slider label="失焦强度" value={opts.blur} min={0} max={48} step={1} format={(v) => String(v)} onChange={(blur) => set({ blur })} />
          <Slider label="镜头半径" value={opts.lensSize} min={0.05} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(lensSize) => set({ lensSize })} />
          <Slider label="镜头柔度" value={opts.lensSoftness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(lensSoftness) => set({ lensSoftness })} />
          <Slider label="色差" value={opts.chroma} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(chroma) => set({ chroma })} />
          <Slider label="旋转" value={opts.rotation} min={0} max={360} step={5} format={(v) => `${v}°`} onChange={(rotation) => set({ rotation })} />
          <Slider label="自转速度" value={opts.spin} min={0} max={90} step={5} format={(v) => `${v}°/s`} onChange={(spin) => set({ spin })} />
          <ControlRow label="填充形体">
            <Switch checked={opts.fill} onChange={(fill) => set({ fill })} label="填充形体" />
          </ControlRow>
          <ControlRow label="反转对焦">
            <Switch checked={opts.focus} onChange={(focus) => set({ focus })} label="反转对焦" />
          </ControlRow>
          <ControlRow label="空闲游走">
            <Switch checked={opts.idle} onChange={(idle) => set({ idle })} label="空闲游走" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the crisp hexagon mid-defocus on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 190, background: "#101014" }}>
        <ShapeBlur shape="polygon" sides={6} thickness={2.5} blur={14} color="#a5b4fc" size={0.55} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
