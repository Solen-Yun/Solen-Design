import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/word-fill-paragraph-demo.jsx";
import sources from "./components/word-fill-paragraph-sources.jsx";
import wordFillParagraph from "./components/word-fill-paragraph.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...wordFillParagraph} Demo={Demo} {...sources} />,
);
