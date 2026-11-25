import { createRoot } from "react-dom/client";
import { CallChip } from "../src/react/index.js";

/* The standalone preview — one chip per status side by side on the dark
   canvas: a call wiping through its timer, a finished one, a failed one. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 28,
      color: "#f5f5f5",
      background: "#101014",
    }}
  >
    <CallChip name="bash" argument="npm test" status="running" expectedMs={2500} />
    <CallChip name="bash" argument="npm test" status="done" />
    <CallChip name="bash" argument="npm test" status="error" onRetry={() => {}} />
  </div>,
);
