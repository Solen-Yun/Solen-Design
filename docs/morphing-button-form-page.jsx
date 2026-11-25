import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/morphing-button-form-demo.jsx";
import sources from "./components/morphing-button-form-sources.jsx";
import morphingButtonForm from "./components/morphing-button-form.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...morphingButtonForm} Demo={Demo} {...sources} />,
);
