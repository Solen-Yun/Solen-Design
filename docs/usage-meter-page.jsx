import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/usage-meter-demo.jsx";
import sources from "./components/usage-meter-sources.jsx";
import usageMeter from "./components/usage-meter.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...usageMeter} Demo={Demo} {...sources} />,
);
