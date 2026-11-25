import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/scroll-draw-route-demo.jsx";
import sources from "./components/scroll-draw-route-sources.jsx";
import scrollDrawRoute from "./components/scroll-draw-route.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...scrollDrawRoute} Demo={Demo} {...sources} />,
);
