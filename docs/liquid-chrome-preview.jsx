import { createRoot } from "react-dom/client";
import { LiquidChrome } from "../src/react/index.js";

/* 独立预览 — 液态铬波铺满整屏：在铬面上划动压出水痕，点击按出深坑。 */
createRoot(document.getElementById("root")).render(
  <div style={{ position: "fixed", inset: 0, background: "#050507" }}>
    <LiquidChrome color="#ffffff" speed={0.2} />
  </div>,
);
