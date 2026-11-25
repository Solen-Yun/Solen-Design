import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/blur-up-gallery-demo.jsx";
import sources from "./components/blur-up-gallery-sources.jsx";
import blurUpGallery from "./components/blur-up-gallery.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...blurUpGallery} Demo={Demo} {...sources} />,
);
