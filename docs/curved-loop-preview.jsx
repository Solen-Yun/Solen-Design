import { createRoot } from "react-dom/client";
import { CurvedLoop } from "../src/react/index.js";

/* The standalone preview — an arc and a wave stacked on the light canvas;
   both loops are draggable and flingable, and page scrolling boosts them. */
createRoot(document.getElementById("root")).render(
  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", gap: 24 }}>
    <CurvedLoop
      marqueeText="Be ✦ Creative ✦ With ✦ Solen ✦ Design ✦"
      shape="arc"
      speed={2}
      curveAmount={400}
      fontSize={96}
      fontWeight={700}
      scrollBoost={2}
    />
    <CurvedLoop
      marqueeText="Cool ✦ Minimal ✦ CSS ✦ Framework ✦ Agnostic ✦"
      shape="wave"
      speed={2.5}
      curveAmount={260}
      fontSize={64}
      fontWeight={700}
      outline={true}
      edgeFade={0.3}
      scrollBoost={2}
    />
  </div>,
);
