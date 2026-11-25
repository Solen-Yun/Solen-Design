import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/terminal-demo-demo.jsx";
import sources from "./components/terminal-demo-sources.jsx";
import terminalDemo from "./components/terminal-demo.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...terminalDemo} Demo={Demo} {...sources} />,
);
