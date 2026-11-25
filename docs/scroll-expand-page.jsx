import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/scroll-expand-demo.jsx";
import sources from "./components/scroll-expand-sources.jsx";
import scrollExpand from "./components/scroll-expand.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...scrollExpand} Demo={Demo} {...sources} />,
);
