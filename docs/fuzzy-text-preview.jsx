import { createRoot } from "react-dom/client";
import { FuzzyText } from "../src/react/index.js";

/* The standalone preview — three poses on the dark canvas: the resting
   hover tremor, an intro that collapses out of a violent blur, and a
   gradient text with the RGB channels pulled apart. */
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
      color: "#f4f4f5",
    }}
  >
    <FuzzyText color="#f4f4f5" trigger="hover" baseIntensity={0.18} hoverIntensity={0.5}>
      悬停加剧
    </FuzzyText>
    <FuzzyText color="#a5b4fc" intro introDuration={1600} baseIntensity={0.1} hoverIntensity={0.4}>
      COLLAPSE
    </FuzzyText>
    <FuzzyText gradient={["#ff2d55", "#ffcc00", "#2dff7a"]} colorSplit={1.8} trigger="always" hoverIntensity={0.35}>
      RGB SPLIT
    </FuzzyText>
  </div>,
);
