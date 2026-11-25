import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/chapter-number-roll-demo.jsx";
import sources from "./components/chapter-number-roll-sources.jsx";
import chapterNumberRoll from "./components/chapter-number-roll.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...chapterNumberRoll} Demo={Demo} {...sources} />,
);
