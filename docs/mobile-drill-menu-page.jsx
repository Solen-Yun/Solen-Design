import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/mobile-drill-menu-demo.jsx";
import sources from "./components/mobile-drill-menu-sources.jsx";
import mobileDrillMenu from "./components/mobile-drill-menu.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...mobileDrillMenu} Demo={Demo} {...sources} />,
);
