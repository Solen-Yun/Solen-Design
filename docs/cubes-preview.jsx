import { createRoot } from "react-dom/client";
import { Cubes } from "../src/react/index.js";

/* The standalone preview — a perspective and an orthographic grid side by
   side on the dark canvas; cubes turn to face the cursor, click for ripples. */
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
    <div style={{ width: "min(92vw, 560px)", height: 320 }}>
      <Cubes gridSize={10} perspective={0.45} maxAngle={50} intro={false} />
    </div>
    <div style={{ width: "min(92vw, 560px)", height: 300 }}>
      <Cubes gridSize={12} edgeStyle="dotted" edgeWidth={1.5} rippleColor="#8ee6f2" intro={false} />
    </div>
  </div>,
);
