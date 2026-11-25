import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/reveal-footer-demo.jsx";
import sources from "./components/reveal-footer-sources.jsx";
import revealFooter from "./components/reveal-footer.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...revealFooter} Demo={Demo} {...sources} />,
);
