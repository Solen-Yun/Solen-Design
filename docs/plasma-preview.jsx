import { createRoot } from "react-dom/client";
import { Plasma } from "../src/react/index.js";

/* The standalone preview — the default grey-lavender satin, and beneath it
   an icy-blue pingpong variant with a tighter twist. */
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
      <Plasma speed={1} mouseInteractive />
    </div>
    <div style={{ width: "min(920px, 92vw)", height: 300, position: "relative" }}>
      <Plasma color="#7fd4ff" direction="pingpong" twist={1.6} softness={0.65} shine={1.3} mouseInteractive={false} />
    </div>
  </div>,
);
