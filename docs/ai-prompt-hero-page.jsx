import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/ai-prompt-hero-demo.jsx";
import sources from "./components/ai-prompt-hero-sources.jsx";
import aiPromptHero from "./components/ai-prompt-hero.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...aiPromptHero} Demo={Demo} {...sources} />,
);
