import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/velocity-drag-demo.jsx";
import sources from "./components/velocity-drag-sources.jsx";
import velocityFocusDrag from "./components/velocity-drag.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...velocityFocusDrag} Demo={Demo} {...sources} />,
);
