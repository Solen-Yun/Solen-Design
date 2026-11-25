import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/stagger-reveal-grid-demo.jsx";
import sources from "./components/stagger-reveal-grid-sources.jsx";
import staggerRevealGrid from "./components/stagger-reveal-grid.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...staggerRevealGrid} Demo={Demo} {...sources} />,
);
