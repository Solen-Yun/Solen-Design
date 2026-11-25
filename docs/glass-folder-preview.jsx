import { createRoot } from "react-dom/client";
import { GlassFolder } from "../src/react/index.js";

/* The standalone preview — the component alone, no workbench chrome.
   The demo carries its own pale backdrop. */
createRoot(document.getElementById("root")).render(
  <div style={{ width: "100%", minHeight: "100vh", display: "grid", placeItems: "center", background: "#d9d9dd" }}>
    <div style={{ width: "min(100%, 1200px)" }}>
      <GlassFolder />
    </div>
  </div>,
);
