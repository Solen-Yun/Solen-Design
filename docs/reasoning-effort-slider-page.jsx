import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/reasoning-effort-slider-demo.jsx";
import sources from "./components/reasoning-effort-slider-sources.jsx";
import reasoningEffortSlider from "./components/reasoning-effort-slider.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...reasoningEffortSlider} Demo={Demo} {...sources} />,
);
