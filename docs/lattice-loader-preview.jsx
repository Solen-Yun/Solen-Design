import { createRoot } from "react-dom/client";
import { LatticeLoader } from "../src/react/index.js";

/* The standalone preview — the glowing wave, the done row and the error row
   side by side on the dark canvas; the wave pattern differs per row. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 56,
      background: "#101014",
      color: "#f5f5f5",
    }}
  >
    <LatticeLoader status="working" pattern="orbit" grid={3} color="#f5f5f5" glow />
    <LatticeLoader status="working" pattern="sweep" grid={4} color="#f5f5f5" glow />
    <LatticeLoader status="done" pattern="orbit" grid={3} color="#f5f5f5" glow doneColor="#22c55e" />
    <LatticeLoader status="error" pattern="orbit" grid={3} color="#f5f5f5" glow errorColor="#ef4444" />
  </div>,
);
