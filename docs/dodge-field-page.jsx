import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/dodge-field-demo.jsx";
import sources from "./components/dodge-field-sources.jsx";
import dodgeField from "./components/dodge-field.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...dodgeField} Demo={Demo} {...sources} />,
);
