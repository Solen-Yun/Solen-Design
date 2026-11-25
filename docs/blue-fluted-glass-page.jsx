import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/blue-fluted-glass-demo.jsx";
import sources from "./components/blue-fluted-glass-sources.jsx";
import blueFlutedGlass from "./components/blue-fluted-glass.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...blueFlutedGlass} Demo={Demo} {...sources} />,
);
