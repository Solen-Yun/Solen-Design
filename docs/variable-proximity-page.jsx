import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/variable-proximity-demo.jsx";
import sources from "./components/variable-proximity-sources.jsx";
import variableProximity from "./components/variable-proximity.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...variableProximity} Demo={Demo} {...sources} />,
);
