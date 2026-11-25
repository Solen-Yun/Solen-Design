import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/agent-composer-demo.jsx";
import sources from "./components/agent-composer-sources.jsx";
import deepAgentComposer from "./components/agent-composer.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...deepAgentComposer} Demo={Demo} {...sources} />,
);
