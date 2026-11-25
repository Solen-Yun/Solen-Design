import { createRoot } from "react-dom/client";
import { Aurora } from "../src/react/index.js";

/* The standalone preview — a tall three-layer curtain, a bottom-hung take
   and a light-mode ink curtain on the dark canvas. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 24,
      background: "#101014",
    }}
  >
    <div style={{ width: "min(100%, 960px)", height: 380 }}>
      <Aurora layers={3} height={0.55} amplitude={1.2} glow={0.8} />
    </div>
    <div style={{ width: "min(100%, 960px)", height: 300, display: "flex", gap: 24 }}>
      <div style={{ flex: 1, position: "relative" }}>
        <Aurora colorStops={["#ff5c7a", "#ffb35c", "#ff5c7a"]} direction="bottom" height={0.6} layers={2} />
      </div>
      <div style={{ flex: 1, position: "relative", background: "#f4f4f2" }}>
        <Aurora lightMode colorStops={["#1f7aff", "#0ff2b2", "#1f7aff"]} layers={2} />
      </div>
    </div>
  </div>,
);
