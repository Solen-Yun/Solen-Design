import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/waffle-chart-demo.jsx";
import sources from "./components/waffle-chart-sources.jsx";
import waffleChart from "./components/waffle-chart.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...waffleChart} Demo={Demo} {...sources} />,
);
