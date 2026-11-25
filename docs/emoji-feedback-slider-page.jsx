import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/emoji-feedback-slider-demo.jsx";
import sources from "./components/emoji-feedback-slider-sources.jsx";
import emojiFeedbackSlider from "./components/emoji-feedback-slider.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...emojiFeedbackSlider} Demo={Demo} {...sources} />,
);
