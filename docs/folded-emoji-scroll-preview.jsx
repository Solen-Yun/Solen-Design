import { createRoot } from "react-dom/client";
import { FoldedEmojiScroll } from "../src/react/index.js";

/* The standalone preview — the component alone, no workbench chrome. */
createRoot(document.getElementById("root")).render(
  <div style={{ width: "100%", minHeight: "100vh", display: "grid", placeItems: "center", background: "#151515" }}>
    <div style={{ width: "min(100%, 1280px)" }}>
      <FoldedEmojiScroll options={{ foldSize: 42 }} />
    </div>
  </div>,
);
