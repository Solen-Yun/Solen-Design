import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/tile-flip-wave-demo.jsx";
import sources from "./components/tile-flip-wave-sources.jsx";
import tileFlipWave from "./components/tile-flip-wave.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...tileFlipWave} Demo={Demo} {...sources} />,
);
