import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/pixel-trail-demo.jsx";
import sources from "./components/pixel-trail-sources.jsx";
import pixelTrail from "./components/pixel-trail.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...pixelTrail} Demo={Demo} {...sources} />,
);
