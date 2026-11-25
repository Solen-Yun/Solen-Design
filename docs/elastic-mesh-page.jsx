import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/elastic-mesh-demo.jsx";
import sources from "./components/elastic-mesh-sources.jsx";
import elasticMesh from "./components/elastic-mesh.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...elasticMesh} Demo={Demo} {...sources} />,
);
