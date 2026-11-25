import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/collapsing-large-title-demo.jsx";
import sources from "./components/collapsing-large-title-sources.jsx";
import collapsingLargeTitle from "./components/collapsing-large-title.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...collapsingLargeTitle} Demo={Demo} {...sources} />,
);
