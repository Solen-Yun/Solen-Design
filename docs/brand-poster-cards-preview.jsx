import { createRoot } from "react-dom/client";
import { BrandPosterCards } from "../src/react/index.js";

/* The standalone preview — the component alone, no workbench chrome.
   The posters carry the artwork embedded in the component. */
createRoot(document.getElementById("root")).render(
  <div style={{ width: "100%", minHeight: "100vh", display: "grid", placeItems: "center", background: "#fff" }}>
    <div style={{ width: "min(100%, 1200px)" }}>
      <BrandPosterCards />
    </div>
  </div>,
);
