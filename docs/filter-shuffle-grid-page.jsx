import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/filter-shuffle-grid-demo.jsx";
import sources from "./components/filter-shuffle-grid-sources.jsx";
import filterShuffleGrid from "./components/filter-shuffle-grid.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...filterShuffleGrid} Demo={Demo} {...sources} />,
);
