import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/blur-text-demo.jsx";
import sources from "./components/blur-text-sources.jsx";
import blurText from "./components/blur-text.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...blurText} Demo={Demo} {...sources} />,
);
