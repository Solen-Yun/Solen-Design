import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { InkSpreadCarousel } from "../../src/components/ink-spread-carousel/InkSpreadCarousel.tsx";

/* The gallery ships ten local wallpapers through the images option; without
   it the component falls back to its embedded 2x2 atlas. */
const PHOTOS = [
  { src: "./assets/wallpaper-01.jpg", alt: "霓虹雨夜都市" },
  { src: "./assets/wallpaper-02.jpg", alt: "星海孤崖" },
  { src: "./assets/wallpaper-03.jpg", alt: "樱花黄昏神社" },
  { src: "./assets/wallpaper-04.jpg", alt: "深海巨鲸" },
  { src: "./assets/wallpaper-05.jpg", alt: "冰与火之界" },
  { src: "./assets/wallpaper-06.jpg", alt: "天空浮岛" },
  { src: "./assets/wallpaper-07.jpg", alt: "雨夜末班车" },
  { src: "./assets/wallpaper-08.jpg", alt: "极光镜湖" },
  { src: "./assets/wallpaper-09.jpg", alt: "苍绿巨神" },
  { src: "./assets/wallpaper-10.jpg", alt: "焰羽之舞" },
];

/* The demo plus a live customize panel — every control is a real option. */
const DEFAULTS = {
  duration: 900,
  roughness: 0.6,
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
  const [localPhotos, setLocalPhotos] = useState(true);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => {
    setOpts(DEFAULTS);
    setLocalPhotos(true);
    setPhotoIndex(0);
    setReducedMotion(false);
  };
  const maxIndex = localPhotos ? 9 : 3;

  return (
    <>
      <div className="demo-stage" style={{ background: "#ffffff", colorScheme: "light" }}>
        <DemoFit>

          <InkSpreadCarousel
            options={{
              ...opts,
              index: photoIndex,
              images: localPhotos ? PHOTOS : undefined,
              onIndexChange: setPhotoIndex,
              reducedMotion,
            }}
          />
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./ink-spread-carousel-preview.html">
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
          <Slider label="切换时长" value={opts.duration} min={250} max={2400} step={50} format={(v) => `${v}ms`} onChange={(duration) => set({ duration })} />
          <Slider label="边缘粗糙度" value={opts.roughness} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(roughness) => set({ roughness })} />
          <Slider
            label="当前照片"
            value={Math.min(photoIndex, maxIndex)}
            min={0}
            max={maxIndex}
            step={1}
            format={(v) => `第 ${v + 1} 张`}
            onChange={(v) => setPhotoIndex(v)}
          />
          <ControlRow label="使用本地壁纸">
            <Switch
              checked={localPhotos}
              onChange={(next) => {
                setLocalPhotos(next);
                setPhotoIndex((i) => Math.min(i, next ? 9 : 3));
              }}
              label="使用本地壁纸"
            />
          </ControlRow>
          <ControlRow label="减少动态">
            <Switch checked={reducedMotion} onChange={setReducedMotion} label="减少动态" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — same three photos, scaled by the engine to the crop. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <InkSpreadCarousel options={{ reducedMotion: true, images: PHOTOS }} />
    </div>
  );
}


export { Demo, CardPreview };
