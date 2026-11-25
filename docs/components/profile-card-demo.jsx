import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as ProfileCard } from "../../src/components/profile-card/ProfileCard.jsx";

/* The demo plus a live customize panel — every control is a real option.
   Move the pointer to tilt the card, swap the backdrop to retune the foil. */


const svgPattern = () =>
  `./assets/demo-photos/photo-02.jpg`;

const PHOTO = "./assets/demo-photos/photo-01.jpg";
const PATTERN = svgPattern();

const DEFAULTS = {
  theme: "dark",
  backdropColor: undefined,
  holo: 0.8,
  glare: 0.5,
  enableTilt: true,
  tiltStrength: 12,
  parallax: 8,
  radius: 16,
  showUserInfo: true,
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
  const set = (patch) => setOpts((prev) => ({ ...prev, ...patch }));
  const reset = () => setOpts(DEFAULTS);

  return (
    <>
      <div className="demo-stage" style={{ background: "#101014", colorScheme: "dark" }}>
        <DemoFit>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: 480 }}>
            <ProfileCard
              avatarUrl={PHOTO}
              iconUrl={PATTERN}
              name="林晚星"
              title="界面工程师 · Solen Design"
              handle="wanxing"
              status="在线"
              statusColor="#22c55e"
              contactText="联系"
              theme={opts.theme}
              backdropColor={opts.backdropColor || undefined}
              holo={opts.holo}
              glare={opts.glare}
              enableTilt={opts.enableTilt}
              tiltStrength={opts.tiltStrength}
              parallax={opts.parallax}
              radius={opts.radius}
              showUserInfo={opts.showUserInfo}
              onContactClick={() => console.log("contact")}
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./profile-card-preview.html">
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
          <ControlRow label="主题">
            <div className="view-tabs">
              {[["dark", "深色"], ["light", "浅色"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.theme === id ? "active" : undefined} onClick={() => set({ theme: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Color label="底板颜色" value={opts.backdropColor || "#3a3644"} onChange={(backdropColor) => set({ backdropColor })} />
          <ControlRow label="重置底色">
            <Switch checked={Boolean(opts.backdropColor)} onChange={(on) => set({ backdropColor: on ? "#3a3644" : undefined})} label="重置底色" />
          </ControlRow>
          <Slider label="全息强度" value={opts.holo} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(holo) => set({ holo })} />
          <Slider label="眩光" value={opts.glare} min={0} max={1} step={0.05} format={(v) => v.toFixed(2)} onChange={(glare) => set({ glare })} />
          <Slider label="最大倾角" value={opts.tiltStrength} min={0} max={25} step={1} format={(v) => `${v}°`} onChange={(tiltStrength) => set({ tiltStrength })} />
          <Slider label="照片视差" value={opts.parallax} min={0} max={20} step={1} format={(v) => `${v}px`} onChange={(parallax) => set({ parallax })} />
          <Slider label="圆角" value={opts.radius} min={0} max={32} step={2} format={(v) => `${v}px`} onChange={(radius) => set({ radius })} />
          <ControlRow label="倾斜">
            <Switch checked={opts.enableTilt} onChange={(enableTilt) => set({ enableTilt })} label="倾斜" />
          </ControlRow>
          <ControlRow label="页脚">
            <Switch checked={opts.showUserInfo} onChange={(showUserInfo) => set({ showUserInfo })} label="页脚" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — dark and light cards side by side on the dark stage. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: 32,
          width: "100%",
          height: 260,
          background: "#101014",
        }}
      >
        {["dark", "light"].map((theme) => (
          <div key={theme} style={{ width: 245, height: 290, position: "relative" }}>
            <div style={{ width: 340, transform: "scale(0.72)", transformOrigin: "top left" }}>
              <ProfileCard
                avatarUrl={PHOTO}
                iconUrl={PATTERN}
                name="林晚星"
                title="界面工程师"
                handle="wanxing"
                status="在线"
                contactText="联系"
                theme={theme}
                intro={false}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { Demo, CardPreview };
