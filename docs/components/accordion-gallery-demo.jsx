import { useState } from "react";
import { DemoFit } from "../demo-fit";
import AccordionGallery from "../../src/components/accordion-gallery/AccordionGallery.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Sweep across the panels to feel the fan open, then flip to vertical
   and click trigger for the other two postures. */


const ITEMS = [
  {
    image: "./assets/demo-photos/photo-01.jpg",
    label: "峡谷",
  },
  {
    image: "./assets/demo-photos/photo-02.jpg",
    label: "远山",
  },
  {
    image: "./assets/demo-photos/photo-03.jpg",
    label: "暮紫",
  },
  {
    image: "./assets/demo-photos/photo-04.jpg",
    label: "苔原",
  },
  {
    image: "./assets/demo-photos/photo-05.jpg",
    label: "霞色",
  },
];

const DEFAULTS = {
  orientation: "horizontal",
  trigger: "hover",
  expandRatio: 0.52,
  height: 460,
  gap: 10,
  radius: 16,
  duration: 0.6,
  tilt: 8,
  parallax: 0.5,
  stagger: 0.06,
  grayscale: true,
  showLabels: true,
  accentColor: "#ffffff",
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
          <div style={{ width: "100%", maxWidth: 760 }}>
            <AccordionGallery
              items={ITEMS}
              defaultIndex={2}
              orientation={opts.orientation}
              trigger={opts.trigger}
              expandRatio={opts.expandRatio}
              height={opts.height}
              gap={opts.gap}
              radius={opts.radius}
              duration={opts.duration}
              tilt={opts.tilt}
              parallax={opts.parallax}
              stagger={opts.stagger}
              grayscale={opts.grayscale}
              showLabels={opts.showLabels}
              accentColor={opts.accentColor}
              textColor="#ffffff"
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./accordion-gallery-preview.html">
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
          <ControlRow label="方向">
            <div className="view-tabs">
              {[["horizontal", "横向"], ["vertical", "竖向"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.orientation === id ? "active" : undefined} onClick={() => set({ orientation: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="触发">
            <div className="view-tabs">
              {[["hover", "悬停"], ["click", "点击"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.trigger === id ? "active" : undefined} onClick={() => set({ trigger: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="展开比例" value={opts.expandRatio} min={0.25} max={0.85} step={0.01} format={(v) => `${Math.round(v * 100)}%`} onChange={(expandRatio) => set({ expandRatio })} />
          <Slider label="轨道高度" value={opts.height} min={300} max={640} step={10} format={(v) => `${v}px`} onChange={(height) => set({ height })} />
          <Slider label="间距" value={opts.gap} min={0} max={30} step={1} format={(v) => `${v}px`} onChange={(gap) => set({ gap })} />
          <Slider label="圆角" value={opts.radius} min={0} max={36} step={1} format={(v) => `${v}px`} onChange={(radius) => set({ radius })} />
          <Slider label="时长" value={opts.duration} min={0.15} max={1.4} step={0.05} format={(v) => `${v.toFixed(2)}s`} onChange={(duration) => set({ duration })} />
          <Slider label="甩角" value={opts.tilt} min={0} max={24} step={1} format={(v) => `${v}°`} onChange={(tilt) => set({ tilt })} />
          <Slider label="视差" value={opts.parallax} min={0} max={1.5} step={0.05} format={(v) => v.toFixed(2)} onChange={(parallax) => set({ parallax })} />
          <Slider label="标签错峰" value={opts.stagger} min={0} max={0.2} step={0.01} format={(v) => `${v.toFixed(2)}s`} onChange={(stagger) => set({ stagger })} />
          <Color label="竖条色" value={opts.accentColor} onChange={(accentColor) => set({ accentColor })} />
          <ControlRow label="置灰">
            <Switch checked={opts.grayscale} onChange={(grayscale) => set({ grayscale })} label="置灰" />
          </ControlRow>
          <ControlRow label="标签">
            <Switch checked={opts.showLabels} onChange={(showLabels) => set({ showLabels })} label="标签" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the horizontal fan resting on the dark stage. */
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
        <div style={{ width: "100%" }}>
          <AccordionGallery items={ITEMS} defaultIndex={1} height={170} gap={8} radius={12} trigger="hover" />
        </div>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
