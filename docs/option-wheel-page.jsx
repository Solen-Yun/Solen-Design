import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/option-wheel-demo.jsx";
import sources from "./components/option-wheel-sources.jsx";
import optionWheel from "./components/option-wheel.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...optionWheel} Demo={Demo} {...sources} />,
);
