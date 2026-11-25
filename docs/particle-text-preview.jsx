import { createRoot } from "react-dom/client";
import { ParticleText } from "../src/react/index.js";

/* The standalone preview — three intro choreographies stacked on the dark
   canvas: gather from all around, the scan-line sweep, and rain from above. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      justifyContent: "center",
      gap: 24,
      background: "#101014",
      color: "#f4f4f5",
      padding: 24,
    }}
  >
    <div style={{ height: "34vh" }}>
      <ParticleText text="Solen" intro="gather" particleSize={2} density={4} />
    </div>
    <div style={{ height: "30vh" }}>
      <ParticleText text="Assembles" intro="scan" particleSize={2} density={5} highlightColor="#ff5a36" />
    </div>
    <div style={{ height: "26vh" }}>
      <ParticleText text="From rain" intro="rain" shape="line" particleSize={2} density={5} highlightColor="#ffb03d" />
    </div>
  </div>,
);
