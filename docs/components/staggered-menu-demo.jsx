import { useState } from "react";
import { DemoFit } from "../demo-fit";
import { default as StaggeredMenu } from "../../src/components/staggered-menu/StaggeredMenu.jsx";

/* The demo plus a live customize panel — every control is a real option.
   The menu opens inside a relative stage, so the panel slides within it. */

const ITEMS = [
  { label: "首页", link: "#", ariaLabel: "首页" },
  { label: "组件", link: "#", ariaLabel: "组件" },
  { label: "风格", link: "#", ariaLabel: "风格" },
  { label: "文档", link: "#", ariaLabel: "文档" },
];

const SOCIALS = [
  { label: "Email", link: "#" },
  { label: "Blog", link: "#" },
  { label: "Feed", link: "#" },
];

const DEFAULTS = {
  position: "right",
  accentColor: "#5227FF",
  displayItemNumbering: true,
  displaySocials: true,
  changeMenuColorOnOpen: true,
  closeOnClickAway: true,
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
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 300,
              overflow: "hidden",
              background: "#18181b",
              borderRadius: 16,
            }}
          >
            <StaggeredMenu
              position={opts.position}
              items={ITEMS}
              socialItems={SOCIALS}
              accentColor={opts.accentColor}
              displayItemNumbering={opts.displayItemNumbering}
              displaySocials={opts.displaySocials}
              changeMenuColorOnOpen={opts.changeMenuColorOnOpen}
              closeOnClickAway={opts.closeOnClickAway}
              menuButtonColor="#ffffff"
              openMenuButtonColor="#18181b"
            />
          </div>
        </DemoFit>
      </div>
      <div className="demo-actions">
        <a href="./staggered-menu-preview.html">
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
          <ControlRow label="滑入侧">
            <div className="view-tabs">
              {[["right", "右侧"], ["left", "左侧"]].map(([id, label]) => (
                <button key={id} type="button" className={opts.position === id ? "active" : ""} onClick={() => set({ position: id })}>
                  {label}
                </button>
              ))}
            </div>
          </ControlRow>
          <Color label="强调色" value={opts.accentColor} onChange={(accentColor) => set({ accentColor })} />
          <ControlRow label="条目序号">
            <Switch checked={opts.displayItemNumbering} onChange={(displayItemNumbering) => set({ displayItemNumbering })} label="条目序号" />
          </ControlRow>
          <ControlRow label="Socials 区">
            <Switch checked={opts.displaySocials} onChange={(displaySocials) => set({ displaySocials })} label="Socials 区" />
          </ControlRow>
          <ControlRow label="开合换色">
            <Switch checked={opts.changeMenuColorOnOpen} onChange={(changeMenuColorOnOpen) => set({ changeMenuColorOnOpen })} label="开合换色" />
          </ControlRow>
          <ControlRow label="外部点击关闭">
            <Switch checked={opts.closeOnClickAway} onChange={(closeOnClickAway) => set({ closeOnClickAway })} label="外部点击关闭" />
          </ControlRow>
        </div>
      </div>
    </>
  );
}

/* Gallery card — the menu resting closed on a dark stage, ready to open. */
function CardPreview() {
  return (
    <div className="comp-zoom">
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 170,
          overflow: "hidden",
          background: "#18181b",
        }}
      >
        <StaggeredMenu
          items={ITEMS}
          socialItems={SOCIALS}
          accentColor="#5227FF"
          menuButtonColor="#ffffff"
          openMenuButtonColor="#18181b"
        />
      </div>
    </div>
  );
}

export { Demo, CardPreview };
