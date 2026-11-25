import { createRoot } from "react-dom/client";
import { PlasmaWave } from "../src/react/index.js";

/* The standalone preview — the violet/cyan pair flowing with the cursor,
   and beneath it a magenta/amber pair running against itself, tilted. */
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
      <PlasmaWave colors={["#A855F7", "#06B6D4"]} speed={1} mouseInteraction />
    </div>
    <div style={{ width: "min(920px, 92vw)", height: 300, position: "relative" }}>
      <PlasmaWave colors={["#ff3d81", "#ffb347"]} speed={0.8} dir2={-1} bend1={1.3} bend2={0.9} rotationDeg={-8} mouseInteraction={false} />
    </div>
  </div>,
);
