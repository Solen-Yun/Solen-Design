import { createRoot } from "react-dom/client";
import { A11yPanel } from "../src/react/index.js";

/* The standalone preview — the component alone, no workbench chrome. */
createRoot(document.getElementById("root")).render(
  <div style={{ width: "100%", minHeight: "100vh", display: "grid", placeItems: "center", background: "#e9e9ea" }}>
    <div style={{ width: "min(100%, 900px)" }}>
      <A11yPanel />
    </div>
  </div>,
);
