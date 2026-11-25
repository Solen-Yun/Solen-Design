import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/line-sidebar-demo.jsx";
import sources from "./components/line-sidebar-sources.jsx";
import lineSidebar from "./components/line-sidebar.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...lineSidebar} Demo={Demo} {...sources} />,
);
