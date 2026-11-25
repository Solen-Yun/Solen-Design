import { createRoot } from "react-dom/client";
import { RippleDistortion } from "../src/react/index.js";

/* The standalone preview — the lake scene twice: a wide high-quality
   pool with glinting crests, and a tight tinted one; sweep the pointer. */

const PHOTO = `./assets/demo-photos/photo-01.jpg`;

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
    <div style={{ width: "min(92vw, 720px)", aspectRatio: "3 / 2" }}>
      <RippleDistortion src={PHOTO} quality="high" strength={0.24} glint={0.6} brushSize={180} fade={4} />
    </div>
    <div style={{ width: "min(92vw, 720px)", aspectRatio: "3 / 2" }}>
      <RippleDistortion src={PHOTO} quality="medium" strength={0.3} swirl={2} rings={2} tint="#ff6b4a" tintAmount={0.45} grayscale={false} trigger="click" clickStrength={2.5} />
    </div>
  </div>,
);
