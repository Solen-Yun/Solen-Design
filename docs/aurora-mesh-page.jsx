import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/aurora-mesh-demo.jsx";
import sources from "./components/aurora-mesh-sources.jsx";
import auroraMesh from "./components/aurora-mesh.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...auroraMesh} Demo={Demo} {...sources} />,
);
