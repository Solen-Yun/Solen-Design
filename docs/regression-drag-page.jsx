import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/regression-drag-demo.jsx";
import sources from "./components/regression-drag-sources.jsx";
import regressionDrag from "./components/regression-drag.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...regressionDrag} Demo={Demo} {...sources} />,
);
