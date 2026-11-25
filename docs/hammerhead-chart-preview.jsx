import { createRoot } from "react-dom/client";
import { HammerheadChart } from "../src/react/index.js";

/* The standalone preview — the component alone, no workbench chrome.
   The terminal paints its own black backdrop. */
createRoot(document.getElementById("root")).render(
  <div style={{ width: "100%", minHeight: "100vh", display: "grid", placeItems: "center", background: "#0b0b0b" }}>
    <div style={{ width: "min(100%, 1200px)" }}>
      <HammerheadChart />
    </div>
  </div>,
);
