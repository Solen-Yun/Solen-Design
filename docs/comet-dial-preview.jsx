import { createRoot } from "react-dom/client";
import { CometDial } from "../src/react/index.js";

/* The standalone preview — a large dial mid-sweep and a compact one with a
   thicker comet, both on the dark canvas; flick either to see the comet. */
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
    <CometDial defaultValue={62} size={280} />
    <CometDial defaultValue={30} size={190} thickness={6} cometWidth={18} cometReach={240} unit="°" label="Angle" />
  </div>,
);
