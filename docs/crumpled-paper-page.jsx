import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/crumpled-paper-demo.jsx";
import sources from "./components/crumpled-paper-sources.jsx";
import crumpledPaper from "./components/crumpled-paper.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...crumpledPaper} Demo={Demo} {...sources} />,
);
