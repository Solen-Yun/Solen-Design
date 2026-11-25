import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { CardSwap } from "../../src/components/card-swap/CardSwap.tsx";

/* The demo runs on the engine's four embedded photos; `cards` replaces
   them with exactly four { title, src } objects. This second deck pulls
   four different local wallpapers so the swap is visible. */
const PHOTOS = [
  { title: "霓虹雨夜都市", src: "./assets/wallpaper-01.jpg" },
  { title: "星海孤崖", src: "./assets/wallpaper-02.jpg" },
  { title: "苍绿巨神", src: "./assets/wallpaper-09.jpg" },
  { title: "焰羽之舞", src: "./assets/wallpaper-10.jpg" },
];

const DEFAULTS = {
  auto: false,
  every: 4,
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
  const [localCards, setLocalCards] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => {
    setOpts(DEFAULTS);
    setLocalCards(false);
    setReducedMotion(false);
  };

  return (
    <>
      <div className="demo-stage" style={{ background: "#ffffff", colorScheme: "light" }}>
        <DemoFit>

          <CardSwap options={{ ...opts, cards: localCards ? PHOTOS : undefined, reducedMotion }} />
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./card-swap-preview.html">
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
          <ControlRow label="自动播放">
            <Switch checked={opts.auto} onChange={(auto) => set({ auto })} label="自动播放" />
          </ControlRow>
          <Slider label="换位间隔" value={opts.every} min={1.5} max={8} step={0.5} format={(v) => `${v}s`} onChange={(every) => set({ every })} />
          <ControlRow label="使用本地照片">
            <Switch checked={localCards} onChange={setLocalCards} label="使用本地照片" />
          </ControlRow>
          <ControlRow label="减少动态">
            <Switch checked={reducedMotion} onChange={setReducedMotion} label="减少动态" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the component at its natural 360px block size. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <CardSwap options={{ reducedMotion: true }} />
    </div>
  );
}


export { Demo, CardPreview };
