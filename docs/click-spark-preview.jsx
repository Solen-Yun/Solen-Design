import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { ClickSpark } from "../src/react/index.js";

/* 独立预览 — 深色画布上三种火花姿态：默认线段、彗星加光晕圆环、星星加大随机与重力；
   挂载时各炸一发，页面上任意点击也会溅射。 */

function Pose({ shape, colors, settings, label }) {
  const sparkRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => sparkRef.current?.spark(), 450);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ position: "relative", width: "min(100%, 760px)", height: 220 }}>
      <ClickSpark ref={sparkRef} shape={shape} sparkColor={colors} {...settings}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, width: "100%", height: "100%", color: "#e4e4e7", fontSize: 14, letterSpacing: "0.06em" }}>
          {label}
        </div>
      </ClickSpark>
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
      gap: 40,
      background: "#101014",
    }}
  >
    <Pose shape="line" colors="#ffffff" settings={{ sparkRadius: 34, sparkCount: 10 }} label="线段 · 默认" />
    <Pose shape="streak" colors={["#ffffff", "#fbbf24", "#f472b6"]} settings={{ sparkRadius: 42, sparkCount: 12, glow: 0.6, ring: true }} label="彗星 · 光晕与圆环" />
    <Pose shape="star" colors={["#fde68a", "#fca5a5"]} settings={{ sparkRadius: 38, sparkCount: 12, randomness: 0.5, gravity: 0.6 }} label="星星 · 重力下坠" />
  </div>,
);
