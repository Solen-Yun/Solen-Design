import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/grid-beam-hero-demo.jsx";
import sources from "./components/grid-beam-hero-sources.jsx";
import gridBeamHero from "./components/grid-beam-hero.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...gridBeamHero} Demo={Demo} {...sources} />,
);
