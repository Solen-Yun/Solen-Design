import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/ai-image-generation-demo.jsx";
import sources from "./components/ai-image-generation-sources.jsx";
import aiImageGeneration from "./components/ai-image-generation.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...aiImageGeneration} Demo={Demo} {...sources} />,
);
