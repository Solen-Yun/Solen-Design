import { createRoot } from "react-dom/client";
import { StackedMetadata } from "../src/react/index.js";

/* The standalone preview — the component alone, no workbench chrome. */

createRoot(document.getElementById("root")).render(<StackedMetadata />);
