import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/shared-element-detail-demo.jsx";
import sources from "./components/shared-element-detail-sources.jsx";
import sharedElementDetail from "./components/shared-element-detail.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...sharedElementDetail} Demo={Demo} {...sources} />,
);
