import { createRoot } from "react-dom/client";
import { CollectionLayoutMorph } from "../src/react/index.js";

/* The standalone preview — the component alone, no workbench chrome. */
createRoot(document.getElementById("root")).render(
  <div style={{ width: "100%", minHeight: "100vh", display: "grid", placeItems: "center", background: "#f1f2f5" }}>
    <div style={{ width: "min(100%, 1280px)" }}>
      <CollectionLayoutMorph />
    </div>
  </div>,
);
