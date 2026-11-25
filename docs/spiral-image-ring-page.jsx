import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/spiral-image-ring-demo.jsx";
import sources from "./components/spiral-image-ring-sources.jsx";
import spiralImageRing from "./components/spiral-image-ring.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...spiralImageRing} Demo={Demo} {...sources} />,
);
