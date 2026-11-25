import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/hide-on-scroll-header-demo.jsx";
import sources from "./components/hide-on-scroll-header-sources.jsx";
import hideOnScrollHeader from "./components/hide-on-scroll-header.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...hideOnScrollHeader} Demo={Demo} {...sources} />,
);
