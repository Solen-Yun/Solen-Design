import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/automation-flow-demo.jsx";
import sources from "./components/automation-flow-sources.jsx";
import automationFlow from "./components/automation-flow.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...automationFlow} Demo={Demo} {...sources} />,
);
