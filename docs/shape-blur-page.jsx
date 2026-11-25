import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/shape-blur-demo.jsx";
import sources from "./components/shape-blur-sources.jsx";
import shapeBlur from "./components/shape-blur.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...shapeBlur} Demo={Demo} {...sources} />,
);
