import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/image-optimizer-demo.jsx";
import sources from "./components/image-optimizer-sources.jsx";
import imageOptimizer from "./components/image-optimizer.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...imageOptimizer} Demo={Demo} {...sources} />,
);
