import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/cubes-demo.jsx";
import sources from "./components/cubes-sources.jsx";
import cubes from "./components/cubes.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...cubes} Demo={Demo} {...sources} />,
);
