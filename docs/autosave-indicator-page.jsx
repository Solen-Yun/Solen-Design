import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/autosave-indicator-demo.jsx";
import sources from "./components/autosave-indicator-sources.jsx";
import autosaveIndicator from "./components/autosave-indicator.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...autosaveIndicator} Demo={Demo} {...sources} />,
);
