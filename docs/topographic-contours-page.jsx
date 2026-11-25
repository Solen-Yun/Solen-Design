import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/topographic-contours-demo.jsx";
import sources from "./components/topographic-contours-sources.jsx";
import topographicContours from "./components/topographic-contours.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...topographicContours} Demo={Demo} {...sources} />,
);
