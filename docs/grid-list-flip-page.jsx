import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/grid-list-flip-demo.jsx";
import sources from "./components/grid-list-flip-sources.jsx";
import gridListFlip from "./components/grid-list-flip.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...gridListFlip} Demo={Demo} {...sources} />,
);
