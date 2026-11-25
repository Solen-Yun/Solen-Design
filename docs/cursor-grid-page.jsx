import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/cursor-grid-demo.jsx";
import sources from "./components/cursor-grid-sources.jsx";
import cursorGrid from "./components/cursor-grid.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...cursorGrid} Demo={Demo} {...sources} />,
);
