import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/speed-gauge-demo.jsx";
import sources from "./components/speed-gauge-sources.jsx";
import speedGauge from "./components/speed-gauge.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...speedGauge} Demo={Demo} {...sources} />,
);
