import { createRoot } from "react-dom/client";
import { AcidSquares } from "../src/react/index.js";

/* The standalone preview — the dark glossy floor plus a light-mode and a
   round-tile take side by side on the dark canvas; click to throw ripples. */
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
      <AcidSquares />
    </div>
    <div style={{ width: "min(100%, 960px)", height: 300, display: "flex", gap: 24 }}>
      <div style={{ flex: 1, position: "relative" }}>
        <AcidSquares lightMode accentColor="#7c5cff" shape="round" rotation={0} zoom={1.4} />
      </div>
      <div style={{ flex: 1, position: "relative" }}>
        <AcidSquares lighting="backlit" tileSize={2.2} rotation={70} zoom={0.8} />
      </div>
    </div>
  </div>,
);
