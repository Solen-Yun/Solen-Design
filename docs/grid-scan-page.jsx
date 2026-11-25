import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/grid-scan-demo.jsx";
import sources from "./components/grid-scan-sources.jsx";
import gridScan from "./components/grid-scan.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...gridScan} Demo={Demo} {...sources} />,
);
