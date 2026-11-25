import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/page-transition-curtain-demo.jsx";
import sources from "./components/page-transition-curtain-sources.jsx";
import pageTransitionCurtain from "./components/page-transition-curtain.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...pageTransitionCurtain} Demo={Demo} {...sources} />,
);
