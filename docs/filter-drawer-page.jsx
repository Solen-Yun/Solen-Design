import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/filter-drawer-demo.jsx";
import sources from "./components/filter-drawer-sources.jsx";
import filterDrawer from "./components/filter-drawer.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...filterDrawer} Demo={Demo} {...sources} />,
);
