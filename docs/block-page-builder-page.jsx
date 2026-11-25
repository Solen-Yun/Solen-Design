import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/block-page-builder-demo.jsx";
import sources from "./components/block-page-builder-sources.jsx";
import blockPageBuilder from "./components/block-page-builder.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...blockPageBuilder} Demo={Demo} {...sources} />,
);
