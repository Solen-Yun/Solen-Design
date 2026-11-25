import { createRoot } from "react-dom/client";
import { CrumpledPaper } from "../src/react/index.js";

/* The standalone preview — the component alone, no workbench chrome.
   The scene carries its own warm-grey backdrop. */
createRoot(document.getElementById("root")).render(
  <div style={{ width: "100%", minHeight: "100vh", display: "grid", placeItems: "center", background: "#d9d5cc" }}>
    <div style={{ width: "min(100%, 1200px)" }}>
      <CrumpledPaper />
    </div>
  </div>,
);
