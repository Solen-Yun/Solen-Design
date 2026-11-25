import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/flow-field-demo.jsx";
import sources from "./components/flow-field-sources.jsx";
import flowField from "./components/flow-field.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...flowField} Demo={Demo} {...sources} />,
);
