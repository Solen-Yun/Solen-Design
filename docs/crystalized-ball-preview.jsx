import { createRoot } from "react-dom/client";
import { CrystalizedBall } from "../src/react/index.js";

/* The standalone preview — three preset moods of the arc ball on the dark
   canvas; hover any ball to bend the discharge and stir its dust. */

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
    <div style={{ width: "min(92vw, 420px)", aspectRatio: "4 / 3" }}>
      <CrystalizedBall preset="plasma" size={0.66} />
    </div>
    <div style={{ display: "flex", gap: 40, width: "min(92vw, 680px)", height: 220 }}>
      <div style={{ flex: 1 }}>
        <CrystalizedBall preset="aurora" size={0.62} motion="orbit" />
      </div>
      <div style={{ flex: 1 }}>
        <CrystalizedBall preset="ember" size={0.62} particleShape="round" dustSpeed={1.6} />
      </div>
    </div>
  </div>,
);
