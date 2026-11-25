import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/tech-text-demo.jsx";
import sources from "./components/tech-text-sources.jsx";
import techText from "./components/tech-text.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...techText} Demo={Demo} {...sources} />,
);
