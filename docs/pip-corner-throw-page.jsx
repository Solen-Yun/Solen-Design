import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/pip-corner-throw-demo.jsx";
import sources from "./components/pip-corner-throw-sources.jsx";
import pipCornerThrow from "./components/pip-corner-throw.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...pipCornerThrow} Demo={Demo} {...sources} />,
);
