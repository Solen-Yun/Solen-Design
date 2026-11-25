import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/collection-layout-morph-demo.jsx";
import sources from "./components/collection-layout-morph-sources.jsx";
import collectionLayoutMorph from "./components/collection-layout-morph.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...collectionLayoutMorph} Demo={Demo} {...sources} />,
);
