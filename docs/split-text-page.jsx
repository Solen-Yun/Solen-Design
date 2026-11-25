import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/split-text-demo.jsx";
import sources from "./components/split-text-sources.jsx";
import splitText from "./components/split-text.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...splitText} Demo={Demo} {...sources} />,
);
