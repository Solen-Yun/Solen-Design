import { createRoot } from "react-dom/client";
import { GlitchText } from "../src/react/index.js";

/* The standalone preview — three patterns stacked on the dark canvas:
   classic slice tearing with red/cyan shadows, full-frame RGB split, and
   a scanline sweep with a trailing band. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 64,
      background: "#101014",
    }}
  >
    <GlitchText mode="slices" intensity={0.55} speed={0.5} offset={10} color="#f4f4f5" fontSize="clamp(2.5rem, 7vw, 4.5rem)">
      故障切片
    </GlitchText>
    <GlitchText mode="rgb" intensity={0.6} speed={0.6} offset={12} color="#f4f4f5" fontSize="clamp(2.5rem, 7vw, 4.5rem)">
      RGB SPLIT
    </GlitchText>
    <GlitchText mode="scan" intensity={0.5} speed={0.4} offset={14} flicker color="#a5b4fc" fontSize="clamp(2.5rem, 7vw, 4.5rem)">
      SCANLINE
    </GlitchText>
  </div>,
);
