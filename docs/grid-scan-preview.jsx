import { createRoot } from "react-dom/client";
import { GridScan } from "../src/react/index.js";

/* The standalone preview — the deep cyan room, a dotted wide hall and an
   ink-on-paper cell; sweeps repeat, hover spots, click fires sonar rings. */
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
      <GridScan cells={8} depth={3} scanColor="#7dd3fc" />
    </div>
    <div style={{ position: "relative", width: "min(880px, 92vw)", height: 300 }}>
      <GridScan
        cells={14}
        depth={6}
        lineStyle="dotted"
        scanColor="#a5b4fc"
        linesColor="#3f3a4d"
        scanDirection="pingpong"
        trail={0.75}
      />
    </div>
    <div style={{ position: "relative", width: "min(880px, 92vw)", height: 300, background: "#f4f4f5" }}>
      <GridScan cells={10} depth={2} lightMode={true} lineStyle="dashed" />
    </div>
  </div>,
);
