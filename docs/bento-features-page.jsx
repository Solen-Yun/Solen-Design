import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/bento-features-demo.jsx";
import sources from "./components/bento-features-sources.jsx";
import bentoFeatures from "./components/bento-features.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...bentoFeatures} Demo={Demo} {...sources} />,
);
