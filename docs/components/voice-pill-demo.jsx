import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as VoicePill } from "../../src/components/voice-pill/VoicePill.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Press to record; the capsule swells and the bars ride the envelope. */

const DEFAULTS = {
  size: 28,
  shape: "pill",
  reach: 8,
  showTime: true,
  waveform: true,
  slideToCancel: true,
  cancelDistance: 64,
  attack: 40,
  release: 240,
  sensitivity: 1,
  floor: 0.1,
  openDuration: 200,
  pressScale: 0.95,
  mode: "auto",
  holdAfter: 300,
  reactive: "simulated",
  accentColor: "#f5f5f5",
  background: "#27272a",
  disabled: false,
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

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const [last, setLast] = useState("—");
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => {
    setOpts(DEFAULTS);
    setLast("—");
  };

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 40, width: "100%", height: 200, color: "#f5f5f5" }}>
            <VoicePill
              size={opts.size}
              shape={opts.shape}
              reach={opts.reach}
              showTime={opts.showTime}
              waveform={opts.waveform}
              slideToCancel={opts.slideToCancel}
              cancelDistance={opts.cancelDistance}
              attack={opts.attack}
              release={opts.release}
              sensitivity={opts.sensitivity}
              floor={opts.floor}
              openDuration={opts.openDuration}
              pressScale={opts.pressScale}
              mode={opts.mode}
              holdAfter={opts.holdAfter}
              reactive={opts.reactive}
              accentColor={opts.accentColor}
              background={opts.background}
              disabled={opts.disabled}
              ariaLabel="录音"
              onStart={() => setLast("录音中")}
              onStop={(info) => setLast(`${info.reason} · ${(info.duration / 1000).toFixed(1)}s`)}
            />
            <output style={{ fontSize: 13, opacity: 0.6 }} aria-live="polite">
              {last}
            </output>
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./voice-pill-preview.html">
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
          <Slider label="按钮直径" value={opts.size} min={20} max={48} step={2} format={(v) => `${v}px`} onChange={(size) => set({ size })} />
          <Slider label="伸出距离" value={opts.reach} min={0} max={24} step={1} format={(v) => `${v}px`} onChange={(reach) => set({ reach })} />
          <Slider label="取消距离" value={opts.cancelDistance} min={24} max={140} step={4} format={(v) => `${v}px`} onChange={(cancelDistance) => set({ cancelDistance })} />
          <Slider label="起音" value={opts.attack} min={5} max={200} step={5} format={(v) => `${v}ms`} onChange={(attack) => set({ attack })} />
          <Slider label="释放" value={opts.release} min={60} max={600} step={10} format={(v) => `${v}ms`} onChange={(release) => set({ release })} />
          <Slider label="增益" value={opts.sensitivity} min={0.2} max={3} step={0.1} format={(v) => v.toFixed(1)} onChange={(sensitivity) => set({ sensitivity })} />
          <Slider label="波形底高" value={opts.floor} min={0} max={0.5} step={0.02} format={(v) => v.toFixed(2)} onChange={(floor) => set({ floor })} />
          <Slider label="展开时长" value={opts.openDuration} min={60} max={500} step={10} format={(v) => `${v}ms`} onChange={(openDuration) => set({ openDuration })} />
          <ControlRow label="说话模式">
            <div className="view-tabs">
              {[["auto", "自动"], ["hold", "按住"], ["tap", "轻点"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.mode === id ? "active" : ""} onClick={() => set({ mode: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="电平来源">
            <div className="view-tabs">
              {[["simulated", "模拟"], ["mic", "麦克风"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.reactive === id ? "active" : ""} onClick={() => set({ reactive: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="胶囊形状">
            <div className="view-tabs">
              {[["pill", "全圆"], ["rounded", "圆角"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.shape === id ? "active" : ""} onClick={() => set({ shape: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="计时">
            <Switch checked={opts.showTime} onChange={(showTime) => set({ showTime })} label="计时" />
          </ControlRow>
          <ControlRow label="波形">
            <Switch checked={opts.waveform} onChange={(waveform) => set({ waveform })} label="波形" />
          </ControlRow>
          <ControlRow label="滑动取消">
            <Switch checked={opts.slideToCancel} onChange={(slideToCancel) => set({ slideToCancel })} label="滑动取消" />
          </ControlRow>
          <Color label="强调色" value={opts.accentColor} onChange={(accentColor) => set({ accentColor })} />
          <ControlRow label="禁用">
            <Switch checked={opts.disabled} onChange={(disabled) => set({ disabled })} label="禁用" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — one idle pill on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div style={{ display: "grid", placeItems: "center", width: "100%", height: 170, background: "#101014", color: "#f5f5f5" }}>
        <VoicePill size={30} ariaLabel="录音" />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
