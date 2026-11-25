import { createRoot } from "react-dom/client";
import { Particles } from "../src/react/index.js";

/* The standalone preview — three fields on one dark canvas: the default
   white star dust, a cyan constellation web with soft edges, and a forward-
   drifting sparkle shower in amber. */
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
      <Particles />
    </div>
    <div style={{ position: "relative", width: "min(860px, 92vw)", height: 260 }}>
      <Particles
        particleCount={320}
        particleColors={["#67e8f9", "#a5b4fc"]}
        particleBaseSize={60}
        glow={0.8}
        connections={true}
        connectionDistance={130}
        hoverEffect="repel"
        alphaParticles={true}
      />
    </div>
    <div style={{ position: "relative", width: "min(860px, 92vw)", height: 220 }}>
      <Particles
        particleCount={500}
        particleColors={["#f5a524", "#f43f5e"]}
        particleBaseSize={40}
        shape="sparkle"
        glow={1}
        twinkle={0.6}
        drift="forward"
        driftSpeed={1.4}
        variation={7}
      />
    </div>
  </div>,
);
