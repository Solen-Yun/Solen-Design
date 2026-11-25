import { createRoot } from "react-dom/client";
import { FaultyTerminal } from "../src/react/index.js";

/* The standalone preview — a green phosphor terminal and an amber one
   with the characters style. The cursor lifts glowing patches on both;
   clicking tears rows or rings a degauss wave. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "#050507",
    }}
  >
    <div style={{ position: "relative", flex: 1, minHeight: 260 }}>
      <FaultyTerminal tint="#5dff9e" glyphs="blocks" clickEffect="glitch" />
    </div>
    <div style={{ position: "relative", flex: 1, minHeight: 260 }}>
      <FaultyTerminal
        tint="#ffb26b"
        glyphs="characters"
        clickEffect="degauss"
        gridMul={[3, 2]}
        glow={0.9}
        persistence={0.65}
        curvature={0.3}
        scramble={0.8}
      />
    </div>
  </div>,
);
