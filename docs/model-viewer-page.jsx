import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/model-viewer-demo.jsx";
import sources from "./components/model-viewer-sources.jsx";
import modelViewer from "./components/model-viewer.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...modelViewer} Demo={Demo} {...sources} />,
);
