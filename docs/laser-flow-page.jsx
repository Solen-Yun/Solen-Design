import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/laser-flow-demo.jsx";
import sources from "./components/laser-flow-sources.jsx";
import laserFlow from "./components/laser-flow.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...laserFlow} Demo={Demo} {...sources} />,
);
