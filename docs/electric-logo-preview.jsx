import { createRoot } from "react-dom/client";
import { ElectricLogo } from "../src/react/index.js";

/* The standalone preview — two electrified marks side by side on the dark
   canvas; hover either one to supercharge the strands, click for pulses. */

const BOLT = "./assets/demo-photos/photo-01.jpg";
const STAR = "./assets/demo-photos/photo-02.jpg";

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
    <div style={{ width: "min(92vw, 560px)", aspectRatio: "16 / 9" }}>
      <ElectricLogo src={BOLT} />
    </div>
    <div style={{ width: "min(92vw, 560px)", aspectRatio: "16 / 9" }}>
      <ElectricLogo src={STAR} color="#ffd9a8" glowColor="#ff7a3d" strands={5} crackle={2} fill={0.25} />
    </div>
  </div>,
);
