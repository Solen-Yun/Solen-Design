import { createRoot } from "react-dom/client";
import { Dither } from "../src/react/index.js";

/* 独立预览 — 深色画布上三块抖动波纹：8×8 Bayer 经典款、半调圆点淡紫、
   编织斜纹调色板；分别划过与点击看轨迹和冲击环。 */

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 32,
      background: "#101014",
    }}
  >
    <div style={{ position: "relative", width: "min(100%, 720px)", height: 220 }}>
      <Dither waveColor={[0.9, 0.9, 0.95]} backgroundColor={[0, 0, 0]} ditherMode="bayer" pixelSize={3} colorNum={4} waveSpeed={0.06} />
    </div>
    <div style={{ position: "relative", width: "min(100%, 720px)", height: 220 }}>
      <Dither waveColor={[0.85, 0.7, 1]} backgroundColor={[0.02, 0.02, 0.05]} ditherMode="halftone" pixelSize={5} colorNum={3} waveSpeed={0.04} contrast={1.4} />
    </div>
    <div style={{ position: "relative", width: "min(100%, 720px)", height: 220 }}>
      <Dither waveColor={[0.4, 0.9, 0.8]} backgroundColor={[0, 0, 0]} ditherMode="crosshatch" pixelSize={4} colorNum={2} waveSpeed={0.1} brightness={0.1} />
    </div>
  </div>,
);
