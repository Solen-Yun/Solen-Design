import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { ImageAccordion } from "../../src/components/image-accordion/ImageAccordion.tsx";

/* The demo runs on the engine's five embedded photos (2:3 crops from the
   local wallpaper library); an `images` array of 1–5 { name, src } objects
   can replace them without touching the 340px strip. This second set pulls
   five different local wallpapers so the swap is visible. */
const PHOTOS = [
  { name: "霓虹雨夜都市", src: "./assets/wallpaper-01.jpg" },
  { name: "星海孤崖", src: "./assets/wallpaper-02.jpg" },
  { name: "冰与火之界", src: "./assets/wallpaper-05.jpg" },
  { name: "苍绿巨神", src: "./assets/wallpaper-09.jpg" },
  { name: "焰羽之舞", src: "./assets/wallpaper-10.jpg" },
];

const DEFAULTS = {
  open: 50,
  reach: 35,
  bounce: 10,
  gap: 8,
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
  const [localPhotos, setLocalPhotos] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => {
    setOpts(DEFAULTS);
    setLocalPhotos(false);
    setReducedMotion(false);
  };

  return (
    <>
      <div className="demo-stage" style={{ background: "#ffffff", colorScheme: "light" }}>
        <DemoFit>

          <ImageAccordion options={{ ...opts, images: localPhotos ? PHOTOS : undefined, reducedMotion }} />
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./image-accordion-preview.html">
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
          <Slider label="展开强度" value={opts.open} min={0} max={100} step={1} format={(v) => `${v}%`} onChange={(open) => set({ open })} />
          <Slider label="邻图联动" value={opts.reach} min={0} max={100} step={1} format={(v) => `${v}%`} onChange={(reach) => set({ reach })} />
          <Slider label="回弹" value={opts.bounce} min={0} max={100} step={1} format={(v) => `${v}%`} onChange={(bounce) => set({ bounce })} />
          <Slider label="卡片间距" value={opts.gap} min={0} max={20} step={1} format={(v) => `${v}px`} onChange={(gap) => set({ gap })} />
          <ControlRow label="使用本地照片">
            <Switch checked={localPhotos} onChange={setLocalPhotos} label="使用本地照片" />
          </ControlRow>
          <ControlRow label="减少动态">
            <Switch checked={reducedMotion} onChange={setReducedMotion} label="减少动态" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the component at its natural 340px size. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <ImageAccordion options={{ reducedMotion: true }} />
    </div>
  );
}


export { Demo, CardPreview };
