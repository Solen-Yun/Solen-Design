import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/spotlight-card-demo.jsx";
import sources from "./components/spotlight-card-sources.jsx";
import spotlightCard from "./components/spotlight-card.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...spotlightCard} Demo={Demo} {...sources} />,
);
