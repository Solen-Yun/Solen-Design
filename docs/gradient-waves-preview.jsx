import { createRoot } from "react-dom/client";
import { GradientWaves } from "../src/react/index.js";

/* The standalone preview — the classic violet/pink sea, a calm teal dawn and
   an ink-on-paper swell; the sun follows the cursor, click raises waves. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 40,
      background: "#101014",
    }}
  >
    <div style={{ position: "relative", width: "min(880px, 92vw)", height: 300 }}>
      <GradientWaves horizonColor="#5227FF" waveColor="#FF9FFC" crestColor="#FFFFFF" />
    </div>
    <div style={{ position: "relative", width: "min(880px, 92vw)", height: 300 }}>
      <GradientWaves
        horizonColor="#f59e0b"
        waveColor="#134e4a"
        crestColor="#fde68a"
        amplitude={1.6}
        speed={0.3}
        lightAngle={30}
        sheen={1.2}
      />
    </div>
    <div style={{ position: "relative", width: "min(880px, 92vw)", height: 300, background: "#f4f4f5" }}>
      <GradientWaves
        horizonColor="#1e3fd8"
        waveColor="#5227ff"
        lightMode={true}
        quality="low"
      />
    </div>
  </div>,
);
