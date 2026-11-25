import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/dot-field-demo.jsx";
import sources from "./components/dot-field-sources.jsx";
import dotField from "./components/dot-field.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...dotField} Demo={Demo} {...sources} />,
);
