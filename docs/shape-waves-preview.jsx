import { createRoot } from "react-dom/client";
import { ShapeWaves } from "../src/react/index.js";

/* The standalone preview — three poses of the shape field on the dark
   canvas: the default mixed grid, a text-masked variant, and a fine
   square grid with a hot accent. Sweep the cursor to launch ripples. */
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
      <ShapeWaves shapes="mixed" speed={0.8} glow={0.35} />
    </div>
    <div style={{ position: "relative", flex: 1, minHeight: 260 }}>
      <ShapeWaves text="SOLAR" shapes="circles" cellSize={12} color="#5b8cff" hoverColor="#ffffff" speed={0.5} glow={0.5} />
    </div>
    <div style={{ position: "relative", flex: 1, minHeight: 260 }}>
      <ShapeWaves shapes="triangles" cellSize={8} dotSize={0.6} color="#ff5fa2" hoverColor="#ffd9a8" speed={1.4} glow={0.6} fade={0} />
    </div>
  </div>,
);
