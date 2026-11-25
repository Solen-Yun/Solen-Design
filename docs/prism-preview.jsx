import { createRoot } from "react-dom/client";
import { Prism } from "../src/react/index.js";

/* The standalone preview — the built-in spectral prism wobbling on its axis,
   and beneath it a tumbling prism wearing a custom sunset palette. */
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
      <Prism animationType="rotate" interactive />
    </div>
    <div style={{ width: "min(920px, 92vw)", height: 300, position: "relative" }}>
      <Prism colors={["#8b5cf6", "#ec4899", "#f59e0b", "#22d3ee"]} animationType="rotate3d" timeScale={0.6} colorFrequency={0.8} interactive={false} />
    </div>
  </div>,
);
