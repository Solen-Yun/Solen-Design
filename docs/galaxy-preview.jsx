import { createRoot } from "react-dom/client";
import { Galaxy } from "../src/react/index.js";

/* The standalone preview — the default procedural starfield and an
   explicit two-colour variant. The cursor pushes stars aside on both;
   clicking punches a decaying hyperspace warp. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "#050507",
    }}
  >
    <div style={{ position: "relative", flex: 1, minHeight: 260 }}>
      <Galaxy focal={[0.5, 0.5]} starSpeed={0.5} layers={5} />
    </div>
    <div style={{ position: "relative", flex: 1, minHeight: 260 }}>
      <Galaxy
        starColors={["#ffd9a0", "#7ab8ff"]}
        starSpeed={0.9}
        density={1.6}
        layers={3}
        glowIntensity={0.5}
        twinkleIntensity={0.6}
        flareIntensity={1.6}
      />
    </div>
  </div>,
);
