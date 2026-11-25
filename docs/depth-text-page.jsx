import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/depth-text-demo.jsx";
import sources from "./components/depth-text-sources.jsx";
import depthText from "./components/depth-text.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...depthText} Demo={Demo} {...sources} />,
);
