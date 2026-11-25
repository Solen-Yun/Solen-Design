import { createRoot } from "react-dom/client";
import { InlineTextMorph } from "../src/react/index.js";

/* The standalone preview — the component alone, no workbench chrome. */
createRoot(document.getElementById("root")).render(
  <div style={{ width: "100%", minHeight: "100vh", display: "grid", placeItems: "center", background: "#fff" }}>
    <div style={{ width: "min(100%, 1044px)" }}>
      <InlineTextMorph />
    </div>
  </div>,
);
