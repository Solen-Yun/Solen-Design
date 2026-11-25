import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/pixel-transition-demo.jsx";
import sources from "./components/pixel-transition-sources.jsx";
import pixelTransition from "./components/pixel-transition.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...pixelTransition} Demo={Demo} {...sources} />,
);
