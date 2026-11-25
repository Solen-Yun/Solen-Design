import { createRoot } from "react-dom/client";
import { CRTWarp } from "../src/react/index.js";

/* The standalone preview — the violet default screen and a green
   phosphor terminal variant. Clicking rolls either channel over with
   static; the cursor twists the beams like a magnet. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "#0c0a10",
    }}
  >
    <div style={{ position: "relative", flex: 1, minHeight: 260 }}>
      <CRTWarp color="#c755f7" backgroundColor="#120f17" />
    </div>
    <div style={{ position: "relative", flex: 1, minHeight: 260 }}>
      <CRTWarp
        color="#5dff9e"
        backgroundColor="#0a120c"
        waveFrequency={3.4}
        levels={4}
        columns={110}
        persistence={0.55}
        mask="slot"
        scanlineStrength={0.75}
        bloom={2.2}
        interference={0.3}
      />
    </div>
  </div>,
);
