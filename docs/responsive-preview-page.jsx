import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/responsive-preview-demo.jsx";
import sources from "./components/responsive-preview-sources.jsx";
import responsivePreview from "./components/responsive-preview.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...responsivePreview} Demo={Demo} {...sources} />,
);
