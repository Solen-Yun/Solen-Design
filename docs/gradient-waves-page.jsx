import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/gradient-waves-demo.jsx";
import sources from "./components/gradient-waves-sources.jsx";
import gradientWaves from "./components/gradient-waves.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...gradientWaves} Demo={Demo} {...sources} />,
);
