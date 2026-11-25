import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/detail-side-panel-demo.jsx";
import sources from "./components/detail-side-panel-sources.jsx";
import detailSidePanel from "./components/detail-side-panel.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...detailSidePanel} Demo={Demo} {...sources} />,
);
