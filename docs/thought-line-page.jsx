import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/thought-line-demo.jsx";
import sources from "./components/thought-line-sources.jsx";
import thoughtLine from "./components/thought-line.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...thoughtLine} Demo={Demo} {...sources} />,
);
