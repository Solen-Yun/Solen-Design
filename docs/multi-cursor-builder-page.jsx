import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/multi-cursor-builder-demo.jsx";
import sources from "./components/multi-cursor-builder-sources.jsx";
import multiCursorBuilder from "./components/multi-cursor-builder.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...multiCursorBuilder} Demo={Demo} {...sources} />,
);
