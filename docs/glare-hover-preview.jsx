import { createRoot } from "react-dom/client";
import { GlareHover } from "../src/react/index.js";

/* 独立预览 — 三种轮廓并排：单光、双光、柔光幕，移入面板看光带
   顺着光标来向扫过，注意 1px 边框上同步滑过的滑光。 */

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
      color: "#e4e4e7",
    }}
  >
    <h2 style={{ margin: 0, fontSize: 32, letterSpacing: "-0.03em" }}>Sweep the light across</h2>
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 28 }}>
      <GlareHover
        width={280}
        height={180}
        background="linear-gradient(135deg, #1e1b4b 0%, #4c1d95 45%, #831843 100%)"
        borderRadius="16px"
        glareColor="#ffffff"
        glareOpacity={0.55}
        variant="streak"
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", height: "100%" }}>
          <span style={{ fontSize: 34 }} aria-hidden="true">✦</span>
          <span style={{ fontSize: 15 }}>单光 · streak</span>
        </div>
      </GlareHover>
      <GlareHover
        width={280}
        height={180}
        background="linear-gradient(135deg, #0e7490 0%, #155e75 50%, #312e81 100%)"
        borderRadius="16px"
        glareColor="#a5f3fc"
        glareOpacity={0.6}
        variant="twin"
        glareAngle={-30}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", height: "100%" }}>
          <span style={{ fontSize: 34 }} aria-hidden="true">❄</span>
          <span style={{ fontSize: 15 }}>双光 · twin</span>
        </div>
      </GlareHover>
      <GlareHover
        width={280}
        height={180}
        background="linear-gradient(135deg, #7c2d12 0%, #b45309 55%, #facc15 130%)"
        borderRadius="16px"
        glareColor="#fff7ed"
        glareOpacity={0.5}
        variant="sheen"
        glareSize={40}
        glareAngle={20}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", height: "100%" }}>
          <span style={{ fontSize: 34 }} aria-hidden="true">☾</span>
          <span style={{ fontSize: 15 }}>柔光幕 · sheen</span>
        </div>
      </GlareHover>
    </div>
  </div>,
);
