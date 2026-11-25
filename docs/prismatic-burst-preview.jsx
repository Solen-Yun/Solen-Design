import { createRoot } from "react-dom/client";
import { PrismaticBurst } from "../src/react/index.js";

/* The standalone preview — the tumbling spectral burst answering the cursor
   and clicks, and beneath it a combed 10-ray palette variant with a twist. */
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
      <PrismaticBurst animationType="rotate3d" mouseInteraction clickBurst glow={0.6} />
    </div>
    <div style={{ width: "min(920px, 92vw)", height: 300, position: "relative" }}>
      <PrismaticBurst
        colors={["#ff3d81", "#ffd166", "#4cc9f0"]}
        animationType="rotate"
        rayCount={10}
        rayWidth={1.4}
        twist={1.2}
        flow={0.6}
        mouseInteraction={false}
      />
    </div>
  </div>,
);
