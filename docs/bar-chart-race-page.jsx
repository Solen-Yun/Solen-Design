import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/bar-chart-race-demo.jsx";
import sources from "./components/bar-chart-race-sources.jsx";
import barChartRace from "./components/bar-chart-race.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...barChartRace} Demo={Demo} {...sources} />,
);
