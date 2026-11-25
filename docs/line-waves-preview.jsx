import { createRoot } from "react-dom/client";
import { LineWaves } from "../src/react/index.js";

/* 独立预览 — 线浪光带铺满整屏：移动鼠标推开线条，点击落下扩散涟漪。 */
createRoot(document.getElementById("root")).render(
  <div style={{ position: "fixed", inset: 0, background: "#07070b" }}>
    <LineWaves color1="#7c5cff" color2="#00e0ff" color3="#ff4fd8" rotation={-33} />
  </div>,
);
