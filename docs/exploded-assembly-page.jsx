import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/exploded-assembly-demo.jsx";
import sources from "./components/exploded-assembly-sources.jsx";
import explodedAssembly from "./components/exploded-assembly.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...explodedAssembly} Demo={Demo} {...sources} />,
);
