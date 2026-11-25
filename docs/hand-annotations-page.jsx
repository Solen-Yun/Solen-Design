import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/hand-annotations-demo.jsx";
import sources from "./components/hand-annotations-sources.jsx";
import handAnnotations from "./components/hand-annotations.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...handAnnotations} Demo={Demo} {...sources} />,
);
