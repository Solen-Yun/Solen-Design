import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/sailing-toc-demo.jsx";
import sources from "./components/sailing-toc-sources.jsx";
import sailingToc from "./components/sailing-toc.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...sailingToc} Demo={Demo} {...sources} />,
);
