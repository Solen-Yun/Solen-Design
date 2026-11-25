import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/fold-text-demo.jsx";
import sources from "./components/fold-text-sources.jsx";
import foldText from "./components/fold-text.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...foldText} Demo={Demo} {...sources} />,
);
