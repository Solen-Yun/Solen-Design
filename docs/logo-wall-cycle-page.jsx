import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/logo-wall-cycle-demo.jsx";
import sources from "./components/logo-wall-cycle-sources.jsx";
import logoWallCycle from "./components/logo-wall-cycle.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...logoWallCycle} Demo={Demo} {...sources} />,
);
