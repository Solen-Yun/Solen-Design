import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/light-rays-demo.jsx";
import sources from "./components/light-rays-sources.jsx";
import lightRays from "./components/light-rays.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...lightRays} Demo={Demo} {...sources} />,
);
