import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/faulty-terminal-demo.jsx";
import sources from "./components/faulty-terminal-sources.jsx";
import faultyTerminal from "./components/faulty-terminal.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...faultyTerminal} Demo={Demo} {...sources} />,
);
