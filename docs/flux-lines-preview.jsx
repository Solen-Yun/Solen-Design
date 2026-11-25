import { createRoot } from "react-dom/client";
import { FluxLines } from "../src/react/index.js";

/* The standalone preview — white-blue filaments over deep dark, and a
   warm amber variant. The magnet bends lines as the cursor passes;
   clicking twists either field into a decaying vortex. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "#101014",
    }}
  >
    <div style={{ position: "relative", flex: 1, minHeight: 260 }}>
      <FluxLines colors={["#ffffff", "#9fd8ff", "#3b6cff"]} speed={0.5} glow={2} />
    </div>
    <div style={{ position: "relative", flex: 1, minHeight: 260 }}>
      <FluxLines
        colors={["#ffb26b", "#ff5a36", "#ffd9a0"]}
        speed={0.8}
        scale={2.4}
        turbulence={1.6}
        rimWidth={0.35}
        glow={3}
        lineWidth={0}
      />
    </div>
  </div>,
);
