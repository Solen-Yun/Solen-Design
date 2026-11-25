import { createRoot } from "react-dom/client";
import { SplashCursor } from "../src/react/index.js";

/* 独立预览 — 深色画布上两个容器面板：暗色彩虹墨水 + 泛光，亮色主题的
   白底吸墨；在面板内划动搅出漩涡，点击砸出花瓣泼溅。 */

function Panel({ theme, settings, hint }) {
  const dark = theme === "dark";
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "min(100%, 720px)",
        height: 260,
        borderRadius: 16,
        overflow: "hidden",
        background: dark ? "#0c0c10" : "#f5f5f7",
        color: dark ? "#52525b" : "#a1a1aa",
        fontSize: 13,
        letterSpacing: "0.08em",
        flexShrink: 0,
      }}
    >
      {hint}
      <SplashCursor contained theme={theme} {...settings} />
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
      gap: 44,
      background: "#101014",
    }}
  >
    <Panel
      theme="dark"
      hint="暗色 · 彩虹墨水 + 泛光"
      settings={{ rainbow: true, glow: 0.4, swirl: 4, trail: 1.3, quality: "high" }}
    />
    <Panel
      theme="light"
      hint="亮色 · 白底吸墨 + 固定调色板"
      settings={{ rainbow: false, colors: ["#2563eb", "#0d9488"], swirl: 3, quality: "high" }}
    />
  </div>,
);
