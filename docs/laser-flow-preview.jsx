import { useRef } from "react";
import { createRoot } from "react-dom/client";
import { LaserFlow } from "../src/react/index.js";

/* The standalone preview — one wide laser wash over a rounded panel and a
   second instance in warm magenta with heavy fog; hover either for sparks. */

function Stage({ beam, panel }) {
  const surface = useRef(null);
  return (
    <div style={{ position: "relative", width: "min(92vw, 760px)", aspectRatio: "16 / 9", overflow: "hidden" }}>
      <div
        ref={surface}
        style={{
          position: "absolute",
          inset: panel.inset,
          borderRadius: panel.radius,
          background: "linear-gradient(135deg, #1b2340 0%, #232b52 55%, #1a2038 100%)",
        }}
      />
      <LaserFlow surfaceRef={surface} style={{ position: "absolute", inset: 0 }} {...beam} />
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 36,
      background: "#101014",
    }}
  >
    <Stage
      panel={{ inset: "48px 56px", radius: 28 }}
      beam={{ color: "#3847ff", beamPosition: 0.6, fog: 0.3, seed: 3 }}
    />
    <Stage
      panel={{ inset: "40px 44px", radius: 24 }}
      beam={{ color: "#ff3fae", beamPosition: 0.35, fog: 0.6, dust: 2.4, seed: 11, beamWidth: 1.2 }}
    />
  </div>,
);
