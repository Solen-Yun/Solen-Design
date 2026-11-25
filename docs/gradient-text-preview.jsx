import { createRoot } from "react-dom/client";
import { GradientText } from "../src/react/index.js";

/* The standalone preview — the three living gradients stacked on the dark
   canvas: a sliding linear sweep, a drifting blob mesh, and a swinging conic
   fan; the middle one follows the pointer. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 56,
      background: "#101014",
    }}
  >
    <GradientText variant="linear" angle={100} scale={3} glow={0.4} style={{ fontSize: 56, fontWeight: 800 }}>
      Gradient flow
    </GradientText>
    <GradientText variant="flow" followPointer glow={0.6} style={{ fontSize: 72, fontWeight: 800 }}>
      Living colour
    </GradientText>
    <GradientText variant="conic" scale={4} showBorder style={{ fontSize: 48, fontWeight: 800 }}>
      Conic fan
    </GradientText>
  </div>,
);
