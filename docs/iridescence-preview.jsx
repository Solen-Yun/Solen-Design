import { createRoot } from "react-dom/client";
import { Iridescence } from "../src/react/index.js";

/* 独立预览 — 虹彩液面铺满整屏：划过搅动褶皱，点击旋出涡旋。 */
createRoot(document.getElementById("root")).render(
  <div style={{ position: "fixed", inset: 0, background: "#101014" }}>
    <Iridescence color="#ffffff" speed={1} />
  </div>,
);
