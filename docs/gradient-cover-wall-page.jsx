import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/gradient-cover-wall-demo.jsx";
import sources from "./components/gradient-cover-wall-sources.jsx";
import gradientCoverWall from "./components/gradient-cover-wall.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...gradientCoverWall} Demo={Demo} {...sources} />,
);
