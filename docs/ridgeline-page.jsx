import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/ridgeline-demo.jsx";
import sources from "./components/ridgeline-sources.jsx";
import ridgeline from "./components/ridgeline.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...ridgeline} Demo={Demo} {...sources} />,
);
