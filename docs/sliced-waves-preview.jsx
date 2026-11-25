import { createRoot } from "react-dom/client";
import { SlicedWaves } from "../src/react/index.js";

/* The standalone preview — three palettes of the sliced light field on
   the dark canvas: the default warm-to-cool sweep, a mint-ice scheme cut
   into slices, and a violet dusk with thin bars. The cursor refocuses the
   depth of field in each. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "#101014",
    }}
  >
    <div style={{ position: "relative", flex: 1, minHeight: 260 }}>
      <SlicedWaves color1="#ffd9a8" color2="#ff5fa2" color3="#5b8cff" />
    </div>
    <div style={{ position: "relative", flex: 1, minHeight: 260 }}>
      <SlicedWaves color1="#d9fff2" color2="#5be7c0" color3="#2b7cff" slices={6} ribbons={2} spacing={34} speed={0.7} />
    </div>
    <div style={{ position: "relative", flex: 1, minHeight: 260 }}>
      <SlicedWaves color1="#ffb8f0" color2="#a45cff" color3="#2b1a5e" ribbons={4} barWidth={0.3} amplitude={0.16} glow={1.4} position={0.4} />
    </div>
  </div>,
);
