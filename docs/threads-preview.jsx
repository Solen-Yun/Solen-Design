import { createRoot } from "react-dom/client";
import { Threads } from "../src/react/index.js";

/* The standalone preview — three weaves on the dark canvas: the airy
   default bundle, a dense near-horizontal silk, and a fine contour-line
   grid. The cursor parts the strands in all three. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "#101014",
    }}
  >
    <div style={{ position: "relative", flex: 1, minHeight: 260, overflow: "hidden" }}>
      <Threads color="#c8d8ff" accentColor="#5b8cff" enableMouseInteraction={true} parting={0.6} />
    </div>
    <div style={{ position: "relative", flex: 1, minHeight: 260, overflow: "hidden" }}>
      <Threads color="#ffe9d9" accentColor="#ff5fa2" lineCount={200} thickness={0.4} distance={0.7} angle={8} speed={0.4} enableMouseInteraction={true} parting={0.5} />
    </div>
    <div style={{ position: "relative", flex: 1, minHeight: 260, overflow: "hidden" }}>
      <Threads color="#d9ffe9" accentColor="#19d3a2" lineCount={60} thickness={0.9} amplitude={0.6} waves={2.4} split={0} fray={0.15} angle={0} seed={9} brightness={1} enableMouseInteraction={true} parting={0.8} />
    </div>
  </div>,
);
