import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { BrandPosterCards } from "../../src/components/brand-poster-cards/BrandPosterCards.tsx";

/* The three posters ship with the wallpaper material embedded; the sets
   below swap in other frames of the same artwork without remounting. */
const PHOTO_SETS = [
  { label: "默认素材", images: undefined },
  { label: "壁纸 B", images: ["./assets/wallpaper-04.jpg", "./assets/wallpaper-06.jpg", "./assets/wallpaper-09.jpg"] },
  { label: "壁纸 C", images: ["./assets/wallpaper-05.jpg", "./assets/wallpaper-10.jpg", "./assets/wallpaper-07.jpg"] },
];

function ControlRow({ label, children }) {
  return (
    <div className="control">
      <span className="control-label">{label}</span>
      {children}
    </div>
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

function TextField({ label, value, onChange }) {
  return (
    <ControlRow label={label}>
      <input type="text" value={value} onChange={(event) => onChange(event.target.value)} aria-label={label} />
    </ControlRow>
  );
}

function Demo() {
  const [photos, setPhotos] = useState(0);
  const [description, setDescription] = useState(
    "A personal box of UI ideas, interaction details, and components worth keeping. Curated by Solen Design.",
  );
  const [reducedMotion, setReducedMotion] = useState(false);
  const reset = () => {
    setPhotos(0);
    setDescription("A personal box of UI ideas, interaction details, and components worth keeping. Curated by Solen Design.");
    setReducedMotion(false);
  };
  return (
    <>
      <div className="demo-stage" style={{ background: "#ffffff", colorScheme: "light" }}>
        <DemoFit>

          <BrandPosterCards options={{ images: PHOTO_SETS[photos].images, description, reducedMotion }} />
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./brand-poster-cards-preview.html">
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
          <Slider label="照片组" value={photos} min={0} max={PHOTO_SETS.length - 1} step={1} format={(v) => PHOTO_SETS[v].label} onChange={setPhotos} />
          <TextField label="海报正文" value={description} onChange={setDescription} />
          <ControlRow label="减少动态">
            <Switch checked={reducedMotion} onChange={setReducedMotion} label="减少动态" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the three posters, scaled into the card frame. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <BrandPosterCards options={{ reducedMotion: true }} />
    </div>
  );
}


export { Demo, CardPreview };
