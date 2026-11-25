import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { AiBrandCoverCards } from "../../src/components/ai-brand-cover-cards/AiBrandCoverCards.tsx";

/* The engine ships the three AI-brand covers embedded as base64 artwork.
   This second set swaps in three gallery wallpapers to show the images
   API — any portrait source works, the mask keeps captions readable. */
const LOCAL_IMAGES = [
  { src: "./assets/wallpaper-01.jpg", alt: "霓虹雨夜都市" },
  { src: "./assets/wallpaper-02.jpg", alt: "星海孤崖" },
  { src: "./assets/wallpaper-08.jpg", alt: "极光镜湖" },
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

function Demo() {
  const [localImages, setLocalImages] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const reset = () => {
    setLocalImages(false);
    setReducedMotion(false);
  };

  return (
    <>
      <div className="demo-stage" style={{ background: "#ffffff", colorScheme: "light" }}>
        <DemoFit>

          <AiBrandCoverCards
            options={{
              images: localImages ? LOCAL_IMAGES : undefined,
              reducedMotion,
            }}
          />
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./ai-brand-cover-cards-preview.html">
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
          <ControlRow label="使用本地壁纸">
            <Switch checked={localImages} onChange={setLocalImages} label="使用本地壁纸" />
          </ControlRow>
          <ControlRow label="减少动态">
            <Switch checked={reducedMotion} onChange={setReducedMotion} label="减少动态" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the three covers at their natural 3:5 portrait ratio. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <AiBrandCoverCards options={{ reducedMotion: true }} />
    </div>
  );
}


export { Demo, CardPreview };
