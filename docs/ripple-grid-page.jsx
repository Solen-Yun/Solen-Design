import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/ripple-grid-demo.jsx";
import sources from "./components/ripple-grid-sources.jsx";
import rippleGrid from "./components/ripple-grid.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...rippleGrid} Demo={Demo} {...sources} />,
);
