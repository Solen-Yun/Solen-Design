import { createRoot } from "react-dom/client";
import { SoftAurora } from "../src/react/index.js";

/* The standalone preview — three skies on the dark canvas: the classic
   magenta curtain, a green-teal low band, and a tilted pastel pair. The
   curtain drifts with the cursor and clicks send light stripes. */
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
      <SoftAurora color1="#f7f7f7" color2="#e100ff" bandHeight={0.55} />
    </div>
    <div style={{ position: "relative", flex: 1, minHeight: 260 }}>
      <SoftAurora color1="#baf7c9" color2="#19d3a2" bandHeight={0.3} bandSpread={1.6} noiseFrequency={3.2} speed={0.4} />
    </div>
    <div style={{ position: "relative", flex: 1, minHeight: 260 }}>
      <SoftAurora color1="#ffd9ec" color2="#6f5cff" tilt={-18} bandHeight={0.45} spectrum={0.7} brightness={1.2} />
    </div>
  </div>,
);
