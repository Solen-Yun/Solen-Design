import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/pattern-waves-demo.jsx";
import sources from "./components/pattern-waves-sources.jsx";
import patternWaves from "./components/pattern-waves.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...patternWaves} Demo={Demo} {...sources} />,
);
