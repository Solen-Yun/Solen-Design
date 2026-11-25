import { createRoot } from "react-dom/client";
import { MicroSlats } from "../src/react/index.js";

/* The standalone preview — three seas on one dark canvas: the default
   violet swell, a choppy storm in ember tones, and a flat teal signal
   wall with tight slats. */
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
      <MicroSlats />
    </div>
    <div style={{ position: "relative", width: "min(860px, 92vw)", height: 240 }}>
      <MicroSlats
        preset="storm"
        color="#f5a524"
        glintColor="#fff7ed"
        slatWidth={8}
        slatHeight={18}
        gap={2}
      />
    </div>
    <div style={{ position: "relative", width: "min(860px, 92vw)", height: 220 }}>
      <MicroSlats
        preset="signal"
        color="#0ea5e9"
        glintColor="#e0f2fe"
        slatWidth={6}
        slatHeight={42}
        gap={4}
      />
    </div>
  </div>,
);
