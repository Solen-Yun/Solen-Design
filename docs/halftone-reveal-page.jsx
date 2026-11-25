import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/halftone-reveal-demo.jsx";
import sources from "./components/halftone-reveal-sources.jsx";
import halftoneReveal from "./components/halftone-reveal.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...halftoneReveal} Demo={Demo} {...sources} />,
);
