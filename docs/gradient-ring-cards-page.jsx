import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/gradient-ring-cards-demo.jsx";
import sources from "./components/gradient-ring-cards-sources.jsx";
import gradientRingCards from "./components/gradient-ring-cards.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...gradientRingCards} Demo={Demo} {...sources} />,
);
