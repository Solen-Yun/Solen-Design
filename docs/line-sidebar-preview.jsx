import { createRoot } from "react-dom/client";
import { LineSidebar } from "../src/react/index.js";

/* The standalone preview — the component alone, no workbench chrome. */
createRoot(document.getElementById("root")).render(<LineSidebar />);
