import { createRoot } from "react-dom/client";
import { Noise } from "../src/react/index.js";

/* 独立预览 — 深色画布上三张渐变「照片」：细腻 35mm 颗粒、带灰尘与划痕的
   放映胶片、高对比彩色电视雪花加扫描线；三层颗粒质感一眼对比。 */

function Frame({ label, tone, settings }) {
  return (
    <div style={{ position: "relative", width: "min(100%, 460px)", height: 220, overflow: "hidden", borderRadius: 14, flexShrink: 0 }}>
      <div style={{ position: "absolute", inset: 0, background: tone }} />
      <div
        style={{
          position: "absolute",
          left: 20,
          bottom: 16,
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.08em",
          color: "#f5f2ea",
          textShadow: "0 2px 8px rgba(10, 14, 20, 0.6)",
        }}
      >
        {label}
      </div>
      <Noise {...settings} />
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
      gap: 36,
      background: "#101014",
    }}
  >
    <Frame
      label="细腻颗粒 · 35mm"
      tone="radial-gradient(120% 100% at 70% 10%, #ffe3b8 0%, #e08e5f 38%, #7c4258 72%, #2c2233 100%)"
      settings={{ opacity: 0.22, size: 1, fps: 24, blendMode: "overlay", contrast: 0.6 }}
    />
    <Frame
      label="灰尘划痕 · 放映厅"
      tone="radial-gradient(130% 110% at 25% 15%, #a8c8dc 0%, #4c7699 40%, #22344c 78%, #0f1822 100%)"
      settings={{ opacity: 0.35, dust: 0.5, scratches: 0.3, flicker: 0.2, blendMode: "overlay" }}
    />
    <Frame
      label="电视雪花 · 静噪"
      tone="linear-gradient(160deg, #3d4653 0%, #171c24 60%, #0a0d12 100%)"
      settings={{ opacity: 0.55, fps: 30, contrast: 1, colored: true, scanlines: 0.5, flicker: 0.35, blendMode: "normal" }}
    />
  </div>,
);
