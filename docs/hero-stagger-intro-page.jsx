import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/hero-stagger-intro-demo.jsx";
import sources from "./components/hero-stagger-intro-sources.jsx";
import heroStaggerIntro from "./components/hero-stagger-intro.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...heroStaggerIntro} Demo={Demo} {...sources} />,
);
