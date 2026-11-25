import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/cosmic-panels-demo.jsx";
import sources from "./components/cosmic-panels-sources.jsx";
import cosmicPanels from "./components/cosmic-panels.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...cosmicPanels} Demo={Demo} {...sources} />,
);
