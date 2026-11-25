import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/brand-line-cards-demo.jsx";
import sources from "./components/brand-line-cards-sources.jsx";
import brandLineCards from "./components/brand-line-cards.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...brandLineCards} Demo={Demo} {...sources} />,
);
