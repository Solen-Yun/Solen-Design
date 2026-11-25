import { createRoot } from "react-dom/client";
import { Ballpit } from "../src/react/index.js";

/* The standalone preview — a candy pit, a frosted-metal take and a deep
   zero-gravity float on the dark canvas; drag to shove, click to burst. */
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
      <Ballpit count={260} colors={["#ffd93d", "#ff6b6b", "#4d96ff", "#6bd98b"]} />
    </div>
    <div style={{ width: "min(100%, 960px)", height: 300, display: "flex", gap: 24 }}>
      <div style={{ flex: 1, position: "relative" }}>
        <Ballpit count={120} colors={["#dfe7f5", "#9fb4d8"]} material="metal" minSize={0.4} maxSize={0.9} lightColor="#aac4ff" />
      </div>
      <div style={{ flex: 1, position: "relative" }}>
        <Ballpit count={90} colors={["#7cd6ff", "#c7a4ff"]} material="frosted" gravity={0} drift={1.5} depth={4} />
      </div>
    </div>
  </div>,
);
