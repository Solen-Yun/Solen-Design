import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/typewriter-rotating-words-demo.jsx";
import sources from "./components/typewriter-rotating-words-sources.jsx";
import typewriterRotatingWords from "./components/typewriter-rotating-words.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...typewriterRotatingWords} Demo={Demo} {...sources} />,
);
