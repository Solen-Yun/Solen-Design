import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/xray-code-lens-demo.jsx";
import sources from "./components/xray-code-lens-sources.jsx";
import xrayCodeLens from "./components/xray-code-lens.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...xrayCodeLens} Demo={Demo} {...sources} />,
);
