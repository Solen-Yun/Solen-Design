import { createRoot } from "react-dom/client";
import { Lightfall } from "../src/react/index.js";

/* 独立预览 — 光瀑隧道铺满整屏：移动鼠标折弯光束，按住画面冲入光瀑。 */
createRoot(document.getElementById("root")).render(
  <div style={{ position: "fixed", inset: 0, background: "#101014" }}>
    <Lightfall colors={["#ffffff"]} speed={0.3} />
  </div>,
);
