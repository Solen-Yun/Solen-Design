import { createRoot } from "react-dom/client";
import { Shuffle } from "../src/react/index.js";

/* The standalone preview — three rolls on the dark canvas: the classic
   slide with a binary charset, a blurred roll with symbols, and a flip
   rolling upward; each fires as it scrolls into view and replays on hover. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 72,
      background: "#101014",
      colorScheme: "dark",
      padding: "0 24px",
    }}
  >
    <Shuffle
      text="Solen Shuffle"
      duration={0.4}
      shuffleTimes={2}
      stagger={0.035}
      scrambleCharset="01"
      accentColor="#ffb03d"
      style={{ fontSize: 44, color: "#e4e4e7" }}
    />
    <Shuffle
      text="Blur Roll"
      effect="blur"
      duration={0.5}
      shuffleTimes={3}
      stagger={0.02}
      scrambleCharset="@#%&*"
      colorFrom="#3f3f46"
      colorTo="#7dd3fc"
      style={{ fontSize: 40, color: "#e4e4e7" }}
    />
    <Shuffle
      text="Flip Up"
      effect="flip"
      shuffleDirection="up"
      duration={0.45}
      shuffleTimes={2}
      animationMode="center"
      accentColor="#a3e635"
      style={{ fontSize: 44, color: "#e4e4e7" }}
    />
  </div>,
);
