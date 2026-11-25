import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/circular-theme-switch-demo.jsx";
import sources from "./components/circular-theme-switch-sources.jsx";
import circularThemeSwitch from "./components/circular-theme-switch.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...circularThemeSwitch} Demo={Demo} {...sources} />,
);
