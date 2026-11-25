import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/brand-poster-cards-demo.jsx";
import sources from "./components/brand-poster-cards-sources.jsx";
import brandPosterCards from "./components/brand-poster-cards.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...brandPosterCards} Demo={Demo} {...sources} />,
);
