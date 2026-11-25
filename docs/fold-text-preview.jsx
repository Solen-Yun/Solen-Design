import { createRoot } from "react-dom/client";
import { FoldText } from "../src/react/index.js";

/* The standalone preview — three fold styles on the dark canvas: a top-hinge
   paper fold, a left-hinge blinds fold that loops, and a flip that turns over. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 72,
      background: "#101014",
    }}
  >
    <FoldText text="Design unfolds" hinge="top" foldStyle="paper" fontSize={72} color="#f4f4f5" trigger="loop" loopDelay={1.6} />
    <FoldText text="Paper folds flat" hinge="left" foldStyle="blinds" fontSize={44} color="#8f8fa3" trigger="mount" />
    <FoldText text="Turn over" hinge="top" foldStyle="flip" fontSize={56} color="#ff5a36" trigger="hover" hoverRefold refoldRadius={180} />
  </div>,
);
