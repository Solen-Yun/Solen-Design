import { createRoot } from "react-dom/client";
import { MetallicPaint } from "../src/react/index.js";

/* The standalone preview — the chrome word full-width plus a bolt-shaped
   badge underneath; drag across either to tilt the liquid gradient. */

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
    <div style={{ width: "min(92vw, 760px)", height: 280 }}>
      <MetallicPaint text="SOLEN" scale={0.62} density={2.5} />
    </div>
    <div style={{ width: "min(92vw, 420px)", height: 260 }}>
      <MetallicPaint imageSrc={BOLT} scale={0.8} density={3} angle={110} color="#cfe0ff" />
    </div>
  </div>,
);
