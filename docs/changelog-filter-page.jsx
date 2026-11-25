import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/changelog-filter-demo.jsx";
import sources from "./components/changelog-filter-sources.jsx";
import changelogFilter from "./components/changelog-filter.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...changelogFilter} Demo={Demo} {...sources} />,
);
