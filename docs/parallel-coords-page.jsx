import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/parallel-coords-demo.jsx";
import sources from "./components/parallel-coords-sources.jsx";
import parallelCoords from "./components/parallel-coords.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...parallelCoords} Demo={Demo} {...sources} />,
);
