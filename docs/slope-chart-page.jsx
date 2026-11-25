import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/slope-chart-demo.jsx";
import sources from "./components/slope-chart-sources.jsx";
import slopeChart from "./components/slope-chart.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...slopeChart} Demo={Demo} {...sources} />,
);
