import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/dot-matrix-trio-demo.jsx";
import sources from "./components/dot-matrix-trio-sources.jsx";
import dotMatrixTrio from "./components/dot-matrix-trio.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...dotMatrixTrio} Demo={Demo} {...sources} />,
);
