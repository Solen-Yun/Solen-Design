import { createRoot } from "react-dom/client";
import { Radar } from "../src/react/index.js";

/* The standalone preview — a flat phosphor scope with the cursor as a
   contact, and a tilted amber pulse-mode scope beneath it. */
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
    <div style={{ width: "min(760px, 92vw)", height: 440, position: "relative" }}>
      <Radar mouseInteraction />
    </div>
    <div style={{ width: "min(760px, 92vw)", height: 300, position: "relative" }}>
      <Radar color="#ffb347" mode="pulse" tilt={28} targets={4} clutter={0.2} mouseInteraction={false} />
    </div>
  </div>,
);
