import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/side-rays-demo.jsx";
import sources from "./components/side-rays-sources.jsx";
import sideRays from "./components/side-rays.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...sideRays} Demo={Demo} {...sources} />,
);
