import { createRoot } from "react-dom/client";
import { IsoBlockChart } from "../src/react/index.js";

/* The standalone preview — the component alone, no workbench chrome. */
createRoot(document.getElementById("root")).render(<IsoBlockChart />);
