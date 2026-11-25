import { createRoot } from "react-dom/client";
import { Lightning } from "../src/react/index.js";

/* 独立预览 — 双色闪电并立：移动鼠标看电弧倾向与热度，点击任意处唤雷。 */
createRoot(document.getElementById("root")).render(
  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#0a0a10" }}>
    <div style={{ position: "relative", flex: 1, minHeight: 380 }}>
      <Lightning color="#4d6bff" bolts={1} />
    </div>
    <div style={{ position: "relative", flex: 1, minHeight: 380 }}>
      <Lightning color="#b34dff" bolts={2} spread={0.5} branches={0.7} />
    </div>
  </div>,
);
