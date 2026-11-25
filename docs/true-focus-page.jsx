import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/true-focus-demo.jsx";
import sources from "./components/true-focus-sources.jsx";
import trueFocus from "./components/true-focus.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...trueFocus} Demo={Demo} {...sources} />,
);
