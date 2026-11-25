import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/pixel-dissolve-slider-demo.jsx";
import sources from "./components/pixel-dissolve-slider-sources.jsx";
import pixelDissolveSlider from "./components/pixel-dissolve-slider.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...pixelDissolveSlider} Demo={Demo} {...sources} />,
);
