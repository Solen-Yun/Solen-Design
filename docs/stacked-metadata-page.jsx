import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/stacked-metadata-demo.jsx";
import sources from "./components/stacked-metadata-sources.jsx";
import stackedMetadata from "./components/stacked-metadata.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...stackedMetadata} Demo={Demo} {...sources} />,
);
