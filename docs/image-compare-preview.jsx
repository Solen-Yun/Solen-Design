import { createRoot } from "react-dom/client";
import { ImageCompare } from "../src/react/index.js";

/* The standalone preview — the component alone, no workbench chrome.
   Runs on the engine's embedded photo, grayscale generated in place. */
createRoot(document.getElementById("root")).render(<ImageCompare />);
