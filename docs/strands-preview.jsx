import { createRoot } from "react-dom/client";
import { Strands } from "../src/react/index.js";

/* The standalone preview — the default sunset orb and a glacier-tinted
   one with a wider glass; hover to lean, click to punch a pulse. */

const GLACIER = ["#6fd6ff", "#4fb3e8", "#a8f0ff", "#eafcff", "#b5a6ff", "#5b6bf5", "#1d2a8f"];

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
    <div style={{ width: "min(92vw, 520px)", aspectRatio: "4 / 3" }}>
      <Strands energy={0.7} glassSize={1.15} />
    </div>
    <div style={{ width: "min(92vw, 520px)", aspectRatio: "4 / 3" }}>
      <Strands colors={GLACIER} energy={0.45} waviness={1.4} hueShift={0.08} refraction={1.4} dispersion={1.5} />
    </div>
  </div>,
);
