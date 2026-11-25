import { createRoot } from "react-dom/client";
import { Scanner } from "../src/react/index.js";

/* The standalone preview — the classic violet/pink vertical sweep answering
   the cursor and clicks, and a teal horizontal sweep with a wider lens. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 48,
      background: "#101014",
    }}
  >
    <div style={{ width: "min(920px, 92vw)", height: 440, position: "relative" }}>
      <Scanner mouseMode="repel" clickEffect="ping" />
    </div>
    <div style={{ width: "min(920px, 92vw)", height: 300, position: "relative" }}>
      <Scanner color1="#0e7490" color2="#a5f3fc" scanDirection="horizontal" mouseRadius={0.8} mouseStrength={0.9} mouseMode="attract" clickEffect="none" />
    </div>
  </div>,
);
