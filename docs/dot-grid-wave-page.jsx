import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/dot-grid-wave-demo.jsx";
import sources from "./components/dot-grid-wave-sources.jsx";
import dotGridWave from "./components/dot-grid-wave.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...dotGridWave} Demo={Demo} {...sources} />,
);
