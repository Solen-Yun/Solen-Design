import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/glass-tab-menu-demo.jsx";
import sources from "./components/glass-tab-menu-sources.jsx";
import glassTabMenu from "./components/glass-tab-menu.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...glassTabMenu} Demo={Demo} {...sources} />,
);
