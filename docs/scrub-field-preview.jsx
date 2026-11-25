import { createRoot } from "react-dom/client";
import { ScrubField } from "../src/react/index.js";

/* The standalone preview — three chip sizes with different ranges and
   accents on the dark canvas; drag horizontally, Shift/Alt change step. */
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
      color: "#f5f5f5",
    }}
  >
    <ScrubField label="Radius" suffix="px" defaultValue={24} min={0} max={100} size="lg" accent="#7fd8ff" chipColor="#1e2233" />
    <ScrubField label="Opacity" defaultValue={0.8} min={0} max={1} step={0.01} size="md" accent="#c5f0a4" chipColor="#22301f" coarseMultiplier={0.1} fineMultiplier={0.01} />
    <ScrubField label="Angle" suffix="°" defaultValue={45} min={0} max={360} size="sm" accent="#ffb0d8" chipColor="#33202b" />
  </div>,
);
