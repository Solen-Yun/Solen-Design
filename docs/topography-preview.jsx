import { createRoot } from "react-dom/client";
import { Topography } from "../src/react/index.js";

/* The standalone preview — three terrains on the dark canvas: the classic
   blue contour flight, a magenta survey grid with markers and glitch, and
   a low green valley with peak clicks. The cursor lifts hills in all
   three. */
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
      <Topography color="#4f7cff" speed={0.25} />
    </div>
    <div style={{ position: "relative", flex: 1, minHeight: 260 }}>
      <Topography color="#ff5fa2" markers="dots" glitch={0.4} lineCount={30} tilt={55} speed={0.12} direction="right" glow={0.8} />
    </div>
    <div style={{ position: "relative", flex: 1, minHeight: 260 }}>
      <Topography color="#19d3a2" tilt={20} elevation={1.6} fog={0.6} lineCount={16} clickEffect="peak" trail={0.6} glow={0.4} />
    </div>
  </div>,
);
