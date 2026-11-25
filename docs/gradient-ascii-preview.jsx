import { createRoot } from "react-dom/client";
import { GradientASCII } from "../src/react/index.js";

/* The standalone preview — horizon, eclipse and a pinch of warm glyphs on
   the dark canvas; sweep the cursor to scramble the characters. */
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
    <div style={{ position: "relative", width: "min(880px, 92vw)", height: 280 }}>
      <GradientASCII shape="horizon" cellSize={18} />
    </div>
    <div style={{ position: "relative", width: "min(880px, 92vw)", height: 280 }}>
      <GradientASCII
        shape="eclipse"
        colors={["#4a0e2e", "#f6f8ff", "#fda4af", "#fb7185"]}
        variation={7}
        flicker={0.3}
      />
    </div>
    <div style={{ position: "relative", width: "min(880px, 92vw)", height: 280, background: "#f4f4f5" }}>
      <GradientASCII shape="pinch" lightMode={true} colors={["#1e3fd8", "#5227ff"]} />
    </div>
  </div>,
);
