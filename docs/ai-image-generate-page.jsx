import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/ai-image-generate-demo.jsx";
import sources from "./components/ai-image-generate-sources.jsx";
import aiImageGenerate from "./components/ai-image-generate.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...aiImageGenerate} Demo={Demo} {...sources} />,
);
