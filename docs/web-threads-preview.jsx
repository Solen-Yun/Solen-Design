import { createRoot } from "react-dom/client";
import { WebThreads } from "../src/react/index.js";

/* The standalone preview — three weaves on the dark canvas: the classic
   two-colour pinch, a multi-node net, and a tilted pastel weave with
   beads. Hover lifts a thread, clicks send surges racing to the edge. */
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
      <WebThreads colors={["#5227FF", "#FF9FFC"]} />
    </div>
    <div style={{ position: "relative", flex: 1, minHeight: 260 }}>
      <WebThreads colors={["#19d3a2", "#baf7c9"]} threadCount={10} nodes={4} spread={0.24} thickness={0.9} glow={0.03} depth={0.5} />
    </div>
    <div style={{ position: "relative", flex: 1, minHeight: 260 }}>
      <WebThreads colors={["#ffb8f0", "#6f5cff"]} threadCount={8} angle={-18} position={0.6} pulses={0.5} shimmer={true} speed={0.3} />
    </div>
  </div>,
);
