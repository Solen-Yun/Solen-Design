import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { AlbumCoverTunnel } from "../../src/components/album-cover-tunnel/AlbumCoverTunnel.tsx";

/* The engine ships ten square covers embedded as base64 JPEG. This second set
   pulls the same wallpapers from the gallery's own assets at full size —
   they are centre-cropped into the square texture array the same way. */
const LOCAL_COVERS = [
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

const DEFAULTS = {
  autoTravel: true,
  paused: false,
  lightTheme: false,
};

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
  const [opts, setOpts] = useState(DEFAULTS);
  const [localCovers, setLocalCovers] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => {
    setOpts(DEFAULTS);
    setLocalCovers(false);
    setReducedMotion(false);
  };

  return (
    <>
      <div className="demo-stage" style={{ background: "#0b0b0f", colorScheme: "dark" }}>
        <DemoFit>

          <AlbumCoverTunnel
            options={{
              paused: opts.paused,
              autoTravel: opts.autoTravel,
              theme: opts.lightTheme ? "light" : "dark",
              reducedMotion,
              images: localCovers ? LOCAL_COVERS : undefined,
            }}
          />
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./album-cover-tunnel-preview.html">
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
          <ControlRow label="自动穿行">
            <Switch checked={opts.autoTravel} onChange={(autoTravel) => set({ autoTravel })} label="自动穿行" />
          </ControlRow>
          <ControlRow label="暂停">
            <Switch checked={opts.paused} onChange={(paused) => set({ paused })} label="暂停" />
          </ControlRow>
          <ControlRow label="浅色主题">
            <Switch checked={opts.lightTheme} onChange={(lightTheme) => set({ lightTheme })} label="浅色主题" />
          </ControlRow>
          <ControlRow label="使用本地壁纸">
            <Switch checked={localCovers} onChange={setLocalCovers} label="使用本地壁纸" />
          </ControlRow>
          <ControlRow label="减少动态">
            <Switch checked={reducedMotion} onChange={setReducedMotion} label="减少动态" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the tunnel is a 16:9 block, centred in the card's frame. */
function CardPreview() {
  return (
    <div className="comp-zoom" style={{ display: "grid", placeItems: "center" }}>
      <AlbumCoverTunnel options={{ reducedMotion: true }} />
    </div>
  );
}


export { Demo, CardPreview };
