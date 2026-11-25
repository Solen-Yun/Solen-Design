import { createRoot } from "react-dom/client";
import { WakeSlider } from "../src/react/index.js";

/* The standalone preview — a wide slider with a crest overlay and a
   compact tinted one on the dark canvas; flick either to raise the wake. */
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
      color: "#f5f5f5",
      padding: "0 48px",
    }}
  >
    <div style={{ width: "min(560px, 100%)" }}>
      <WakeSlider defaultValue={64} showValue={true} crestColor="" reach={8} />
    </div>
    <div style={{ width: "min(360px, 100%)" }}>
      <WakeSlider defaultValue={30} fillColor="#7dd3fc" crestColor="#0ea5e9" bars={24} height={44} restHeight={8} ariaLabel="Small" />
    </div>
  </div>,
);
