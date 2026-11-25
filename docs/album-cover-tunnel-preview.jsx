import { createRoot } from "react-dom/client";
import { AlbumCoverTunnel } from "../src/react/index.js";

/* The standalone preview — the component alone, no workbench chrome.
   Runs on the engine's ten embedded covers. */
createRoot(document.getElementById("root")).render(<AlbumCoverTunnel />);
