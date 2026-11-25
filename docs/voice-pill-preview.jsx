import { createRoot } from "react-dom/client";
import { VoicePill } from "../src/react/index.js";

/* The standalone preview — a small simulated pill and a larger rounded one
   on the dark canvas; press either to record, drag left toward Cancel. */
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
    <VoicePill size={28} />
    <VoicePill size={40} shape="rounded" reach={14} accentColor="#7dd3fc" background="#1c1917" cancelDistance={96} />
  </div>,
);
