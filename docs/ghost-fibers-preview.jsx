import { createRoot } from "react-dom/client";
import { GhostFibers } from "../src/react/index.js";

/* The standalone preview — violet dots, cyan dashes and warm lines, three
   weaves stacked on the dark canvas; hover to pull focus, click for pulses. */
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
    <div style={{ position: "relative", width: "min(880px, 92vw)", height: 300 }}>
      <GhostFibers glowColor="#8b5cf6" fiberStyle="dots" gradient="depth" />
    </div>
    <div style={{ position: "relative", width: "min(880px, 92vw)", height: 300 }}>
      <GhostFibers glowColor="#38bdf8" fiberStyle="dashes" gradient="along" speed={0.7} sparkle={0.9} />
    </div>
    <div style={{ position: "relative", width: "min(880px, 92vw)", height: 300 }}>
      <GhostFibers glowColor="#fb923c" fiberStyle="lines" gradient="across" twist={2.1} tips={0.6} />
    </div>
  </div>,
);
