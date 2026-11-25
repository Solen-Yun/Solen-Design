import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/a11y-panel-demo.jsx";
import sources from "./components/a11y-panel-sources.jsx";
import a11yPanel from "./components/a11y-panel.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...a11yPanel} Demo={Demo} {...sources} />,
);
