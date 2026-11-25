import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/sliced-waves-demo.jsx";
import sources from "./components/sliced-waves-sources.jsx";
import slicedWaves from "./components/sliced-waves.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...slicedWaves} Demo={Demo} {...sources} />,
);
