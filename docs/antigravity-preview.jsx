import { createRoot } from "react-dom/client";
import { Antigravity } from "../src/react/index.js";

/* The standalone preview — the default field, a sphere take and a bright
   light-mode palette on the dark canvas; move the cursor to lift the ring. */
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
      <Antigravity />
    </div>
    <div style={{ width: "min(100%, 960px)", height: 300, display: "flex", gap: 24 }}>
      <div style={{ flex: 1, position: "relative", background: "#f4f4f2" }}>
        <Antigravity particleShape="sphere" lightMode colorMode="radial" colors={["#2f6bff", "#b04df0", "#2f6bff"]} interactive={false} />
      </div>
      <div style={{ flex: 1, position: "relative" }}>
        <Antigravity particleShape="box" rotationSpeed={1.2} waveCount={5} count={2500} interactive={false} />
      </div>
    </div>
  </div>,
);
