import { createRoot } from "react-dom/client";
import { FuseButton } from "../src/react/index.js";

/* The standalone preview — three armed buttons with the fuse in outline,
   top-line and bottom-line styles, all on the dark canvas. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 24,
      background: "#101014",
    }}
  >
    <FuseButton label="Archive" fuse="outline" undoWindow={6000} />
    <FuseButton label="Archive" fuse="top" undoWindow={6000} />
    <FuseButton label="Archive" fuse="bottom" undoWindow={6000} fuseColor="#22c55e" />
  </div>,
);
