import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/accordion-gallery-demo.jsx";
import sources from "./components/accordion-gallery-sources.jsx";
import accordionGallery from "./components/accordion-gallery.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...accordionGallery} Demo={Demo} {...sources} />,
);
