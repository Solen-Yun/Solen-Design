import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/stepper-demo.jsx";
import sources from "./components/stepper-sources.jsx";
import stepper from "./components/stepper.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...stepper} Demo={Demo} {...sources} />,
);
