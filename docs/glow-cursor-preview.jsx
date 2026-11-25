import { createRoot } from "react-dom/client";
import { GlowCursor } from "../src/react/index.js";

/* 柔光光标：整页是流体光场——上方的蓝紫光带跟着光标走、慢慢冷却成暖色余晖；
   下方窄条用更宽的暖色光带和更强的白热核心，点击任意位置炸出光羽。 */
createRoot(document.getElementById("root")).render(
  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", gap: 40, background: "#101014" }}>
    <div style={{ flex: 1 }}>
      <GlowCursor color="#5f8bff" secondaryColor="#ff8a5f" intensity={1.4} trailWidth={3.5} linger={2} glow={1.4} />
    </div>
    <div style={{ height: 220 }}>
      <GlowCursor color="#ffc46b" secondaryColor="#ff5f8a" intensity={1.8} trailWidth={6} linger={1.2} glow={1} hotspot={1.4} followSpeed={0.8} />
    </div>
  </div>,
);
