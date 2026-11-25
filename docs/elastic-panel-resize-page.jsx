import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/elastic-panel-resize-demo.jsx";
import sources from "./components/elastic-panel-resize-sources.jsx";
import elasticPanelResize from "./components/elastic-panel-resize.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...elasticPanelResize} Demo={Demo} {...sources} />,
);
