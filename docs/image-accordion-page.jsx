import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/image-accordion-demo.jsx";
import sources from "./components/image-accordion-sources.jsx";
import imageAccordion from "./components/image-accordion.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...imageAccordion} Demo={Demo} {...sources} />,
);
