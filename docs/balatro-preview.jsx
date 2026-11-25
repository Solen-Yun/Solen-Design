import { createRoot } from "react-dom/client";
import { Balatro } from "../src/react/index.js";

/* The standalone preview — the classic paint, a CRT-tinted take and a
   high-contrast fine-grain take on the dark canvas; drag to stir. */
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
      <Balatro />
    </div>
    <div style={{ width: "min(100%, 960px)", height: 300, display: "flex", gap: 24 }}>
      <div style={{ flex: 1, position: "relative" }}>
        <Balatro color1="#f2a33c" color2="#3b6bff" color3="#171221" crt={0.8} pixelSize={3} />
      </div>
      <div style={{ flex: 1, position: "relative" }}>
        <Balatro color1="#9fd356" color2="#2c8c7d" color3="#101a16" contrast={6} scale={2.2} detail={7} swirl={0.5} rotationSpeed={2} />
      </div>
    </div>
  </div>,
);
