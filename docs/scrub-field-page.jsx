import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/scrub-field-demo.jsx";
import sources from "./components/scrub-field-sources.jsx";
import scrubField from "./components/scrub-field.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...scrubField} Demo={Demo} {...sources} />,
);
