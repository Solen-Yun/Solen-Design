import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/gradient-text-demo.jsx";
import sources from "./components/gradient-text-sources.jsx";
import gradientText from "./components/gradient-text.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...gradientText} Demo={Demo} {...sources} />,
);
