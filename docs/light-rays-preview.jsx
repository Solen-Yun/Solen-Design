import { createRoot } from "react-dom/client";
import { LightRays } from "../src/react/index.js";

/* The standalone preview — the beam fills the viewport as a page background:
   it follows the cursor anywhere on the page and answers clicks with a
   travelling pulse. */
createRoot(document.getElementById("root")).render(
  <div style={{ position: "fixed", inset: 0, background: "#101014" }}>
    <LightRays raysOrigin="top-center" raysColor="#ffffff" />
  </div>,
);
