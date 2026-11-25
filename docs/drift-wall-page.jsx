import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/drift-wall-demo.jsx";
import sources from "./components/drift-wall-sources.jsx";
import driftWall from "./components/drift-wall.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...driftWall} Demo={Demo} {...sources} />,
);
