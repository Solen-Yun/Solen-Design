import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/glass-surface-demo.jsx";
import sources from "./components/glass-surface-sources.jsx";
import glassSurface from "./components/glass-surface.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...glassSurface} Demo={Demo} {...sources} />,
);
