import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/fade-content-demo.jsx";
import sources from "./components/fade-content-sources.jsx";
import fadeContent from "./components/fade-content.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...fadeContent} Demo={Demo} {...sources} />,
);
