import { createRoot } from "react-dom/client";
import { SpringCheck } from "../src/react/index.js";

/* The standalone preview — three rows with different strike directions and
   overshoots on the dark canvas; click or keyboard-toggle any of them. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 32,
      background: "#101014",
      color: "#f5f5f5",
    }}
  >
    <SpringCheck label="Ship the build" defaultChecked={true} bounce={0.35} />
    <SpringCheck label="Write release notes" defaultChecked={false} strike="right" fillColor="#fbbf24" checkColor="#1c1917" />
    <SpringCheck label="Deploy to production" defaultChecked={false} bounce={0} strike="center" fontSize={20} />
  </div>,
);
