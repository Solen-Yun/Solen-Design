import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/direction-aware-tiles-demo.jsx";
import sources from "./components/direction-aware-tiles-sources.jsx";
import directionAwareTiles from "./components/direction-aware-tiles.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...directionAwareTiles} Demo={Demo} {...sources} />,
);
