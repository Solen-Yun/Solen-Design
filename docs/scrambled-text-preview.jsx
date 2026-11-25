import { createRoot } from "react-dom/client";
import { ScrambledText } from "../src/react/index.js";

/* The standalone preview — three pointer modes on the dark canvas: the plain
   proximity scramble, the lift field, and the magnify field; click anywhere
   to send a shockwave through the letters. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 96,
      background: "#101014",
    }}
  >
    <ScrambledText effect="scramble" radius={130} color="#f4f4f5" scrambleColor="#ff5a36" style={{ margin: 0 }}>
      Sweep to scramble the signal
    </ScrambledText>
    <ScrambledText effect="lift" strength={1.2} color="#8f8fa3" style={{ margin: 0 }}>
      Letters lift off the line
    </ScrambledText>
    <ScrambledText effect="magnify" strength={1.4} color="#ffb03d" style={{ margin: 0 }}>
      Or magnify away from the cursor
    </ScrambledText>
  </div>,
);
