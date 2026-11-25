import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/shape-waves-demo.jsx";
import sources from "./components/shape-waves-sources.jsx";
import shapeWaves from "./components/shape-waves.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...shapeWaves} Demo={Demo} {...sources} />,
);
