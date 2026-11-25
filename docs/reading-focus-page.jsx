import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/reading-focus-demo.jsx";
import sources from "./components/reading-focus-sources.jsx";
import readingFocus from "./components/reading-focus.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...readingFocus} Demo={Demo} {...sources} />,
);
