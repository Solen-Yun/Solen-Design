import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/flowing-menu-demo.jsx";
import sources from "./components/flowing-menu-sources.jsx";
import flowingMenu from "./components/flowing-menu.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...flowingMenu} Demo={Demo} {...sources} />,
);
