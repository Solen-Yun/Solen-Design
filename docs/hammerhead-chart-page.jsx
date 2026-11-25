import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/hammerhead-chart-demo.jsx";
import sources from "./components/hammerhead-chart-sources.jsx";
import hammerheadChart from "./components/hammerhead-chart.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...hammerheadChart} Demo={Demo} {...sources} />,
);
