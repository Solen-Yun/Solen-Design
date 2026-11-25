import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/ai-brand-cover-cards-demo.jsx";
import sources from "./components/ai-brand-cover-cards-sources.jsx";
import aiBrandCoverCards from "./components/ai-brand-cover-cards.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...aiBrandCoverCards} Demo={Demo} {...sources} />,
);
