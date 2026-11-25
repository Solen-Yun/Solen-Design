import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as BorderGlow } from "../../src/components/border-glow/BorderGlow.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Orbit the pointer around the outside to steer the lit cone. */

const DEFAULTS = {
  backgroundColor: "#120F17",
  glowColor: "#f5d78e",
  borderRadius: 28,
  glowRadius: 40,
  glowIntensity: 1.0,
  coneSpread: 25,
  edgeSensitivity: 30,
  fillOpacity: 0.5,
  animated: false,
};

const hexToHsl = (hex) => {
  const value = hex.replace("#", "");
  const full = value.length === 3 ? value.split("").map((c) => c + c).join("") : value;
  const r = parseInt(full.slice(0, 2), 16) / 255;
  const g = parseInt(full.slice(2, 4), 16) / 255;
  const b = parseInt(full.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return "40 80 80";
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return `${Math.round(h * 360)} ${Math.round(s * 100)} ${Math.round(l * 100)}`;
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

const PALETTES = [
  ["#c084fc", "#f472b6", "#38bdf8"],
  ["#fbbf24", "#f97316", "#ef4444"],
  ["#34d399", "#22d3ee", "#818cf8"],
];

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);
  const [paletteIndex, setPaletteIndex] = useState(0);
  const dark = opts.backgroundColor === "#120F17";

  return (
    <>
      <div className="demo-stage" style={{ background: dark ? "#0a0810" : "#e9e9ee", colorScheme: dark ? "dark" : "light" }}>
        <DemoFit>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 360, padding: 40 }}>
            <BorderGlow
              backgroundColor={opts.backgroundColor}
              glowColor={hexToHsl(opts.glowColor)}
              borderRadius={opts.borderRadius}
              glowRadius={opts.glowRadius}
              glowIntensity={opts.glowIntensity}
              coneSpread={opts.coneSpread}
              edgeSensitivity={opts.edgeSensitivity}
              fillOpacity={opts.fillOpacity}
              animated={opts.animated}
              colors={PALETTES[paletteIndex]}
              style={{ width: 340, padding: 24 }}
            >
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: dark ? "#f4f4f5" : "#18181b" }}>网格渐变边框</h3>
              <p style={{ margin: "8px 0 0", fontSize: 13, lineHeight: 1.5, opacity: 0.65, color: dark ? "#f4f4f5" : "#18181b" }}>
                指针贴近边框，光锥沿指针方向点亮；绕到另一侧，光跟着转过去。
              </p>
            </BorderGlow>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./border-glow-preview.html">
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
          <Color label="辉光色" value={opts.glowColor} onChange={(glowColor) => set({ glowColor })} />
          <ControlRow label="底色">
            <div className="view-tabs">
              {[["#120F17", "深色"], ["#ffffff", "浅色"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.backgroundColor === id ? "active" : ""} onClick={() => set({ backgroundColor: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="池色组">
            <div className="view-tabs">
              {PALETTES.map((_, index) => (
                <button key={index} type="button" className={paletteIndex === index ? "active" : ""} onClick={() => setPaletteIndex(index)}>
                  {index + 1}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="锥宽" value={opts.coneSpread} min={5} max={50} step={1} format={(v) => `${v}%`} onChange={(coneSpread) => set({ coneSpread })} />
          <Slider label="辉光半径" value={opts.glowRadius} min={0} max={90} step={2} format={(v) => `${v}px`} onChange={(glowRadius) => set({ glowRadius })} />
          <Slider label="辉光强度" value={opts.glowIntensity} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(glowIntensity) => set({ glowIntensity })} />
          <Slider label="边缘阈值" value={opts.edgeSensitivity} min={0} max={90} step={1} format={(v) => String(v)} onChange={(edgeSensitivity) => set({ edgeSensitivity })} />
          <Slider label="面填充" value={opts.fillOpacity} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(fillOpacity) => set({ fillOpacity })} />
          <Slider label="圆角" value={opts.borderRadius} min={0} max={48} step={2} format={(v) => `${v}px`} onChange={(borderRadius) => set({ borderRadius })} />
          <ControlRow label="自动扫边">
            <Switch checked={opts.animated} onChange={(animated) => set({ animated })} label="自动扫边" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the dark card mid-sweep, one arc of the mesh lit. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 240, background: "#0a0810", padding: 24 }}>
        <BorderGlow backgroundColor="#120F17" animated style={{ width: 300, padding: 20 }}>
          <p style={{ margin: 0, fontSize: 13, color: "#f4f4f5", opacity: 0.7 }}>指向性辉光边框</p>
        </BorderGlow>
      </div>
    </div>
  );
}

export { Demo, CardPreview };
