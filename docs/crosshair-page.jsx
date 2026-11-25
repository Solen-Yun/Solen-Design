import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/crosshair-demo.jsx";
import sources from "./components/crosshair-sources.jsx";
import crosshair from "./components/crosshair.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...crosshair} Demo={Demo} {...sources} />,
);
