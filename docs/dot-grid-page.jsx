import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/dot-grid-demo.jsx";
import sources from "./components/dot-grid-sources.jsx";
import dotGrid from "./components/dot-grid.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...dotGrid} Demo={Demo} {...sources} />,
);
