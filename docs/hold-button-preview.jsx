import { createRoot } from "react-dom/client";
import { HoldButton } from "../src/react/index.js";

/* The standalone preview — a rightward fill and an upward fill with
   different hold times, both on the dark canvas. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 28,
      background: "#101014",
    }}
  >
    <HoldButton holdTime={1800} />
    <HoldButton fillDirection="up" holdTime={2600} fillColor="#0ea5e9" doneLabel="Sent" />
  </div>,
);
