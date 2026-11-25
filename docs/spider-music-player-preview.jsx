import { createRoot } from "react-dom/client";
import { SpiderMusicPlayer } from "../src/react/index.js";

/* The standalone preview — the component alone, no workbench chrome. */
createRoot(document.getElementById("root")).render(
  <div style={{ width: "100%", minHeight: "100vh", display: "grid", placeItems: "center", background: "#d5d5d5" }}>
    <div style={{ width: "min(100%, 1416px)" }}>
      <SpiderMusicPlayer options={{ track: 0 }} />
    </div>
  </div>,
);
