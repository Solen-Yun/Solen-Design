import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/scroll-reveal-demo.jsx";
import sources from "./components/scroll-reveal-sources.jsx";
import scrollReveal from "./components/scroll-reveal.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...scrollReveal} Demo={Demo} {...sources} />,
);
