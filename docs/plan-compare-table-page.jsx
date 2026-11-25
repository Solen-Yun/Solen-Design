import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/plan-compare-table-demo.jsx";
import sources from "./components/plan-compare-table-sources.jsx";
import planCompareTable from "./components/plan-compare-table.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...planCompareTable} Demo={Demo} {...sources} />,
);
