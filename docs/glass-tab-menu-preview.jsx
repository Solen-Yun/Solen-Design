import { createRoot } from "react-dom/client";
import { GlassTabMenu } from "../src/react/index.js";

/* The standalone preview — the component alone, no workbench chrome.
   The scene carries its own lilac glow backdrop. */
createRoot(document.getElementById("root")).render(
  <div style={{ width: "100%", minHeight: "100vh", display: "grid", placeItems: "center", background: "#0b0b0b" }}>
    <div style={{ width: "min(100%, 1080px)" }}>
      <GlassTabMenu />
    </div>
  </div>,
);
