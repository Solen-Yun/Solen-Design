import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/accordion-image-panels-demo.jsx";
import sources from "./components/accordion-image-panels-sources.jsx";
import accordionImagePanels from "./components/accordion-image-panels.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...accordionImagePanels} Demo={Demo} {...sources} />,
);
