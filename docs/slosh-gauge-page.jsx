import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/slosh-gauge-demo.jsx";
import sources from "./components/slosh-gauge-sources.jsx";
import sloshGauge from "./components/slosh-gauge.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...sloshGauge} Demo={Demo} {...sources} />,
);
