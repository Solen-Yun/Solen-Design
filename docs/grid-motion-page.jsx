import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/grid-motion-demo.jsx";
import sources from "./components/grid-motion-sources.jsx";
import gridMotion from "./components/grid-motion.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...gridMotion} Demo={Demo} {...sources} />,
);
