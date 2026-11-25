import { createRoot } from "react-dom/client";
import { DotField } from "../src/react/index.js";

/* 独立预览 — 深色画布上三片透镜点阵：方格经典紫粉、黄金角螺旋青蓝、
   散点琥珀带波动；划过看透镜放大与光池，按住撑大透镜。 */

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
    <div style={{ position: "relative", width: "min(100%, 720px)", height: 220 }}>
      <DotField pattern="grid" gradientFrom="#5227FF" gradientTo="#FF9FFC" dotSpacing={13} sparkle={true} glowIntensity={1} />
    </div>
    <div style={{ position: "relative", width: "min(100%, 720px)", height: 220 }}>
      <DotField pattern="spiral" gradientFrom="#0fb8c9" gradientTo="#3757ff" dotSpacing={15} bulgeStrength={0.9} twist={40} glowRadius={200} />
    </div>
    <div style={{ position: "relative", width: "min(100%, 720px)", height: 220 }}>
      <DotField pattern="scatter" gradientFrom="#ff9d45" gradientTo="#ff5470" dotSpacing={16} waveAmplitude={14} speed={1.4} glowIntensity={0.6} />
    </div>
  </div>,
);
