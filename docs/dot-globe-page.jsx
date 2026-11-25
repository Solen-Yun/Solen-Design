import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/dot-globe-demo.jsx";
import sources from "./components/dot-globe-sources.jsx";
import dotGlobe from "./components/dot-globe.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...dotGlobe} Demo={Demo} {...sources} />,
);
