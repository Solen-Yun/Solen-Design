import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/iso-block-chart-demo.jsx";
import sources from "./components/iso-block-chart-sources.jsx";
import isoBlockChart from "./components/iso-block-chart.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...isoBlockChart} Demo={Demo} {...sources} />,
);
