import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/address-search-demo.jsx";
import sources from "./components/address-search-sources.jsx";
import addressSearch from "./components/address-search.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...addressSearch} Demo={Demo} {...sources} />,
);
