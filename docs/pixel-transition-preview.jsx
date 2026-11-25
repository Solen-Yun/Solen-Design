import { createRoot } from "react-dom/client";
import { PixelTransition } from "../src/react/index.js";

/* 独立预览 — 深色画布上三张方卡：默认随机弹出、Bayer 抖纹 + 马赛克圆形
   生长、指针涟漪擦除；悬停每张卡看像素盖满再揭开。 */

function Card({ settings, front, back }) {
  return (
    <PixelTransition
      trigger="hover"
      firstContent={
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, width: "100%", height: "100%", background: front.tone, color: "#fff" }}>
          <div style={{ fontSize: 40 }} aria-hidden="true">{front.glyph}</div>
          <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.06em" }}>{front.title}</div>
        </div>
      }
      secondContent={
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, width: "100%", height: "100%", background: back.tone, color: "#fff" }}>
          <div style={{ fontSize: 40 }} aria-hidden="true">{back.glyph}</div>
          <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.06em" }}>{back.title}</div>
        </div>
      }
      {...settings}
    />
  );
}

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      gap: 44,
      background: "#101014",
    }}
  >
    <Card
      settings={{ gridSize: 10, pixelColor: "#ffffff", pattern: "random", pixelAnimation: "pop" }}
      front={{ glyph: "🎬", title: "随机弹出", tone: "linear-gradient(140deg, #6366f1 0%, #a855f7 100%)" }}
      back={{ glyph: "⚡", title: "已切换", tone: "linear-gradient(140deg, #0f172a 0%, #155e75 100%)" }}
    />
    <Card
      settings={{ gridSize: 16, pixelColor: "#fbbf24", mosaic: 0.5, pattern: "dither", pixelAnimation: "grow", pixelShape: "circle", gap: 2 }}
      front={{ glyph: "🌙", title: "抖纹生长", tone: "linear-gradient(140deg, #1e293b 0%, #4c1d95 100%)" }}
      back={{ glyph: "☀️", title: "Bayer 次序", tone: "linear-gradient(140deg, #b45309 0%, #f59e0b 100%)" }}
    />
    <Card
      settings={{ gridSize: 12, pixelColor: "#7dd3fc", pattern: "ripple", pixelAnimation: "fade", pixelShape: "rounded", randomness: 0.15 }}
      front={{ glyph: "💧", title: "指针涟漪", tone: "linear-gradient(140deg, #0e7490 0%, #164e63 100%)" }}
      back={{ glyph: "🌊", title: "从落点扩散", tone: "linear-gradient(140deg, #4338ca 0%, #7e22ce 100%)" }}
    />
  </div>,
);
