import { createRoot } from "react-dom/client";
import { DarkVeil } from "../src/react/index.js";

/* 独立预览 — 深色画布上三匹丝绸光：经典紫罗兰、青蓝高扭曲、琥珀高光泽；
   指针划过看空间被局部弯折、纹理被拉丝。 */

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 40,
      background: "#101014",
    }}
  >
    <div style={{ position: "relative", width: "min(100%, 720px)", height: 240 }}>
      <DarkVeil color="#6b12ff" glow={0.5} sheen={0.5} />
    </div>
    <div style={{ position: "relative", width: "min(100%, 720px)", height: 240 }}>
      <DarkVeil color="#0fb8c9" warp={1.2} rotation={45} scale={0.8} speed={0.7} />
    </div>
    <div style={{ position: "relative", width: "min(100%, 720px)", height: 240 }}>
      <DarkVeil color="#ff9d45" sheen={1.2} glow={0.25} brightness={1.2} flow={1.6} />
    </div>
  </div>,
);
