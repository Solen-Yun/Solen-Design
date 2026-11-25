import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/locale-switch-demo.jsx";
import sources from "./components/locale-switch-sources.jsx";
import localeSwitch from "./components/locale-switch.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...localeSwitch} Demo={Demo} {...sources} />,
);
