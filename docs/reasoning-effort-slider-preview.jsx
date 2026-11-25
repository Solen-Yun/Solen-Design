import { createRoot } from "react-dom/client";
import { ReasoningEffortSlider } from "../src/react/index.js";

/* The standalone preview — the component alone, no workbench chrome.
   The component paints no background of its own, so the preview page
   supplies a plain light backdrop. */
createRoot(document.getElementById("root")).render(
  <div style={{ width: "100%", minHeight: "100vh", display: "grid", placeItems: "center", background: "#f4f3f1" }}>
    <div style={{ width: "min(100%, 560px)" }}>
      <ReasoningEffortSlider />
    </div>
  </div>,
);
