import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/population-pyramid-demo.jsx";
import sources from "./components/population-pyramid-sources.jsx";
import populationPyramid from "./components/population-pyramid.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...populationPyramid} Demo={Demo} {...sources} />,
);
