import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/gradual-blur-demo.jsx";
import sources from "./components/gradual-blur-sources.jsx";
import gradualBlur from "./components/gradual-blur.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...gradualBlur} Demo={Demo} {...sources} />,
);
