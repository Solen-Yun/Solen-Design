import { createRoot } from "react-dom/client";
import { PixelSwap } from "../src/react/index.js";

/* 独立预览 — 深色画布上三张卡：指针起点的默认波、螺旋 + 圆角 + 自旋、
   随机次序 + 起始缩放 + 高过冲；从不同角落进出看波浪换起点。 */

function Card({ settings, front, back }) {
  return (
    <PixelSwap
      trigger="hover"
      style={{ borderRadius: 16 }}
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
    <div style={{ width: "min(100%, 380px)" }}>
      <Card
        settings={{ pattern: "pointer", pixelSize: 48, duration: 400, bounce: 0.3 }}
        front={{ glyph: "🧩", title: "指针波", tone: "linear-gradient(140deg, #312e81 0%, #6d28d9 100%)" }}
        back={{ glyph: "🚀", title: "从落点荡开", tone: "linear-gradient(140deg, #134e4a 0%, #0f766e 100%)" }}
      />
    </div>
    <div style={{ width: "min(100%, 380px)" }}>
      <Card
        settings={{ pattern: "spiral", pixelSize: 36, pixelRadius: 20, pixelSpin: 120, duration: 550, bounce: 0.45 }}
        front={{ glyph: "🌀", title: "螺旋 + 自旋", tone: "linear-gradient(140deg, #1e3a8a 0%, #0e7490 100%)" }}
        back={{ glyph: "✨", title: "圆角落定", tone: "linear-gradient(140deg, #9d174d 0%, #be185d 100%)" }}
      />
    </div>
    <div style={{ width: "min(100%, 380px)" }}>
      <Card
        settings={{ pattern: "random", pixelSize: 60, pixelScale: 0.35, gap: 4, randomness: 0.6, bounce: 0.7, duration: 700 }}
        front={{ glyph: "🎲", title: "随机次序", tone: "linear-gradient(140deg, #7c2d12 0%, #b45309 100%)" }}
        back={{ glyph: "🎪", title: "高过冲弹跳", tone: "linear-gradient(140deg, #065f46 0%, #10b981 100%)" }}
      />
    </div>
  </div>,
);
