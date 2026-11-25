import { useEffect, useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as Counter } from "../../src/components/counter/Counter.jsx";

/* The demo is a composed scene, not a bare number: a countdown card where
   the seconds tile rolls every second, so the stagger and overshoot keep
   demonstrating without any input. Tiles come from digitStyle, zero padding
   from minDigits — the same knobs the component ships. */

const DEFAULTS = {
  ink: "#18181b",
  duration: 0.7,
  bounce: 0.2,
  stagger: 0.04,
  motionBlur: true,
};

/* Tile look for the digit boxes — passed straight through digitStyle. */
const TILE = {
  background: "#f4f4f5",
  borderRadius: 14,
  padding: "10px 6px",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.05)",
};

/* A target 2d 14h 32m 49s out, ticking once a second. */
function useCountdown() {
  const [target] = useState(() => Date.now() + ((2 * 24 + 14) * 60 + 32) * 60000 + 49000);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);
  const left = Math.max(0, target - now);
  return {
    days: Math.floor(left / 86400000),
    hours: Math.floor(left / 3600000) % 24,
    minutes: Math.floor(left / 60000) % 60,
    seconds: Math.floor(left / 1000) % 60,
  };
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

/* One countdown unit — a two-digit counter with its label underneath.
   The separator column mirrors the grid so colons centre on the tiles. */
function Unit({ label, value, opts }) {
  return (
    <div style={{ display: "grid", justifyItems: "center", gap: 14 }}>
      <Counter
        value={value}
        minDigits={2}
        fontSize={64}
        fontWeight={700}
        textColor={opts.ink}
        digitStyle={TILE}
        duration={opts.duration}
        bounce={opts.bounce}
        stagger={opts.stagger}
        motionBlur={opts.motionBlur}
      />
      <span style={{ fontSize: 13, color: opts.ink, opacity: 0.45 }}>{label}</span>
    </div>
  );
}

function Separator({ opts }) {
  return (
    <div style={{ display: "grid", justifyItems: "center", gap: 14, alignSelf: "flex-start" }}>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          height: 84,
          fontSize: 44,
          fontWeight: 700,
          color: opts.ink,
          opacity: 0.3,
        }}
      >
        :
      </span>
      <span style={{ fontSize: 13 }} aria-hidden="true"></span>
    </div>
  );
}

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);
  const { days, hours, minutes, seconds } = useCountdown();

  return (
    <>
      <div className="demo-stage" style={{ background: "#ffffff", colorScheme: "light" }}>
        <DemoFit>
          <div style={{ width: "100%", display: "flex", justifyContent: "center", padding: "64px 0" }}>
            <div
              style={{
                background: "#ffffff",
                border: "1px solid rgba(0, 0, 0, 0.06)",
                borderRadius: 24,
                boxShadow: "0 16px 40px rgba(0, 0, 0, 0.08)",
                padding: "40px 56px",
              }}
            >
              <p style={{ margin: "0 0 30px", textAlign: "center", fontSize: 15, color: "#71717a" }}>
                公测开启还有
              </p>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <Unit label="天" value={days} opts={opts} />
                <Separator opts={opts} />
                <Unit label="时" value={hours} opts={opts} />
                <Separator opts={opts} />
                <Unit label="分" value={minutes} opts={opts} />
                <Separator opts={opts} />
                <Unit label="秒" value={seconds} opts={opts} />
              </div>
            </div>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./counter-preview.html">
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
          <Color label="文字颜色" value={opts.ink} onChange={(ink) => set({ ink })} />
          <Slider label="时长" value={opts.duration} min={0.1} max={2} step={0.05} format={(v) => `${v.toFixed(2)}s`} onChange={(duration) => set({ duration })} />
          <Slider label="过冲" value={opts.bounce} min={0} max={0.9} step={0.05} format={(v) => v.toFixed(2)} onChange={(bounce) => set({ bounce })} />
          <Slider label="错峰" value={opts.stagger} min={0} max={0.2} step={0.01} format={(v) => `${v.toFixed(2)}s`} onChange={(stagger) => set({ stagger })} />
          <ControlRow label="运动模糊">
            <Switch checked={opts.motionBlur} onChange={(motionBlur) => set({ motionBlur })} label="运动模糊" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — a small minute:second pair on tiles, intro off so the
   gallery stays calm. */
const TILE_SMALL = {
  background: "#f4f4f5",
  borderRadius: 10,
  padding: "6px 4px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.05)",
};

function CardPreview() {
  return (
    <div className="comp-zoom">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          width: "100%",
          height: 170,
          background: "#ffffff",
          colorScheme: "light",
        }}
      >
        <Counter value={14} minDigits={2} fontSize={44} fontWeight={700} digitStyle={TILE_SMALL} intro={false} />
        <span style={{ fontSize: 26, fontWeight: 700, opacity: 0.3 }}>:</span>
        <Counter value={32} minDigits={2} fontSize={44} fontWeight={700} digitStyle={TILE_SMALL} intro={false} />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
