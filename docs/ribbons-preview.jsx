import { createRoot } from "react-dom/client";
import { Ribbons } from "../src/react/index.js";

/* 弹簧丝带拖尾：上方的蓝紫三色丝带绕光标甩动、快速画圈会回弹；
   下方彗尾轮廓的暖色丝带带波浪起伏和尾部渐隐。 */
createRoot(document.getElementById("root")).render(
  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", gap: 40, background: "#101014" }}>
    <div style={{ flex: 1 }}>
      <Ribbons colors={["#3847ff", "#7c84ff", "#c7cbff"]} thickness={34} length={1.6} spread={20} wave={0.25} />
    </div>
    <div style={{ height: 220 }}>
      <Ribbons colors={["#ff8a5f", "#ffd166"]} thickness={24} shape="comet" length={2.2} spread={30} bounce={0.3} wave={0.5} fade={true} />
    </div>
  </div>,
);
