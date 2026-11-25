import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/ghost-fibers-demo.jsx";
import sources from "./components/ghost-fibers-sources.jsx";
import ghostFibers from "./components/ghost-fibers.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...ghostFibers} Demo={Demo} {...sources} />,
);
