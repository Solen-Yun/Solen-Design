import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/floating-ui-hero-demo.jsx";
import sources from "./components/floating-ui-hero-sources.jsx";
import floatingUiHero from "./components/floating-ui-hero.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...floatingUiHero} Demo={Demo} {...sources} />,
);
