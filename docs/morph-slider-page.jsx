import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/morph-slider-demo.jsx";
import sources from "./components/morph-slider-sources.jsx";
import morphSlider from "./components/morph-slider.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...morphSlider} Demo={Demo} {...sources} />,
);
