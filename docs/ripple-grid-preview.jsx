import { createRoot } from "react-dom/client";
import { RippleGrid } from "../src/react/index.js";

/* The standalone preview — a flat white line grid answering the cursor,
   and beneath it a tilted cyan dot grid seen in perspective. */
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
      <RippleGrid variant="lines" mouseInteraction clickRipple />
    </div>
    <div style={{ width: "min(920px, 92vw)", height: 300, position: "relative" }}>
      <RippleGrid variant="dots" color="#4cc9f0" tilt={35} rotation={30} cellSize={36} autoRipple="random" rippleInterval={2} mouseInteraction={false} />
    </div>
  </div>,
);
