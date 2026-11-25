import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/back-to-top-rocket-demo.jsx";
import sources from "./components/back-to-top-rocket-sources.jsx";
import backToTopRocket from "./components/back-to-top-rocket.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...backToTopRocket} Demo={Demo} {...sources} />,
);
