import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/dome-gallery-demo.jsx";
import sources from "./components/dome-gallery-sources.jsx";
import domeGallery from "./components/dome-gallery.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...domeGallery} Demo={Demo} {...sources} />,
);
