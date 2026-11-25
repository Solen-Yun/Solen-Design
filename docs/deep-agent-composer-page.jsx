import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/deep-agent-composer-demo.jsx";
import sources from "./components/deep-agent-composer-sources.jsx";
import deepAgentComposer from "./components/deep-agent-composer.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...deepAgentComposer} Demo={Demo} {...sources} />,
);
