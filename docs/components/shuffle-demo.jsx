import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as Shuffle } from "../../src/components/shuffle/Shuffle.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The scroll trigger fires while the stage is in view; switch triggerOnce
   off and scroll the page away and back to re-fire, or sweep the pointer
   across the glyphs with a hover radius. */

const DIRECTIONS = [
  { id: "right", label: "右" },
  { id: "left", label: "左" },
  { id: "up", label: "上" },
  { id: "down", label: "下" },
];

const CHARSETS = [
  { id: "", label: "原字" },
  { id: "01", label: "01" },
  { id: "@#%&*", label: "@#%&*" },
];

const DEFAULTS = {
  effect: "slide",
  shuffleDirection: "right",
  animationMode: "evenodd",
  duration: 0.35,
  shuffleTimes: 1,
  stagger: 0.03,
  scrambleCharset: "",
  hoverRadius: 0,
  accent: false,
  loop: false,
  motionBlur: false,
  triggerOnce: true,
  respectReducedMotion: true,
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

function Demo() {
  const [opts, setOpts] = useState(DEFAULTS);
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: 220,
              color: "#e4e4e7",
            }}
          >
            <Shuffle
              text="Solen Shuffle"
              shuffleDirection={opts.shuffleDirection}
              duration={opts.duration}
              ease="power3.out"
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              shuffleTimes={opts.shuffleTimes}
              animationMode={opts.animationMode}
              loop={opts.loop}
              loopDelay={0.6}
              stagger={opts.stagger}
              scrambleCharset={opts.scrambleCharset}
              accentColor={opts.accent ? "#ffb03d" : undefined}
              triggerOnce={opts.triggerOnce}
              respectReducedMotion={opts.respectReducedMotion}
              triggerOnHover={true}
              effect={opts.effect}
              hoverRadius={opts.hoverRadius}
              motionBlur={opts.motionBlur}
              onShuffleComplete={() => console.log("settled")}
              style={{ fontSize: 42 }}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./shuffle-preview.html">
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
          <ControlRow label="效果">
            <div className="view-tabs">
              {[
                ["slide", "滑带"],
                ["flip", "翻转"],
                ["blur", "模糊"],
              ].map(([id, label]) => (
                <button key={id} type="button" className={opts.effect === id ? "active" : ""} onClick={() => set({ effect: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="方向">
            <div className="view-tabs">
              {DIRECTIONS.map((item) => (
                <button key={item.id} type="button" className={opts.shuffleDirection === item.id ? "active" : ""} onClick={() => set({ shuffleDirection: item.id })}>
                  {item.label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="起始分布">
            <div className="view-tabs">
              {[
                ["evenodd", "奇偶"],
                ["center", "中心"],
                ["sequence", "顺序"],
                ["random", "随机"],
              ].map(([id, label]) => (
                <button key={id} type="button" className={opts.animationMode === id ? "active" : ""} onClick={() => set({ animationMode: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <ControlRow label="乱码字符集">
            <div className="view-tabs">
              {CHARSETS.map((item) => (
                <button key={item.id} type="button" className={opts.scrambleCharset === item.id ? "active" : ""} onClick={() => set({ scrambleCharset: item.id })}>
                  {item.label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Slider label="滚动时长" value={opts.duration} min={0.15} max={1} step={0.05} format={(v) => `${v.toFixed(2)}s`} onChange={(duration) => set({ duration })} />
          <Slider label="滚过位数" value={opts.shuffleTimes} min={1} max={6} step={1} format={(v) => String(v)} onChange={(shuffleTimes) => set({ shuffleTimes })} />
          <Slider label="错峰" value={opts.stagger} min={0} max={0.12} step={0.01} format={(v) => `${v.toFixed(2)}s`} onChange={(stagger) => set({ stagger })} />
          <Slider label="悬停半径" value={opts.hoverRadius} min={0} max={120} step={10} format={(v) => `${v}px`} onChange={(hoverRadius) => set({ hoverRadius })} />
          <ControlRow label="乱码高亮色">
            <Switch checked={opts.accent} onChange={(accent) => set({ accent })} label="乱码高亮色" />
          </ControlRow>
          <ControlRow label="循环">
            <Switch checked={opts.loop} onChange={(loop) => set({ loop })} label="循环" />
          </ControlRow>
          <ControlRow label="滚动模糊">
            <Switch checked={opts.motionBlur} onChange={(motionBlur) => set({ motionBlur })} label="滚动模糊" />
          </ControlRow>
          <ControlRow label="只触发一次">
            <Switch checked={opts.triggerOnce} onChange={(triggerOnce) => set({ triggerOnce })} label="只触发一次" />
          </ControlRow>
          <ControlRow label="遵守弱动效">
            <Switch checked={opts.respectReducedMotion} onChange={(respectReducedMotion) => set({ respectReducedMotion })} label="遵守弱动效" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the arcade roll with an accent colour, fired on view. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: 170,
          padding: "0 20px",
          background: "#101014",
          colorScheme: "dark",
        }}
      >
        <Shuffle
          text="SHUFFLE"
          duration={0.4}
          shuffleTimes={2}
          stagger={0.04}
          scrambleCharset="01"
          accentColor="#ffb03d"
          triggerOnHover={false}
          style={{ fontSize: 36, color: "#e4e4e7" }}
        />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
