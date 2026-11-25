import { useEffect, useState } from "react";
import { DemoFit } from "../demo-fit";
import { ShaderFlood } from "../../src/components/shader-flood/ShaderFlood.tsx";

/* The demo plus a live customize panel — every control is a real option. */

const DEFAULTS = {
  seed: 0,
  speed: 1,
  theme: "light",
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

/* Resolve a --sd-* colour token to its live hex, following the workbench
   theme (data-theme attribute or the system scheme). */
function useThemeColor(token) {
  const read = () => {
    try {
      const probe = document.createElement("span");
      probe.style.color = `var(${token})`;
      document.body.append(probe);
      const m = getComputedStyle(probe).color.match(/(\d+),\s*(\d+),\s*(\d+)/);
      probe.remove();
      return "#" + [m[1], m[2], m[3]].map((v) => Number(v).toString(16).padStart(2, "0")).join("");
    } catch {
      return "#000000";
    }
  };
  const [hex, setHex] = useState(read);
  useEffect(() => {
    const update = () => setHex(read());
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class", "style"] });
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    scheme.addEventListener?.("change", update);
    return () => {
      observer.disconnect();
      scheme.removeEventListener?.("change", update);
    };
  }, []);
  return hex;
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

/* A second card set for the items option; icon keys come from the engine's
   built-in Lucide map and colors fall back to the cycling palettes. */
const SAMPLE_ITEMS = [
  { title: "Launch Pipeline", description: "Ship builds straight from the editor with staged rollouts.", icon: "rocket" },
  { title: "Live Telemetry", description: "Streams metrics into every card as they fill.", icon: "zap" },
  { title: "Theme Studio", description: "Pick a palette and the liquid follows your brand.", icon: "palette" },
  { title: "Global Edge Cache", description: "Frozen at the edge, warm at the origin.", icon: "globe" },
  { title: "Precision Optics", description: "Every hover refracts through its own lens.", icon: "aperture" },
  { title: "Release Reel", description: "Cut the week into a highlight reel of deploys.", icon: "clapperboard" },
];

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const [picked, setPicked] = useState({});
  const themeCanvas = useThemeColor("--sd-canvas");
  const [sampleItems, setSampleItems] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => {
    setOpts(DEFAULTS);
    setPicked({});
    setSampleItems(false);
    setReducedMotion(false);
  };

  return (
    <>
      <div className="demo-stage" style={{ background: "#ffffff", colorScheme: "light" }}>
        <DemoFit>

          {/* The stage grows with the scene, so the full grid is visible. */}
          <ShaderFlood options={{ ...opts, items: sampleItems ? SAMPLE_ITEMS : undefined, reducedMotion, background: picked.background }} />
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./shader-flood-preview.html">
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
          <Slider label="液体种子" value={opts.seed} min={0} max={100} step={1} format={(v) => String(v)} onChange={(seed) => set({ seed })} />
          <Slider label="流动速度" value={opts.speed} min={0} max={3} step={0.05} format={(v) => `${v.toFixed(2)}×`} onChange={(speed) => set({ speed })} />
          <Color label="场景背景" value={picked.background ?? themeCanvas} onChange={(background) => setPicked((prev) => ({ ...prev, background }))} />
          <ControlRow label="深色主题">
            <Switch checked={opts.theme === "dark"} onChange={(dark) => set({ theme: dark ? "dark" : "light" })} label="深色主题" />
          </ControlRow>
          <ControlRow label="使用示例数据">
            <Switch checked={sampleItems} onChange={setSampleItems} label="使用示例数据" />
          </ControlRow>
          <ControlRow label="减少动态">
            <Switch checked={reducedMotion} onChange={setReducedMotion} label="减少动态" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the engine's initial.preview flag fills the first card so
   the crop shows real liquid; hover still injects into the others. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <ShaderFlood options={{ reducedMotion: true, preview: true }} />
    </div>
  );
}


export { Demo, CardPreview };
