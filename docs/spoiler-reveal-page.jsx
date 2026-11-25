import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/spoiler-reveal-demo.jsx";
import sources from "./components/spoiler-reveal-sources.jsx";
import spoilerReveal from "./components/spoiler-reveal.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...spoilerReveal} Demo={Demo} {...sources} />,
);
