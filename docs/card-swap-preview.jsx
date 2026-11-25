import { createRoot } from "react-dom/client";
import { CardSwap } from "../src/react/index.js";

/* The standalone preview — the component alone, no workbench chrome.
   Runs on the engine's four embedded photos. */
createRoot(document.getElementById("root")).render(<CardSwap />);
