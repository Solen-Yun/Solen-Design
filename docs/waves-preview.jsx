import { createRoot } from "react-dom/client";
import { Waves } from "../src/react/index.js";

/* The standalone preview — three line fields on the dark canvas: the airy
   white default, a dense violet weave tilted hard, and traveling dashes.
   The cursor parts the lines and clicks launch shockwaves in all three. */
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
      <div style={{ position: "absolute", inset: 0 }}>
        <Waves lineColor="#ffffff" accentColor="#ff5fa2" />
      </div>
    </div>
    <div style={{ position: "relative", flex: 1, minHeight: 260 }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <Waves lineColor="#8f7bff" accentColor="#d9fff2" spacing={7} lineWidth={0.8} rotation={-35} amplitude={48} scale={1.6} speed={1.4} variation={5} />
      </div>
    </div>
    <div style={{ position: "relative", flex: 1, minHeight: 260 }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <Waves lineColor="#19d3a2" lineStyle="dashed" spacing={16} amplitude={24} twist={0.5} speed={0.8} accentColor="#ffffff" />
      </div>
    </div>
  </div>,
);
