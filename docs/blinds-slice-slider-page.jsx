import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/blinds-slice-slider-demo.jsx";
import sources from "./components/blinds-slice-slider-sources.jsx";
import blindsSliceSlider from "./components/blinds-slice-slider.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...blindsSliceSlider} Demo={Demo} {...sources} />,
);
