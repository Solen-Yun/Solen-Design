import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/topography-demo.jsx";
import sources from "./components/topography-sources.jsx";
import topography from "./components/topography.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...topography} Demo={Demo} {...sources} />,
);
