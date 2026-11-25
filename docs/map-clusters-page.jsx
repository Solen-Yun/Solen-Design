import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/map-clusters-demo.jsx";
import sources from "./components/map-clusters-sources.jsx";
import mapClusters from "./components/map-clusters.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...mapClusters} Demo={Demo} {...sources} />,
);
