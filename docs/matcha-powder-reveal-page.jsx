import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/matcha-powder-reveal-demo.jsx";
import sources from "./components/matcha-powder-reveal-sources.jsx";
import matchaPowderReveal from "./components/matcha-powder-reveal.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...matchaPowderReveal} Demo={Demo} {...sources} />,
);
