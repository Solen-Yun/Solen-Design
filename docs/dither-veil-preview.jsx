import { createRoot } from "react-dom/client";
import { DitherVeil } from "../src/react/index.js";

/* The standalone preview — the same inline scene printed three ways:
   error diffusion, coarse blue noise, and an engraving-lines variant
   with rim dots; sweep the pointer to burn through to full colour. */

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
      <DitherVeil src={PHOTO} pattern="floyd" pixelSize={3} revealRadius={220} wander />
    </div>
    <div style={{ width: "min(92vw, 720px)", aspectRatio: "3 / 2" }}>
      <DitherVeil src={PHOTO} pattern="noise" pixelSize={7} palette="rgb" rim={0.35} rimColor="#a78bfa" revealRadius={180} />
    </div>
  </div>,
);
