import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { ImageCompare } from "../../src/components/image-compare/ImageCompare.tsx";

/* The demo runs on the engine's embedded photo; beforeSrc/afterSrc can
   replace both layers with any same-composition pair. The local pair ships
   a pre-grayscaled copy, because a supplied beforeSrc skips the built-in
   grayscale filter. */
const LOCAL_PAIR = { beforeSrc: "./assets/wallpaper-02-bw.jpg", afterSrc: "./assets/wallpaper-02.jpg" };

const DEFAULTS = {
  corner: 20,
};

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

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const [labels, setLabels] = useState(true);
  const [localPair, setLocalPair] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => {
    setOpts(DEFAULTS);
    setLabels(true);
    setLocalPair(false);
    setReducedMotion(false);
  };

  return (
    <>
      <div className="demo-stage" style={{ background: "#ffffff", colorScheme: "light" }}>
        <DemoFit>

          <ImageCompare options={{ ...opts, labels, ...(localPair ? LOCAL_PAIR : {}), reducedMotion }} />
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./image-compare-preview.html">
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
          <Slider label="圆角" value={opts.corner} min={0} max={28} step={1} format={(v) => `${v}px`} onChange={(corner) => set({ corner })} />
          <ControlRow label="显示标签">
            <Switch checked={labels} onChange={setLabels} label="显示标签" />
          </ControlRow>
          <ControlRow label="使用本地图源">
            <Switch checked={localPair} onChange={setLocalPair} label="使用本地图源" />
          </ControlRow>
          <ControlRow label="减少动态">
            <Switch checked={reducedMotion} onChange={setReducedMotion} label="减少动态" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the component at its natural 270px frame size. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <ImageCompare options={{ reducedMotion: true }} />
    </div>
  );
}


export { Demo, CardPreview };
