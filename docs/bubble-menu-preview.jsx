import { createRoot } from "react-dom/client";
import { BubbleMenu } from "../src/react/index.js";

/* The standalone preview — two positioned stages on the dark canvas with
   different palettes; press the round toggle to burst the pill field. */
const items = [
  { label: "home", href: "#", ariaLabel: "Home", rotation: -8, hoverStyles: { bgColor: "#3b82f6", textColor: "#ffffff" } },
  { label: "about", href: "#", ariaLabel: "About", rotation: 8, hoverStyles: { bgColor: "#10b981", textColor: "#ffffff" } },
  { label: "projects", href: "#", ariaLabel: "Work", rotation: 8, hoverStyles: { bgColor: "#f59e0b", textColor: "#ffffff" } },
  { label: "blog", href: "#", ariaLabel: "Blog", rotation: -8, hoverStyles: { bgColor: "#ef4444", textColor: "#ffffff" } },
  { label: "contact", href: "#", ariaLabel: "Contact", rotation: 8, hoverStyles: { bgColor: "#8b5cf6", textColor: "#ffffff" } },
];

const darkItems = items.map((item, index) => ({
  ...item,
  rotation: index % 2 ? 6 : -6,
  hoverStyles: {
    bgColor: ["#5227FF", "#B497CF", "#22d3ee", "#f472b6", "#a3e635"][index % 5],
    textColor: "#101014",
  },
}));

function Stage({ background, ink, children, hint }) {
  return (
    <div
      style={{
        position: "relative",
        width: "min(760px, 92vw)",
        height: 340,
        overflow: "hidden",
        borderRadius: 18,
        background,
        boxShadow: "0 24px 60px -30px rgba(0, 0, 0, 0.9)",
      }}
    >
      {children}
      <span
        style={{
          position: "absolute",
          left: 24,
          bottom: 16,
          color: ink,
          fontSize: 13,
          letterSpacing: "0.08em",
          pointerEvents: "none",
        }}
      >
        {hint}
      </span>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 48,
      background: "#101014",
    }}
  >
    <Stage background="#eef0f4" ink="rgba(24,24,27,0.5)" hint="白底胶囊 · 点右上圆钮展开">
      <BubbleMenu
        logo={<span style={{ fontWeight: 700, fontSize: 17, color: "#111" }}>◐ studio</span>}
        items={items}
      />
    </Stage>
    <Stage background="linear-gradient(135deg, #1d1b26 0%, #26232e 100%)" ink="rgba(255,255,255,0.4)" hint="深底胶囊 · 换一套悬停配色">
      <BubbleMenu
        logo={<span style={{ fontWeight: 700, fontSize: 17, color: "#f5f5f5" }}>◐ solen</span>}
        items={darkItems}
        menuBg="#26232e"
        menuContentColor="#f5f5f5"
        animationDuration={0.6}
        staggerDelay={0.09}
      />
    </Stage>
  </div>,
);
