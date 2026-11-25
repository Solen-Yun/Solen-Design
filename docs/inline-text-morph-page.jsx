import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/inline-text-morph-demo.jsx";
import sources from "./components/inline-text-morph-sources.jsx";
import inlineTextMorph from "./components/inline-text-morph.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...inlineTextMorph} Demo={Demo} {...sources} />,
);
