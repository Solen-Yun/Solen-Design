import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/glow-border-cards-demo.jsx";
import sources from "./components/glow-border-cards-sources.jsx";
import glowBorderCards from "./components/glow-border-cards.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...glowBorderCards} Demo={Demo} {...sources} />,
);
