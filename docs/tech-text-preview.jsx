import { createRoot } from "react-dom/client";
import { TechText } from "../src/react/index.js";

/* The standalone preview — the component alone, no workbench chrome. */
createRoot(document.getElementById("root")).render(
  <div style={{ width: "100%", height: "100vh", position: "relative" }}>
    <TechText text="Solen Design" reveal="letter" clickKick />
  </div>,
);
