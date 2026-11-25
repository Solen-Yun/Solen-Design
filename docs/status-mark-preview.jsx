import { createRoot } from "react-dom/client";
import { StatusMark } from "../src/react/index.js";

/* The standalone preview — a spinning indeterminate mark, a determinate
   one at 60%, and a finished struck-through row on the dark canvas. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 36,
      background: "#101014",
      color: "#f5f5f5",
    }}
  >
    <StatusMark status="running" label="Reading the repo" size={22} dashes={10} />
    <StatusMark status="running" progress={0.6} label="Deploying site" size={22} />
    <StatusMark status="done" label="Deploying site" size={22} />
    <StatusMark status="failed" label="Tests did not pass" size={22} />
  </div>,
);
