import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/hover-preview-list-demo.jsx";
import sources from "./components/hover-preview-list-sources.jsx";
import hoverPreviewList from "./components/hover-preview-list.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...hoverPreviewList} Demo={Demo} {...sources} />,
);
