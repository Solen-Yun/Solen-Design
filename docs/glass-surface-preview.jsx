import { createRoot } from "react-dom/client";
import { default as GlassSurface } from "../src/components/glass-surface/GlassSurface.jsx";

/* 独立预览 — 内联渐变画布上三块玻璃：圆角面板、异形徽章轮廓玻璃、
   长条工具条；边缘折射带色散，背后图案透过玻璃弯曲。 */
const BADGE = "./assets/wallpaper-02.jpg";

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      gap: 48,
      padding: "48px 24px",
      background:
        "radial-gradient(circle at 20% 25%, #f97316 0%, transparent 45%), radial-gradient(circle at 80% 30%, #38bdf8 0%, transparent 50%), radial-gradient(circle at 55% 90%, #a855f7 0%, transparent 45%), linear-gradient(120deg, #1e293b, #312e81)",
    }}
  >
    <GlassSurface width={340} height={150} borderRadius={28}>
      <span style={{ fontSize: 17, fontWeight: 600, color: "#ffffff", textShadow: "0 1px 8px rgba(0,0,0,0.45)" }}>液态玻璃面板</span>
    </GlassSurface>
    <GlassSurface shape={BADGE} width={190} height={190} brightness={62} blur={9}>
      <span style={{ width: 1, height: 1, overflow: "hidden" }}>徽章玻璃</span>
    </GlassSurface>
    <GlassSurface width={280} height={64} borderRadius={32} distortionScale={-120} blur={14}>
      <span style={{ fontSize: 13, fontWeight: 500, color: "#ffffff", opacity: 0.9, textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}>refraction · dispersion · frost</span>
    </GlassSurface>
  </div>,
);
