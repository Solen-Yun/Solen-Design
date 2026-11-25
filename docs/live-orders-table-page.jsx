import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/live-orders-table-demo.jsx";
import sources from "./components/live-orders-table-sources.jsx";
import liveOrdersTable from "./components/live-orders-table.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...liveOrdersTable} Demo={Demo} {...sources} />,
);
