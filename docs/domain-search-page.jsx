import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/domain-search-demo.jsx";
import sources from "./components/domain-search-sources.jsx";
import domainSearch from "./components/domain-search.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...domainSearch} Demo={Demo} {...sources} />,
);
