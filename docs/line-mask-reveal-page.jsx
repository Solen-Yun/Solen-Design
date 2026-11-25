import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/line-mask-reveal-demo.jsx";
import sources from "./components/line-mask-reveal-sources.jsx";
import lineMaskReveal from "./components/line-mask-reveal.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...lineMaskReveal} Demo={Demo} {...sources} />,
);
