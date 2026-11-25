import { createRoot } from "react-dom/client";
import { SideRays } from "../src/react/index.js";

/* The standalone preview — the fan fills the viewport as a page background:
   it leans toward the cursor anywhere on the page and brightens the ray
   under it. */
createRoot(document.getElementById("root")).render(
  <div style={{ position: "fixed", inset: 0, background: "#101014" }}>
    <SideRays
      rayColor1="#FFC46B"
      rayColor2="#96c8ff"
      origin="top-right"
      speed={2.5}
      intensity={2}
      spread={2}
      density={5}
      followMouse={true}
    />
  </div>,
);
