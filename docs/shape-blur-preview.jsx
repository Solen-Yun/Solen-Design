import { createRoot } from "react-dom/client";
import { ShapeBlur } from "../src/react/index.js";

/* The standalone preview — a star outline and an image-silhouette bolt,
   both racked focus; the lens chases the pointer and drifts when idle. */

const BOLT = "./assets/demo-photos/photo-01.jpg";

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 36,
      background: "#101014",
    }}
  >
    <div style={{ width: "min(92vw, 640px)", aspectRatio: "16 / 9" }}>
      <ShapeBlur shape="star" sides={5} thickness={2.5} blur={18} color="#e0e7ff" size={0.5} chroma={0.45} />
    </div>
    <div style={{ width: "min(92vw, 640px)", aspectRatio: "16 / 9" }}>
      <ShapeBlur src={BOLT} thickness={3} blur={22} color="#7dd3fc" size={0.55} fill={false} echoes={2} spacing={16} />
    </div>
  </div>,
);
