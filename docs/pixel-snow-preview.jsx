import { createRoot } from "react-dom/client";
import { PixelSnow } from "../src/react/index.js";

/* The standalone preview — classic white snowflakes over the dark canvas,
   and beneath it a warm square-sprite variant piling up on the floor. */
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
      <PixelSnow variant="snowflake" density={0.5} pixelSize={3} glow={0.8} twinkle={0.35} />
    </div>
    <div style={{ width: "min(920px, 92vw)", height: 300, position: "relative" }}>
      <PixelSnow variant="square" color="#ffd9a0" density={0.6} pixelSize={4} accumulate glow={0.6} wind={-0.2} />
    </div>
  </div>,
);
