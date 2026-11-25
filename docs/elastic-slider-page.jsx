import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/elastic-slider-demo.jsx";
import sources from "./components/elastic-slider-sources.jsx";
import elasticSlider from "./components/elastic-slider.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...elasticSlider} Demo={Demo} {...sources} />,
);
