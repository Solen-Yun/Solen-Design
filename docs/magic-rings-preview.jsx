import { createRoot } from "react-dom/client";
import { MagicRings } from "../src/react/index.js";

/* The standalone preview — three families on one dark canvas: the default
   violet pulse, a tilted amber ripple with dispersion ghosts, and a teal
   breathe set on a light panel. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 32,
      background: "#101014",
    }}
  >
    <div style={{ position: "relative", width: "min(860px, 92vw)", height: 280 }}>
      <MagicRings />
    </div>
    <div style={{ position: "relative", width: "min(860px, 92vw)", height: 260 }}>
      <MagicRings
        color="#f5a524"
        colorTwo="#f43f5e"
        motion="ripple"
        ringCount={8}
        tilt={38}
        dispersion={0.5}
        grain={0.2}
      />
    </div>
    <div
      style={{
        position: "relative",
        width: "min(860px, 92vw)",
        height: 240,
        background: "#e4e4e7",
        borderRadius: 16,
      }}
    >
      <MagicRings
        color="#0ea5e9"
        colorTwo="#155e75"
        motion="breathe"
        ringCount={5}
        lineThickness={2.5}
        glow={0.8}
        theme="light"
      />
    </div>
  </div>,
);
