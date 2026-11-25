import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/stroke-text-demo.jsx";
import sources from "./components/stroke-text-sources.jsx";
import strokeText from "./components/stroke-text.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...strokeText} Demo={Demo} {...sources} />,
);
