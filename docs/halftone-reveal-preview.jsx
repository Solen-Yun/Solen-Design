import { createRoot } from "react-dom/client";
import { HalftoneReveal } from "../src/react/index.js";

/* The standalone preview — the same inline dawn scene printed three ways:
   classic mono dots, a duotone with off-register plates, and a CMYK
   process print; sweep the pointer to develop the real photo. */

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
    <div style={{ width: "min(92vw, 700px)", aspectRatio: "3 / 2" }}>
      <HalftoneReveal src={PHOTO} mode="mono" cellSize={7} revealRadius={180} wander />
    </div>
    <div style={{ width: "min(92vw, 700px)", aspectRatio: "3 / 2" }}>
      <HalftoneReveal src={PHOTO} mode="color" shape="ellipse" cellSize={9} misregistration={0.4} revealRadius={160} />
    </div>
  </div>,
);
