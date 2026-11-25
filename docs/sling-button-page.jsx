import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/sling-button-demo.jsx";
import sources from "./components/sling-button-sources.jsx";
import slingButton from "./components/sling-button.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...slingButton} Demo={Demo} {...sources} />,
);
