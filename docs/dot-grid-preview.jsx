import { createRoot } from "react-dom/client";
import { DotGrid } from "../src/react/index.js";

/* The standalone preview — the default dark jelly grid and a tight
   bright teal variant with square dots. Strokes drag the dots into
   glowing wakes; clicks fire decaying shockwaves on both. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "#161420",
    }}
  >
    <div style={{ position: "relative", flex: 1, minHeight: 260 }}>
      <DotGrid dotSize={5} gap={18} bounce={0.6} tension={0.4} />
    </div>
    <div style={{ position: "relative", flex: 1, minHeight: 260 }}>
      <DotGrid
        dotSize={4}
        gap={12}
        baseColor="#0e3f3a"
        activeColor="#8dfff0"
        shape="square"
        tension={0.8}
        bounce={0.9}
        glow={1.2}
        shockStrength={8}
        fade={0.2}
      />
    </div>
  </div>,
);
