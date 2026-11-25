import { createRoot } from "react-dom/client";
import { CodeSlots } from "../src/react/index.js";

/* The standalone preview — an idle half-typed code above a success and an
   error row, all on the dark canvas; focus the top row and start typing. */
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
    <CodeSlots defaultValue="48291" length={6} autoFocus />
    <CodeSlots defaultValue="904182" length={6} status="success" />
    <CodeSlots defaultValue="007" length={6} status="error" />
  </div>,
);
