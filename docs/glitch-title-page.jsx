import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/glitch-title-demo.jsx";
import sources from "./components/glitch-title-sources.jsx";
import glitchTitle from "./components/glitch-title.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...glitchTitle} Demo={Demo} {...sources} />,
);
