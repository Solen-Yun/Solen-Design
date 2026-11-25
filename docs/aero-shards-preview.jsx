import { createRoot } from "react-dom/client";
import { AeroShards } from "../src/react/index.js";

/* The standalone preview — the full ribbon field, a ring placement and a
   chrome light-mode take on the dark canvas; click for shockwaves. */
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
      <AeroShards />
    </div>
    <div style={{ width: "min(100%, 960px)", height: 300, display: "flex", gap: 24 }}>
      <div style={{ flex: 1, position: "relative" }}>
        <AeroShards placement="center" speed={0.6} scale={1.2} />
      </div>
      <div style={{ flex: 1, position: "relative" }}>
        <AeroShards material="chrome" lightMode shardColor="#6d84c9" accentColor="#3b6bff" placement="left" />
      </div>
    </div>
  </div>,
);
