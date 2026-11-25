import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/fuzzy-text-demo.jsx";
import sources from "./components/fuzzy-text-sources.jsx";
import fuzzyText from "./components/fuzzy-text.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...fuzzyText} Demo={Demo} {...sources} />,
);
