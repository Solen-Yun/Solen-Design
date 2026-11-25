import { createRoot } from "react-dom/client";
import { ThinkingParticles } from "../src/react/index.js";

/* The standalone preview — the component alone, no workbench chrome.
   The demo carries its own light backdrop. */
createRoot(document.getElementById("root")).render(
  <div style={{ width: "100%", minHeight: "100vh", display: "grid", placeItems: "center", background: "#e9e9ea" }}>
    <div style={{ width: "min(100%, 1200px)" }}>
      <ThinkingParticles />
    </div>
  </div>,
);
