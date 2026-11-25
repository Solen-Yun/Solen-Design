import { createRoot } from "react-dom/client";
import { SloshGauge } from "../src/react/index.js";

/* The standalone preview — a lazy sloshing tank, a snapping one and a
   light-liquid slider on the dark canvas; drag any interactive tank. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 56,
      background: "#101014",
      color: "#f5f5f5",
    }}
  >
    <div style={{ display: "flex", gap: 40 }}>
      <SloshGauge defaultValue={65} interactive={true} viscosity={0.55} splash={0.6} height={190} />
      <SloshGauge defaultValue={42} interactive={true} liquidColor="#7dd3fc" viscosity={0} height={190} />
    </div>
    <SloshGauge defaultValue={80} interactive={true} liquidColor="#fda4af" glassColor="#1c1917" width={72} height={220} radius={36} />
  </div>,
);
