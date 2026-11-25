import { createRoot } from "react-dom/client";
import { Beams } from "../src/react/index.js";

/* The standalone preview — the default dark river, a steep twisted take and
   an ink-on-white light mode on the dark canvas; move the cursor along the beams. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 24,
      background: "#0a0a0d",
    }}
  >
    <div style={{ width: "min(100%, 960px)", height: 380 }}>
      <Beams />
    </div>
    <div style={{ width: "min(100%, 960px)", height: 300, display: "flex", gap: 24 }}>
      <div style={{ flex: 1, position: "relative", background: "#f4f4f2" }}>
        <Beams lightMode color="#3b6bff" beamWidth={70} rotation={90} sharpness={0.8} />
      </div>
      <div style={{ flex: 1, position: "relative" }}>
        <Beams color="#ffd39b" beamWidth={60} rotation={-25} twist={1.2} waveLength={120} depth={2} variation={7} />
      </div>
    </div>
  </div>,
);
