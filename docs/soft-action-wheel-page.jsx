import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/soft-action-wheel-demo.jsx";
import sources from "./components/soft-action-wheel-sources.jsx";
import softActionWheel from "./components/soft-action-wheel.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...softActionWheel} Demo={Demo} {...sources} />,
);
