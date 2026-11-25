import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as MaskedHeading } from "../../src/components/masked-heading/MaskedHeading.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The fill media is an inline SVG gradient (data URI): no external assets.
   Move the pointer over the heading for parallax and the spotlight beam. */

const MEDIA_SRC = `./assets/demo-photos/photo-01.jpg`;

const DEFAULTS = {
  text: "Designed in the details",
  reveal: "rise",
  trigger: "view",
  fillScale: 1.25,
  parallax: 26,
  drift: 18,
  hoverZoom: 0,
  brightness: 1,
  saturation: 1,
  grayscale: false,
  tintOn: false,
  spotlight: false,
  spotlightRadius: 160,
  outline: false,
  outlineWidth: 1,
  duration: 1.1,
  stagger: 0.09,
  textScale: 0.115,
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
          <div
            style={{
              width: "100%",
              minHeight: 440,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "48px 40px",
              color: "#f4f4f5",
            }}
          >
            <MaskedHeading
              text={opts.text}
              mediaType="image"
              src={MEDIA_SRC}
              reveal={opts.reveal}
              trigger={opts.trigger}
              fillScale={opts.fillScale}
              parallax={opts.parallax}
              drift={opts.drift}
              hoverZoom={opts.hoverZoom}
              brightness={opts.brightness}
              saturation={opts.saturation}
              grayscale={opts.grayscale}
              tint={opts.tintOn ? picked.tint ?? "#ff5a36" : undefined}
              spotlight={opts.spotlight}
              spotlightRadius={opts.spotlightRadius}
              outline={opts.outline}
              outlineColor=""
              outlineWidth={opts.outlineWidth}
              duration={opts.duration}
              stagger={opts.stagger}
              textScale={opts.textScale}
              style={{ maxWidth: 720, margin: "0 auto" }}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./masked-heading-preview.html">
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
              {[["rise", "升起"], ["scale", "缩放"], ["blur", "模糊"], ["wipe", "擦除"], ["fade", "淡入"], ["none", "无"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.reveal === id ? "active" : undefined} onClick={() => set({ reveal: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="触发">
            <div className="view-tabs">
              {[["mount", "挂载"], ["view", "视口"], ["hover", "悬停"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.trigger === id ? "active" : undefined} onClick={() => set({ trigger: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="媒体缩放" value={opts.fillScale} min={1} max={2} step={0.05} format={(v) => `${v.toFixed(2)}×`} onChange={(fillScale) => set({ fillScale })} />
          <Slider label="指针视差" value={opts.parallax} min={0} max={60} step={2} format={(v) => `${v}px`} onChange={(parallax) => set({ parallax })} />
          <Slider label="自主漂移" value={opts.drift} min={0} max={60} step={2} format={(v) => `${v}px`} onChange={(drift) => set({ drift })} />
          <Slider label="悬停缩放" value={opts.hoverZoom} min={0} max={0.5} step={0.05} format={(v) => `+${v.toFixed(2)}×`} onChange={(hoverZoom) => set({ hoverZoom })} />
          <Slider label="亮度" value={opts.brightness} min={0.3} max={1.8} step={0.05} format={(v) => v.toFixed(2)} onChange={(brightness) => set({ brightness })} />
          <Slider label="饱和度" value={opts.saturation} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(saturation) => set({ saturation })} />
          <Color label="色调颜色" value={picked.tint ?? "#ff5a36"} onChange={(tint) => setPicked((prev) => ({ ...prev, tint }))} />
          <ControlRow label="色调混合">
            <Switch checked={opts.tintOn} onChange={(tintOn) => set({ tintOn })} label="色调混合" />
          </ControlRow>
          <ControlRow label="聚光灯">
            <Switch checked={opts.spotlight} onChange={(spotlight) => set({ spotlight })} label="聚光灯" />
          </ControlRow>
          <Slider label="光斑半径" value={opts.spotlightRadius} min={60} max={400} step={10} format={(v) => `${v}px`} onChange={(spotlightRadius) => set({ spotlightRadius })} />
          <ControlRow label="空心描边">
            <Switch checked={opts.outline} onChange={(outline) => set({ outline })} label="空心描边" />
          </ControlRow>
          <Slider label="描边粗细" value={opts.outlineWidth} min={0.5} max={3} step={0.25} format={(v) => `${v.toFixed(2)}px`} onChange={(outlineWidth) => set({ outlineWidth })} />
          <Slider label="入场时长" value={opts.duration} min={0.4} max={2.5} step={0.1} format={(v) => `${v.toFixed(1)}s`} onChange={(duration) => set({ duration })} />
          <Slider label="逐词错峰" value={opts.stagger} min={0} max={0.3} step={0.01} format={(v) => `${v.toFixed(2)}s`} onChange={(stagger) => set({ stagger })} />
          <Slider label="字号比例" value={opts.textScale} min={0.06} max={0.18} step={0.005} format={(v) => v.toFixed(3)} onChange={(textScale) => set({ textScale })} />
          <ControlRow label="去饱和">
            <Switch checked={opts.grayscale} onChange={(grayscale) => set({ grayscale })} label="去饱和" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the warm gradient glowing through the glyphs. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div
        style={{
          width: "100%",
          padding: "36px 28px",
          background: "#101014",
          color: "#f4f4f5",
        }}
      >
        <MaskedHeading text="Designed in the details" mediaType="image" src={MEDIA_SRC} reveal="rise" trigger="mount" drift={12} parallax={16} textScale={0.14} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
