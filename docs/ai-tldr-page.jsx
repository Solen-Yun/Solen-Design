import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/ai-tldr-demo.jsx";
import sources from "./components/ai-tldr-sources.jsx";
import aiTldr from "./components/ai-tldr.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...aiTldr} Demo={Demo} {...sources} />,
);
