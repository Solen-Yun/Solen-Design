import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/grid-distortion-demo.jsx";
import sources from "./components/grid-distortion-sources.jsx";
import gridDistortion from "./components/grid-distortion.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...gridDistortion} Demo={Demo} {...sources} />,
);
