import { createRoot } from "react-dom/client";
import { ShapeGrid } from "../src/react/index.js";

/* The standalone preview — a tilted rainbow hexagon wall the spotlight can
   chase across, and a flat square wall with twinkle and click cascades. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 48,
      background: "#101014",
    }}
  >
    <div style={{ width: "min(920px, 92vw)", height: 440, position: "relative" }}>
      <ShapeGrid shape="hexagon" cellSize={36} tiltX={22} tiltY={-35} rainbow hoverColor="#8be9fd" glow={0.5} trail={0.7} direction="none" speed={0} clickCascade />
    </div>
    <div style={{ width: "min(920px, 92vw)", height: 300, position: "relative" }}>
      <ShapeGrid cellSize={44} direction="diagonal" speed={0.5} lineColor="#3a3746" hoverColor="#ffffff" twinkle={0.4} glow={0.35} clickCascade />
    </div>
  </div>,
);
