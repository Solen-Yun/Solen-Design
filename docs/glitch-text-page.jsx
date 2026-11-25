import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/glitch-text-demo.jsx";
import sources from "./components/glitch-text-sources.jsx";
import glitchText from "./components/glitch-text.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...glitchText} Demo={Demo} {...sources} />,
);
