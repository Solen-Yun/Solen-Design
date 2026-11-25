import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/seo-preview-demo.jsx";
import sources from "./components/seo-preview-sources.jsx";
import seoPreview from "./components/seo-preview.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...seoPreview} Demo={Demo} {...sources} />,
);
