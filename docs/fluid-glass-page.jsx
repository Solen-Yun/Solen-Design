import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/fluid-glass-demo.jsx";
import sources from "./components/fluid-glass-sources.jsx";
import fluidGlass from "./components/fluid-glass.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...fluidGlass} Demo={Demo} {...sources} />,
);
