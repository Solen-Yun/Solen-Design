import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/form-error-jump-demo.jsx";
import sources from "./components/form-error-jump-sources.jsx";
import formErrorJump from "./components/form-error-jump.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...formErrorJump} Demo={Demo} {...sources} />,
);
