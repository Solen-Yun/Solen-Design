import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/folded-emoji-scroll-demo.jsx";
import sources from "./components/folded-emoji-scroll-sources.jsx";
import foldedEmojiScroll from "./components/folded-emoji-scroll.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...foldedEmojiScroll} Demo={Demo} {...sources} />,
);
