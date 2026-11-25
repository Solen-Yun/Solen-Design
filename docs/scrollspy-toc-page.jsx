import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/scrollspy-toc-demo.jsx";
import sources from "./components/scrollspy-toc-sources.jsx";
import scrollspyToc from "./components/scrollspy-toc.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...scrollspyToc} Demo={Demo} {...sources} />,
);
