import { createRoot } from "react-dom/client";
import { DeepAgentComposer } from "../src/react/index.js";

/* The standalone preview — the component alone, no workbench chrome.
   The composer carries its own white card, so the page stays a plain
   light backdrop. */
createRoot(document.getElementById("root")).render(
  <div style={{ width: "100%", minHeight: "100vh", display: "grid", placeItems: "center", background: "#f4f3f1" }}>
    <div style={{ width: "min(100%, 680px)" }}>
      <DeepAgentComposer />
    </div>
  </div>,
);
