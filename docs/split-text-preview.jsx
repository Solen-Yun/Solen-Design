import { createRoot } from "react-dom/client";
import { SplitText } from "../src/react/index.js";

/* The standalone preview — three effects on the dark canvas: a masked rise,
   a blur-in with the accent wash, and a pop with the pointer lift armed. */
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
      fontSize: 52,
      fontWeight: 800,
    }}
  >
    <SplitText text="Letters rise from their masks" splitType="words" effect="rise" mask trigger="load" delay={60} color="#f4f4f5" />
    <SplitText text="Blur into focus" effect="blur" accentColor="#ff5a36" trigger="load" delay={40} color="#8f8fa3" />
    <SplitText text="Pop, then lift" effect="pop" hoverEffect="lift" trigger="load" delay={30} color="#ffb03d" />
  </div>,
);
