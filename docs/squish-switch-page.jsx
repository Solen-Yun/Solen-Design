import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/squish-switch-demo.jsx";
import sources from "./components/squish-switch-sources.jsx";
import squishSwitch from "./components/squish-switch.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...squishSwitch} Demo={Demo} {...sources} />,
);
