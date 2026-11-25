import { createRoot } from "react-dom/client";
import { PromptBar } from "../src/react/index.js";

/* The standalone preview — two composers on the dark canvas: one idle at a
   mid effort, one at Max effort where the sparks are flying. */
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
    }}
  >
    <PromptBar width={420} defaultEffort="Medium" />
    <PromptBar width={420} defaultEffort="Max" />
  </div>,
);
