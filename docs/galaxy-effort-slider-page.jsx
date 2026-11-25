import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/galaxy-effort-slider-demo.jsx";
import sources from "./components/galaxy-effort-slider-sources.jsx";
import galaxyEffortSlider from "./components/galaxy-effort-slider.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...galaxyEffortSlider} Demo={Demo} {...sources} />,
);
