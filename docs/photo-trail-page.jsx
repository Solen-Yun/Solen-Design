import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/photo-trail-demo.jsx";
import sources from "./components/photo-trail-sources.jsx";
import photoTrail from "./components/photo-trail.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...photoTrail} Demo={Demo} {...sources} />,
);
