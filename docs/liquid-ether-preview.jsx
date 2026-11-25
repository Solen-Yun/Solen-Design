import { createRoot } from "react-dom/client";
import { LiquidEther } from "../src/react/index.js";

/* The standalone preview — three fluids on one dark canvas: the default
   violet-pink pool, a high-force cyan storm with bouncing edges, and a
   long-trailing single-hue ghost that lingers for seconds. */
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
    <div style={{ position: "relative", width: "min(860px, 92vw)", height: 300 }}>
      <LiquidEther />
    </div>
    <div style={{ position: "relative", width: "min(860px, 92vw)", height: 240 }}>
      <LiquidEther
        colors={["#22d3ee", "#3b82f6", "#a5f3fc"]}
        mouseForce={45}
        cursorSize={140}
        persistence={0.5}
        bounceEdges={true}
      />
    </div>
    <div style={{ position: "relative", width: "min(860px, 92vw)", height: 200 }}>
      <LiquidEther
        colors={["#5227FF", "#B497CF"]}
        intensity={1.6}
        persistence={1}
        viscosity={0.4}
      />
    </div>
  </div>,
);
