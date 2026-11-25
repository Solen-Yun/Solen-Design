import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/scrambled-text-demo.jsx";
import sources from "./components/scrambled-text-sources.jsx";
import scrambledText from "./components/scrambled-text.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...scrambledText} Demo={Demo} {...sources} />,
);
