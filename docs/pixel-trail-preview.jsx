import { createRoot } from "react-dom/client";
import { PixelTrail } from "../src/react/index.js";

/* 像素流体拖尾：上方的白色像素泥跟着光标融化流动、受重力下淌；
   下方菱形硬边像素走双色渐变，老化时抖动消失。 */
createRoot(document.getElementById("root")).render(
  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", gap: 40, background: "#101014" }}>
    <div style={{ flex: 1 }}>
      <PixelTrail gridSize={44} trailSize={0.1} maxAge={300} gooeyFilter={{ strength: 2 }} color="#ffffff" flow={0.5} gravity={0.3} clickBurst={true} />
    </div>
    <div style={{ height: 220 }}>
      <PixelTrail
        gridSize={56}
        trailSize={0.08}
        maxAge={500}
        gooeyFilter={null}
        shape="diamond"
        decay="dither"
        gap={0.14}
        color="#fbbf24"
        trailColor="#fde68a"
        shine={0.8}
        glow={0.3}
        sparkle={0.25}
        clickBurst={true}
      />
    </div>
  </div>,
);
