import { createRoot } from "react-dom/client";
import { FolderFloat } from "../src/react/index.js";

/* The standalone preview — a hover-triggered folder with physics on and a
   press-triggered one with physics off, on the dark canvas. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      gap: 120,
      padding: 120,
      boxSizing: "border-box",
      color: "#f5f5f5",
      background: "#101014",
    }}
  >
    <FolderFloat trigger="hover" physics={true} label="Design feedback" />
    <FolderFloat trigger="press" physics={false} label="Sprint notes" folderColor="#44403c" frontColor="#57534e" />
  </div>,
);
