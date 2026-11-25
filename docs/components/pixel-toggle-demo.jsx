import { useEffect, useState } from "react";
import { DemoFit } from "../demo-fit";
import { PixelToggle } from "../../src/components/pixel-toggle/PixelToggle.tsx";

/* The demo plus a live customize panel — every control is a real option. */

/* The demo's switch drives the whole workbench theme:
   engine `checked` is DAY (sun on the right), so night = !checked.
   Stored the same way the settings page does, so the two stay in sync. */

function currentNight() {
  const theme = document.documentElement.dataset.theme;
  if (theme === "dark") return true;
  if (theme === "light") return false;
  return Boolean(window.matchMedia?.("(prefers-color-scheme: dark)").matches);
}

function applySiteTheme(night) {
  const root = document.documentElement;
  root.dataset.theme = night ? "dark" : "light";
  root.style.colorScheme = night ? "dark" : "light";
  localStorage.setItem("solen-docs-theme", night ? "dark" : "light");
}

function resetSiteTheme() {
  const root = document.documentElement;
  delete root.dataset.theme;
  root.style.colorScheme = "";
  localStorage.setItem("solen-docs-theme", "auto");
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

function Demo() {
  /* night is the source of truth here; the engine's checked is its negation */
  const [night, setNight] = useState(currentNight);
  const [sound, setSound] = useState(true);
  const [fixedBackground, setFixedBackground] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const toggle = (engineChecked) => {
    const nextNight = !engineChecked;
    setNight(nextNight);
    applySiteTheme(nextNight);
  };

  /* replay plays the switch transition once more — same path as a click */
  const replay = () => toggle(night);

  const reset = () => {
    resetSiteTheme();
    setNight(currentNight());
    setSound(true);
    setFixedBackground(false);
    setReducedMotion(false);
  };

  return (
    <>
      <div className="demo-stage" style={{ background: "#0b0b0f", colorScheme: "dark" }}>
        <DemoFit>

          <PixelToggle
            options={{ checked: !night, onCheckedChange: toggle, sound, fixedBackground, reducedMotion }}
          />
        </DemoFit>
      </div>
      <div className="demo-actions">
        <button type="button" className="replay-button" onClick={replay}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          重播
        </button>
        <a href="./pixel-toggle-preview.html">
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
          <ControlRow label="夜间状态">
            <Switch
              checked={night}
              onChange={(nextNight) => {
                setNight(nextNight);
                applySiteTheme(nextNight);
              }}
              label="夜间状态"
            />
          </ControlRow>
          <ControlRow label="点击音效">
            <Switch checked={sound} onChange={setSound} label="点击音效" />
          </ControlRow>
          <ControlRow label="固定背景">
            <Switch checked={fixedBackground} onChange={setFixedBackground} label="固定背景" />
          </ControlRow>
          <ControlRow label="减少动态">
            <Switch checked={reducedMotion} onChange={setReducedMotion} label="减少动态" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the scene base follows the site theme: light site shows
   the day scene, dark site the night scene. It never touches the site
   theme itself; that is the page demo's job. Static preview, no autoplay. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <PixelToggle options={{ checked: false, fixedBackground: true }} />
    </div>
  );
}


export { Demo, CardPreview };
