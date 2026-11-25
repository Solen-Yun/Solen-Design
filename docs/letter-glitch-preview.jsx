import { createRoot } from "react-dom/client";
import { LetterGlitch } from "../src/react/index.js";

/* 独立预览 — 字符场铺满整屏：快速划动搅起乱码与火花，点击撕裂字面。 */
createRoot(document.getElementById("root")).render(
  <div style={{ position: "fixed", inset: 0, background: "#101014" }}>
    <LetterGlitch glitchColors={["#ffffff", "#61dca3"]} fontSize={14} />
  </div>,
);
