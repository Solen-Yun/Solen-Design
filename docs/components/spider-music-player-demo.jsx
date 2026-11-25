import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { SpiderMusicPlayer } from "../../src/components/spider-music-player/SpiderMusicPlayer.tsx";

/* The device letterboxes into its frame — no height control. The initial
   track can be seeded; playback controls live on the component itself. */
const DEFAULTS = {
  track: 0,
  reducedMotion: false,
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
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);

  return (
    <>
      <div className="demo-stage" style={{ background: "#0b0b0f", colorScheme: "dark" }}>
        <DemoFit>

          <SpiderMusicPlayer
            options={{
              track: opts.track,
              reducedMotion: opts.reducedMotion,
            }}
          />
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./spider-music-player-preview.html">
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
          <Slider label="当前曲目" value={opts.track} min={0} max={7} step={1} format={(v) => `第 ${v + 1} 首`} onChange={(track) => set({ track })} />
          <ControlRow label="减少动态">
            <Switch checked={opts.reducedMotion} onChange={(reducedMotion) => set({ reducedMotion })} label="减少动态" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the folded phone with its resident spider. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <SpiderMusicPlayer options={{ reducedMotion: true, track: 2 }} />
    </div>
  );
}


export { Demo, CardPreview };
