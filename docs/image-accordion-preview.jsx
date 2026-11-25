import { createRoot } from "react-dom/client";
import { ImageAccordion } from "../src/react/index.js";

/* The standalone preview — the component alone, no workbench chrome.
   Runs on the engine's embedded photos, so the preview exercises the same
   images the component ships with. */
createRoot(document.getElementById("root")).render(<ImageAccordion />);
