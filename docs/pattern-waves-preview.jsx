import { createRoot } from "react-dom/client";
import { PatternWaves } from "../src/react/index.js";

/* The standalone preview — three cloths on one dark canvas: the default
   silk dots, an ocean swell in cyan, and a teal ASCII terminal ramp. */
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
      <PatternWaves />
    </div>
    <div style={{ position: "relative", width: "min(860px, 92vw)", height: 240 }}>
      <PatternWaves
        preset="ocean"
        color="#67e8f9"
        backgroundColor="#06121d"
        spacing={11}
        speed={0.6}
      />
    </div>
    <div style={{ position: "relative", width: "min(860px, 92vw)", height: 220 }}>
      <PatternWaves
        preset="terminal"
        color="#a5f3fc"
        backgroundColor="#0b1210"
        characters=".:-=+*#%@"
        speed={0.4}
      />
    </div>
  </div>,
);
