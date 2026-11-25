import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { SideRays, Counter, SpecularButton, CurvedLoop } from "../src/react/index.js";

/* The home cover — a fixed full-viewport ray-fan layer behind the wordmark,
   with an odometer counter running from 2024-01-18 under it. Output follows
   the workbench theme: dark pages get the glow output, light pages the
   tinted-ink one (lightMode). theme.js currently pins the workbench to
   light, so the ink output is what shows; restoring dual themes brings the
   dark cover back on its own. */

const readTheme = () => {
  const pinned = document.documentElement.dataset.theme;
  if (pinned) return pinned;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

function useTheme() {
  const [theme, setTheme] = useState(readTheme);
  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(readTheme()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setTheme(readTheme());
    scheme.addEventListener?.("change", onChange);
    return () => {
      observer.disconnect();
      scheme.removeEventListener?.("change", onChange);
    };
  }, []);
  return theme;
}

function HomeRays() {
  const theme = useTheme();
  return (
    <SideRays
      rayColor1="#FFC46B"
      rayColor2="#96c8ff"
      origin="top-right"
      speed={2.5}
      intensity={2}
      spread={2}
      density={5}
      followMouse={true}
      lightMode={theme !== "dark"}
    />
  );
}

/* Elapsed time since the project's start date, ticking once a second. The
   tile look mirrors the counter demo; colours flip with the cover theme. */
const START = new Date(2023, 0, 18);

const TILE_LIGHT = {
  background: "#ffffff",
  borderRadius: 12,
  padding: "8px 6px",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.05)",
};
const TILE_DARK = {
  background: "#1b1b20",
  borderRadius: 12,
  padding: "8px 6px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.08)",
};

function CountUnit({ value, pad, tile, ink }) {
  return (
    <Counter
      value={value}
      minDigits={pad ? 2 : undefined}
      fontSize={40}
      fontWeight={700}
      textColor={ink}
      digitStyle={tile}
    />
  );
}

function CountSeparator({ ink }) {
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        height: 56,
        fontSize: 26,
        fontWeight: 700,
        color: ink,
        opacity: 0.3,
      }}
    >
      :
    </span>
  );
}

function HomeCounter() {
  const theme = useTheme();
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dark = theme === "dark";
  const ink = dark ? "#f0f0f0" : "#18181b";
  const tile = dark ? TILE_DARK : TILE_LIGHT;
  const left = Math.max(0, now - START.getTime());
  const parts = {
    days: Math.floor(left / 86400000),
    hours: Math.floor(left / 3600000) % 24,
    minutes: Math.floor(left / 60000) % 60,
    seconds: Math.floor(left / 1000) % 60,
  };

  return (
    <div style={{ display: "grid", justifyItems: "center", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <CountUnit value={parts.days} tile={tile} ink={ink} />
        <CountSeparator ink={ink} />
        <CountUnit value={parts.hours} pad tile={tile} ink={ink} />
        <CountSeparator ink={ink} />
        <CountUnit value={parts.minutes} pad tile={tile} ink={ink} />
        <CountSeparator ink={ink} />
        <CountUnit value={parts.seconds} pad tile={tile} ink={ink} />
      </div>
      <p style={{ margin: 0, fontSize: 12, color: ink, opacity: 0.45 }}>Solen 团队自 2023 年 1 月 18 日存在至今</p>
    </div>
  );
}

/* The cover's CTA row — one specular button per site section, each jumping
   straight to its page. */
const SECTIONS = [
  { label: "网站风格", href: "./style.html" },
  { label: "UI 组件", href: "./components.html" },
  { label: "文档", href: "./docs.html" },
];

function HomeCta() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
      {SECTIONS.map((section) => (
        <SpecularButton
          key={section.href}
          size="md"
          radius={18}
          tint="#18181b"
          tintOpacity={1}
          textColor="#fafafa"
          lineColor="#ffffff"
          baseColor="#3f3f46"
          intensity={1}
          idleIntensity={0.35}
          shineSize={10}
          shineFade={34}
          thickness={1.2}
          glow={1}
          followMouse
          proximity={250}
          onClick={() => {
            window.location.href = section.href;
          }}
        >
          {section.label}
        </SpecularButton>
      ))}
    </div>
  );
}

/* The cover's bottom ticker — an arc pinned to the viewport edge, dipping
   toward the middle. Colour rides on currentColor via the wrapper, so it
   follows the theme. */
function HomeMarquee() {
  return (
    <CurvedLoop
      marqueeText="Be ✦ Creative ✦ With ✦ Solen ✦ Design ✦"
      shape="arc"
      curveAmount={240}
      speed={2}
      direction="left"
      fontSize={60}
      fontWeight={700}
      edgeFade={0.2}
      interactive={true}
    />
  );
}

createRoot(document.getElementById("home-rays")).render(<HomeRays />);
createRoot(document.getElementById("home-counter")).render(<HomeCounter />);
createRoot(document.getElementById("home-cta")).render(<HomeCta />);
createRoot(document.getElementById("home-marquee")).render(<HomeMarquee />);
