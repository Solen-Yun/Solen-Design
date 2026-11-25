import { createRoot } from "react-dom/client";
import { Hyperspeed } from "../src/react/index.js";

/* 独立预览 — 夜路光尾铺满整屏：移动鼠标转向，按住任意处冲刺，
   光尾拉长、视场推宽，松手缓缓回落。 */
createRoot(document.getElementById("root")).render(
  <div style={{ position: "fixed", inset: 0, background: "#050507" }}>
    <Hyperspeed theme="dark" curve="winding" />
  </div>,
);
