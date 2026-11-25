import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/feedback-pins-demo.jsx";
import sources from "./components/feedback-pins-sources.jsx";
import feedbackPins from "./components/feedback-pins.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...feedbackPins} Demo={Demo} {...sources} />,
);
