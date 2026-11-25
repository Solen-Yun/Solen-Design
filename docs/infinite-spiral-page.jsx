import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/infinite-spiral-demo.jsx";
import sources from "./components/infinite-spiral-sources.jsx";
import infiniteSpiral from "./components/infinite-spiral.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...infiniteSpiral} Demo={Demo} {...sources} />,
);
