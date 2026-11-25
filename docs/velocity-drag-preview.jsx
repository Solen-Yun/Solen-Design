import { createRoot } from "react-dom/client";
import { VelocityFocusDrag } from "../src/react/index.js";

/* The standalone preview — the component alone, no workbench chrome.
   The scene carries its own green-glow backdrop and white window. */
createRoot(document.getElementById("root")).render(
  <div style={{ width: "100%", minHeight: "100vh", display: "grid", placeItems: "center", background: "#85a98d" }}>
    <div style={{ width: "min(100%, 1040px)" }}>
      <VelocityFocusDrag />
    </div>
  </div>,
);
