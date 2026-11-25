import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/marker-highlight-demo.jsx";
import sources from "./components/marker-highlight-sources.jsx";
import markerHighlight from "./components/marker-highlight.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...markerHighlight} Demo={Demo} {...sources} />,
);
