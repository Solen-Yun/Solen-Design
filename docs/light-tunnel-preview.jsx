import { createRoot } from "react-dom/client";
import { LightTunnel } from "../src/react/index.js";

/* 独立预览 — 光纤彗星隧道铺满整屏：移动鼠标牵引轴向，点击送出涌动光环。 */
createRoot(document.getElementById("root")).render(
  <div style={{ position: "fixed", inset: 0, background: "#07070b" }}>
    <LightTunnel cableColor="#8892b0" pulseColor="#8be9fd" />
  </div>,
);
