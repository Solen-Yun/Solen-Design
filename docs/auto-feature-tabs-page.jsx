import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/auto-feature-tabs-demo.jsx";
import sources from "./components/auto-feature-tabs-sources.jsx";
import autoFeatureTabs from "./components/auto-feature-tabs.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...autoFeatureTabs} Demo={Demo} {...sources} />,
);
