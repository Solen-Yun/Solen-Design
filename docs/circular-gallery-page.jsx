import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/circular-gallery-demo.jsx";
import sources from "./components/circular-gallery-sources.jsx";
import circularGallery from "./components/circular-gallery.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...circularGallery} Demo={Demo} {...sources} />,
);
