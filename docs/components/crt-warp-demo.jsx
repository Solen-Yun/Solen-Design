import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as CRTWarp } from "../../src/components/crt-warp/CRTWarp.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Clicking changes the channel with a roll-and-static flip; the cursor
   twists the picture like a magnet. */

const DEFAULTS = {
  color: "#c755f7",
  backgroundColor: "#120f17",
  speed: 0.5,
  waveAmplitude: 0.3,
  waveFrequency: 2.5,
  levels: 3,
  columns: 80,
  persistence: 0.4,
  curvature: 0.25,
  scanlineStrength: 0.6,
  mask: "aperture",
  maskStrength: 0.3,
  bloom: 1.5,
  rgbShift: 0.003,
  noise: 0.1,
  flicker: 0.15,
  interference: 0.2,
  vignette: 0.3,
  mouseStrength: 0.5,
  changeOnClick: true,
  lightMode: false,
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
      <div className="demo-stage" style={{ background: "#0c0a10" }}>
        <DemoFit>
          <div style={{ position: "relative", width: "100%", height: 260 }}>
            <CRTWarp
              color={opts.color}
              backgroundColor={opts.backgroundColor}
              speed={opts.speed}
              waveAmplitude={opts.waveAmplitude}
              waveFrequency={opts.waveFrequency}
              levels={opts.levels}
              columns={opts.columns}
              persistence={opts.persistence}
              curvature={opts.curvature}
              scanlineStrength={opts.scanlineStrength}
              mask={opts.mask}
              maskStrength={opts.maskStrength}
              bloom={opts.bloom}
              rgbShift={opts.rgbShift}
              noise={opts.noise}
              flicker={opts.flicker}
              interference={opts.interference}
              vignette={opts.vignette}
              mouseStrength={opts.mouseStrength}
              changeOnClick={opts.changeOnClick}
              lightMode={opts.lightMode}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./crt-warp-preview.html">
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
          <Color label="荧光色" value={opts.color} onChange={(color) => set({ color })} />
          <Color label="荧屏底色" value={opts.backgroundColor} onChange={(backgroundColor) => set({ backgroundColor })} />
          <Slider label="演化速度" value={opts.speed} min={0} max={2} step={0.05} format={(v) => v.toFixed(2)} onChange={(speed) => set({ speed })} />
          <Slider label="场幅度" value={opts.waveAmplitude} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(waveAmplitude) => set({ waveAmplitude })} />
          <Slider label="场频率" value={opts.waveFrequency} min={0.5} max={6} step={0.1} format={(v) => v.toFixed(1)} onChange={(waveFrequency) => set({ waveFrequency })} />
          <Slider label="色阶数" value={opts.levels} min={2} max={12} step={1} format={(v) => `${v} 阶`} onChange={(levels) => set({ levels })} />
          <Slider label="像素列数" value={opts.columns} min={20} max={240} step={4} format={(v) => `${v} 列`} onChange={(columns) => set({ columns })} />
          <Slider label="余辉" value={opts.persistence} min={0} max={0.95} step={0.05} format={(v) => v.toFixed(2)} onChange={(persistence) => set({ persistence })} />
          <Slider label="弯曲" value={opts.curvature} min={0} max={0.6} step={0.01} format={(v) => v.toFixed(2)} onChange={(curvature) => set({ curvature })} />
          <Slider label="扫描线" value={opts.scanlineStrength} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(scanlineStrength) => set({ scanlineStrength })} />
          <ControlRow label="荧光罩">
            <div className="view-tabs">
              {[["none", "无"], ["aperture", "孔径"], ["shadow", "阴影"], ["slot", "槽形"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.mask === id ? "active" : ""} onClick={() => set({ mask: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="罩对比" value={opts.maskStrength} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(maskStrength) => set({ maskStrength })} />
          <Slider label="辉光" value={opts.bloom} min={0} max={4} step={0.1} format={(v) => v.toFixed(1)} onChange={(bloom) => set({ bloom })} />
          <Slider label="色散" value={opts.rgbShift} min={0} max={0.02} step={0.001} format={(v) => v.toFixed(3)} onChange={(rgbShift) => set({ rgbShift })} />
          <Slider label="颗粒" value={opts.noise} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(noise) => set({ noise })} />
          <Slider label="闪烁" value={opts.flicker} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(flicker) => set({ flicker })} />
          <Slider label="干扰" value={opts.interference} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(interference) => set({ interference })} />
          <Slider label="暗角" value={opts.vignette} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(vignette) => set({ vignette })} />
          <Slider label="磁体强度" value={opts.mouseStrength} min={0} max={2} step={0.1} format={(v) => v.toFixed(1)} onChange={(mouseStrength) => set({ mouseStrength })} />
          <ControlRow label="点击换台">
            <Switch checked={opts.changeOnClick} onChange={(changeOnClick) => set({ changeOnClick })} label="点击换台" />
          </ControlRow>
          <ControlRow label="亮色观感">
            <Switch checked={opts.lightMode} onChange={(lightMode) => set({ lightMode })} label="亮色观感" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ position: "relative", width: "100%", height: 220, background: "#0c0a10" }}>
        <CRTWarp mouseReact={false} changeOnClick={false} intro={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
