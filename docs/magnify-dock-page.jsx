import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/magnify-dock-demo.jsx";
import sources from "./components/magnify-dock-sources.jsx";
import magnifyDock from "./components/magnify-dock.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...magnifyDock} Demo={Demo} {...sources} />,
);
