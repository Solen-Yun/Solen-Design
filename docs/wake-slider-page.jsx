import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/wake-slider-demo.jsx";
import sources from "./components/wake-slider-sources.jsx";
import wakeSlider from "./components/wake-slider.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...wakeSlider} Demo={Demo} {...sources} />,
);
