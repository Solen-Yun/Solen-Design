import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/bounding-box-resize-demo.jsx";
import sources from "./components/bounding-box-resize-sources.jsx";
import boundingBoxResize from "./components/bounding-box-resize.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...boundingBoxResize} Demo={Demo} {...sources} />,
);
