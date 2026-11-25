import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/warm-tooltip-demo.jsx";
import sources from "./components/warm-tooltip-sources.jsx";
import warmTooltip from "./components/warm-tooltip.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...warmTooltip} Demo={Demo} {...sources} />,
);
