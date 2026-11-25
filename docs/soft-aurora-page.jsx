import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/soft-aurora-demo.jsx";
import sources from "./components/soft-aurora-sources.jsx";
import softAurora from "./components/soft-aurora.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...softAurora} Demo={Demo} {...sources} />,
);
