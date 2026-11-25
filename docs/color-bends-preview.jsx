import { createRoot } from "react-dom/client";
import { ColorBends } from "../src/react/index.js";

/* The standalone preview — the default bend field, a molten take and an
   RGB split on the dark canvas; move the cursor to pull the domain. */
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
      <ColorBends />
    </div>
    <div style={{ width: "min(100%, 960px)", height: 300, display: "flex", gap: 24 }}>
      <div style={{ flex: 1, position: "relative" }}>
        <ColorBends colors={["#3d1f00", "#ffb347", "#ffe28a"]} rotation={35} iterations={3} warpStrength={0.6} scale={1.4} />
      </div>
      <div style={{ flex: 1, position: "relative" }}>
        <ColorBends colors={[]} iterations={4} frequency={1.6} speed={0.35} />
      </div>
    </div>
  </div>,
);
