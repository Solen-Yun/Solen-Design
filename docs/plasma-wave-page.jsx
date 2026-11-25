import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/plasma-wave-demo.jsx";
import sources from "./components/plasma-wave-sources.jsx";
import plasmaWave from "./components/plasma-wave.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...plasmaWave} Demo={Demo} {...sources} />,
);
