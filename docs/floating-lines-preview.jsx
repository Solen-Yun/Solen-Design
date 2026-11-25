import { createRoot } from "react-dom/client";
import { FloatingLines } from "../src/react/index.js";

/* The standalone preview — the magenta-white default weave and a teal
   variant with dashed styling. The cursor bends lines on both; strokes
   of the mouse twist the field in their direction. */
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
      <FloatingLines linesGradient={["#e945f5", "#ffffff"]} lineCount={12} />
    </div>
    <div style={{ position: "relative", flex: 1, minHeight: 260 }}>
      <FloatingLines
        linesGradient={["#19d3c5", "#eafffb"]}
        lineCount={16}
        lineDistance={4}
        lineStyle="dashed"
        glow={1.6}
        brightness={1.3}
        middleWavePosition={{ rotate: -0.5 }}
        bottomWavePosition={{ rotate: 0.8 }}
      />
    </div>
  </div>,
);
