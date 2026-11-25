import { createRoot } from "react-dom/client";
import { MetaBalls } from "../src/react/index.js";

/* 液态融合球：上方白色球群环绕游走、青色光标球追指针；
   中间熔岩灯编排叠出三层；下方描线变体只剩拉丝的边缘。 */
createRoot(document.getElementById("root")).render(
  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#101014" }}>
    <div style={{ position: "relative", flex: 1 }}>
      <MetaBalls color="#ffffff" cursorBallColor="#8ee6f2" speed={0.35} ballCount={16} cursorBallSize={3.2} />
    </div>
    <div style={{ position: "relative", flex: 1 }}>
      <MetaBalls color="#f0abfc" cursorBallColor="#ffffff" motion="lava" speed={0.28} ballCount={12} clumpFactor={0.75} gooeyness={0.62} stickiness={0.65} intro={false} />
    </div>
    <div style={{ position: "relative", flex: 1 }}>
      <MetaBalls color="#8ee6f2" cursorBallColor="#fbbf24" variant="outline" motion="drift" speed={0.4} ballCount={14} lineWidth={1.5} intro={false} />
    </div>
  </div>,
);
