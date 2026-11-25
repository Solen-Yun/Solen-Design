import { createRoot } from "react-dom/client";
import { Ferrofluid } from "../src/react/index.js";

/* The standalone preview — the default chrome sea at a gentle tilt and
   a low, needle-sharp variant lit warm. The cursor raises a crown on
   both; clicks send ring waves across the surface. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "#101014",
    }}
  >
    <div style={{ position: "relative", flex: 1, minHeight: 260 }}>
      <Ferrofluid colors={["#ffffff", "#cfe8ff"]} tilt={48} />
    </div>
    <div style={{ position: "relative", flex: 1, minHeight: 260 }}>
      <Ferrofluid
        colors={["#ffd9a0", "#ff8a5c"]}
        spikeHeight={1.4}
        sharpness={4.5}
        tilt={24}
        scale={2.2}
        brightness={1.3}
        turbulence={1.6}
      />
    </div>
  </div>,
);
