import { createRoot } from "react-dom/client";
import { LightPillar } from "../src/react/index.js";

/* 独立预览 — 光柱旋涡铺满整屏：移动鼠标看柱身倾斜，点击送出上行光环。 */
createRoot(document.getElementById("root")).render(
  <div style={{ position: "fixed", inset: 0, background: "#050507" }}>
    <LightPillar topColor="#5227FF" bottomColor="#FF9FFC" />
  </div>,
);
