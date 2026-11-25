import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/image-trail-demo.jsx";
import sources from "./components/image-trail-sources.jsx";
import imageTrail from "./components/image-trail.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...imageTrail} Demo={Demo} {...sources} />,
);
