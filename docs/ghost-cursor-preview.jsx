import { createRoot } from "react-dom/client";
import { GhostCursor } from "../src/react/index.js";

/* 幽魂烟雾光标：上方的淡紫烟跟着光标走、停下后升腾消散；
   下方青色一档更湍急、颗粒更重，点击任意位置炸出烟团。 */
createRoot(document.getElementById("root")).render(
  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", gap: 48, background: "#101014" }}>
    <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
      <GhostCursor color="#B497CF" size={88} trailLength={60} drift={0.35} />
    </div>
    <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
      <GhostCursor color="#8ee6f2" size={56} trailLength={36} turbulence={1.1} detail={1} grainIntensity={0.12} intro={false} />
    </div>
  </div>,
);
