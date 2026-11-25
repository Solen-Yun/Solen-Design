import { createRoot } from "react-dom/client";
import { PixelBlast } from "../src/react/index.js";

/* The standalone preview — three clouds on one dark canvas: the default
   violet dither, a tilted teal diamond field with auto ripples, and a
   tight amber triangle cloud with heavy jitter. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 32,
      background: "#101014",
    }}
  >
    <div style={{ position: "relative", width: "min(860px, 92vw)", height: 280 }}>
      <PixelBlast />
    </div>
    <div style={{ position: "relative", width: "min(860px, 92vw)", height: 260 }}>
      <PixelBlast
        variant="diamond"
        color="#67e8f9"
        accentColor="#e0f2fe"
        pixelSize={4}
        tiltX={35}
        tiltY={-10}
        autoRipple={2.5}
        glow={0.8}
      />
    </div>
    <div style={{ position: "relative", width: "min(860px, 92vw)", height: 220 }}>
      <PixelBlast
        variant="triangle"
        color="#f5a524"
        accentColor="#fff7ed"
        pixelSize={2}
        pixelSizeJitter={0.5}
        patternScale={3.5}
        twinkle={0.5}
      />
    </div>
  </div>,
);
