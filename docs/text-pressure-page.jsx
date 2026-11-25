import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/text-pressure-demo.jsx";
import sources from "./components/text-pressure-sources.jsx";
import textPressure from "./components/text-pressure.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...textPressure} Demo={Demo} {...sources} />,
);
