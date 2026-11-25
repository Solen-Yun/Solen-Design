import { createRoot } from "react-dom/client";
import { ParticleTextureTrio } from "../src/react/index.js";

/* The standalone preview — the component alone, no workbench chrome. */
createRoot(document.getElementById("root")).render(
  <div style={{ width: "100%", minHeight: "100vh", display: "grid", placeItems: "center", background: "#000" }}>
    <div style={{ width: "min(100%, 960px)" }}>
      <ParticleTextureTrio options={{ speed: 1 }} />
    </div>
  </div>,
);
