import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/fluid-tooltip-demo.jsx";
import sources from "./components/fluid-tooltip-sources.jsx";
import fluidTooltip from "./components/fluid-tooltip.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...fluidTooltip} Demo={Demo} {...sources} />,
);
